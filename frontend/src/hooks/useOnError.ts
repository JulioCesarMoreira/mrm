import { useToast } from '@components/ui/use-toast';
import { AxiosError } from 'axios';

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

    toast({
      title,
      variant: 'destructive',
    });
  }

  return { handleError };
}
