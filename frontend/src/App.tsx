import SideMenu from '@components/SideMenu/SideMenu';
import { Toaster } from '@components/ui/toaster';
import { authenticatedUserAtom } from 'constants/atoms';
import { useSetAtom } from 'jotai';
import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function App(): ReactElement {
  const setAuthenticatedUser = useSetAtom(authenticatedUserAtom);

  const isAuthenticated = (): boolean => {
    const idTokenKey = Object.keys(localStorage).find(
      (key) =>
        key.startsWith('CognitoIdentityServiceProvider') &&
        key.endsWith('idToken'),
    );
    const accessTokenKey = Object.keys(localStorage).find(
      (key) =>
        key.startsWith('CognitoIdentityServiceProvider') &&
        key.endsWith('accessToken'),
    );

    if (!idTokenKey || !accessTokenKey) return false;

    const idToken = localStorage.getItem(idTokenKey);
    const accessToken = localStorage.getItem(accessTokenKey);

    if (!idToken || !accessToken) return false;

    const idTokenData = JSON.parse(atob(idToken.split('.')[1]));
    const accessTokenData = JSON.parse(atob(accessToken.split('.')[1]));

    if (idTokenData && accessTokenData) {
      setAuthenticatedUser({
        cognitoId: idTokenData['cognito:username'],
        username: idTokenData.email,
      });

      return true;
    }

    return false;
  };

  return isAuthenticated() ? (
    <>
      <Navigate to="/servicos" replace />
      <div className="flex h-screen max-h-[100vh] max-w-[100vw]">
        <SideMenu />
        <Toaster />
        <div className="w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}
