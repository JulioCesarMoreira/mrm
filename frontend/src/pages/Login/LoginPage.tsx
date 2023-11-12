import LoginCard from '../../components/LoginCard/LoginCard';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import Svg from '../../components/Svg/Svg';
import PasswordInput from './components/PasswordInput';
import EmailInput from './components/EmailInput';
import { LoginFields } from './types';
import { Button } from '@components/ui/button';
import { useState, type ReactElement } from 'react';
import UserPool from 'constants/UserPool';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useToast } from '@components/ui/use-toast';
import { Toaster } from '@components/ui/toaster';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(): ReactElement {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onFailure = () => {
    toast({
      title: 'E-mail ou senha inválidos.',
      variant: 'destructive',
    });

    setIsLoading(false);
  };

  const onSuccess = () => {
    toast({
      title: 'Autenticado com sucesso!',
      className: 'dark bg-dark-blue text-white stroke-white',
    });

    setIsLoading(false);

    navigate('/servicos');
  };

  function onLogin({ email, password }: LoginFields): void {
    setIsLoading(true);
    const authenticationData = {
      Username: email,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: UserPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess,
      onFailure,
      newPasswordRequired: () => {
        cognitoUser.completeNewPasswordChallenge(password, null, {
          onSuccess,
          onFailure,
        });
      },
    });
  }

  return (
    <>
      <Toaster />
      <div className="bg-dark-blue h-screen w-screen">
        <Svg name="hidro_ponta" className="fixed mt-10 ml-12" />

        <LoginCard>
          <FormWrapper<LoginFields>
            id="login-form"
            onSubmit={onLogin}
            defaultValues={{ email: '', password: '' }}
          >
            <EmailInput disabled={isLoading} />
            <PasswordInput disabled={isLoading} />

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-hidro-blue-300 hover:bg-main-blue mx-6 mt-10 mb-6 px-32 text-white"
            >
              Entrar
            </Button>
          </FormWrapper>
        </LoginCard>
      </div>
    </>
  );
}
