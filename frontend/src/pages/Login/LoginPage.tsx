import LoginCard from '../../components/LoginCard/LoginCard';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import type { ReactElement } from 'react';
import Button from '../../components/Button/Button';
import Svg from '../../components/Svg/Svg';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import { LoginFields } from './types';

export default function LoginPage(): ReactElement {
  function onLogin(data: LoginFields): void {
    console.log('data', data);
  }

  return (
    <div className="bg-dark-blue h-screen w-screen">
      <Svg name="hidro_ponta" className="fixed mt-10 ml-12" />

      <LoginCard>
        <FormWrapper<LoginFields>
          id="login-form"
          onSubmit={onLogin}
          defaultValues={{ email: '', password: '' }}
        >
          <EmailInput />
          <PasswordInput />

          <Button
            type="submit"
            className="bg-hidro-blue-300 mx-6 mt-10 mb-6 px-32 text-white"
          >
            Entrar
          </Button>
        </FormWrapper>
      </LoginCard>
    </div>
  );
}
