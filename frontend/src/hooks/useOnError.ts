import { useToast } from '@components/ui/use-toast';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { AxiosError } from 'axios';
import UserPool from 'constants/UserPool';
import { authenticatedUserAtom } from 'constants/atoms';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';

interface CustomError {
  message: { field?: string; error: string }[];
}

interface ErrorMessage {
  message: string;
}

interface OnError {
  handleError: (error: unknown) => void;
}

interface DBError {
  field: {
    target: string;
  };
  mysqlError?: string;
}

export default function useOnError(): OnError {
  const { toast } = useToast();
  const navigate = useNavigate();

  const authenticatedUser = useAtomValue(authenticatedUserAtom);

  function handleError(error: unknown): void {
    console.log('Error:', error);

    const axiosError = error as AxiosError;

    if (axiosError.message === 'Network Error') {
      toast({
        title: 'Network Error',
        variant: 'destructive',
      });
      return;
    }

    const dbError = axiosError.response?.data as DBError;

    if (dbError.mysqlError) {
      toast({
        title: dbError.field.target,
        variant: 'destructive',
      });
      return;
    }

    const customError = axiosError.response?.data as CustomError | ErrorMessage;

    const title = (customError as CustomError).message[0]?.error
      ? (customError as CustomError).message[0].error
      : (customError.message as string);

    if (title === 'Authentication credentials are missing or invalid.') {
      const userData = {
        Username: authenticatedUser.username,
        Pool: UserPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.signOut(() => {
        const tokenKeys = Object.keys(localStorage).filter((key) =>
          key.startsWith('CognitoIdentityServiceProvider'),
        );

        tokenKeys.forEach((key) => {
          localStorage.removeItem(key);
        });

        navigate('/login');
      });

      return;
    }

    toast({
      title,
      variant: 'destructive',
    });
  }

  return { handleError };
}
