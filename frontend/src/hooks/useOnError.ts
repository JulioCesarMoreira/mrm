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

export default function useOnError(): OnError {
  const { toast } = useToast();

  function handleError(error: unknown): void {
    const axiosError = error as AxiosError;
    const customError = axiosError.response?.data as CustomError | ErrorMessage;

    const title = (customError as CustomError).message[0]?.error
      ? (customError as CustomError).message[0].error
      : (customError.message as string);

    toast({
      title,
      variant: 'destructive',
    });
    console.log('Error:', error);
  }

  return { handleError };
}
