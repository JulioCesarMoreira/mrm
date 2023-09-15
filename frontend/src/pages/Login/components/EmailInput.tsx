import { ReactElement } from 'react';
import { Input } from '../../../components/Input';

export default function EmailInput(): ReactElement {
  return (
    <Input.Wrapper className="mt-4">
      <Input.Label label="E-mail" required />
      <Input.Field name="email" placeholder="Digite seu e-mail" />
    </Input.Wrapper>
  );
}
