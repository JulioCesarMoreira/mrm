import axios from 'axios';
import useOnError from 'hooks/useOnError';
import { InsertWellInput, Well } from '../types';

interface InsertWell {
  insertWell: (insertedWell: InsertWellInput) => Promise<Well>;
}

export default function useInsertWell(): InsertWell {
  const { handleError } = useOnError();

  const insertWell = async (insertedWell: InsertWellInput): Promise<Well> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/well`,
        insertedWell,
      );

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { insertWell };
}
