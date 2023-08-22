import { ReactElement } from 'react';
import { Input } from '../../../components/FormFields/Input';

export default function EmailInput(): ReactElement {
  return (
    <Input.Wrapper className="mt-4">
      <Input.Label label="E-mail" required />
      <Input.Field id="email" name="email" placeholder="Digite seu e-mail" />
    </Input.Wrapper>
  );
}
