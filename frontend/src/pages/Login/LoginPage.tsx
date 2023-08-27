import LoginCard from '../../components/LoginCard/LoginCard';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import Svg from '../../components/Svg/Svg';
import PasswordInput from './components/PasswordInput';
import EmailInput from './components/EmailInput';
import { LoginFields } from './types';
import { Button } from '@components/ui/button';
import type { ReactElement } from 'react';

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
            className="bg-hidro-blue-300 hover:bg-main-blue mx-6 mt-10 mb-6 px-32 text-white"
          >
            Entrar
          </Button>
        </FormWrapper>
      </LoginCard>
    </div>
  );
}
