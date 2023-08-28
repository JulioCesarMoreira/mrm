import { useToast } from '@components/ui/use-toast';
import { AxiosError } from 'axios';

interface CustomError {
  message: { field?: string; error: string }[];
}

interface OnError {
  handleError: (error: unknown) => void;
}

export default function useOnError(): OnError {
  const { toast } = useToast();

  function handleError(error: unknown): void {
    const axiosError = error as AxiosError;
    const customError = axiosError.response?.data as CustomError;

    toast({
      title: customError.message[0]?.error,
      variant: 'destructive',
    });
    console.error('Error deleting client:', error);
  }

  return { handleError };
}
