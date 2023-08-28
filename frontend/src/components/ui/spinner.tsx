import { Loader2 } from 'lucide-react';
import { ReactElement } from 'react';

export default function Spinner(): ReactElement {
  return <Loader2 className="stroke-hidro-blue-300 h-10 w-10 animate-spin" />;
}
