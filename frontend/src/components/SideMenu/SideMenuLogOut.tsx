import Svg from '../Svg/Svg';
import Tooltip from '../Tooltip/Tooltip';
import { useAtomValue } from 'jotai';
import {
  authenticatedUserAtom,
  isSideMenuOpenAtom,
} from '../../constants/atoms';
import { cn } from '@lib/utils';
import type { ReactElement } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import UserPool from 'constants/UserPool';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';

export default function SideMenuLogOut(): ReactElement {
  const navigate = useNavigate();

  const isOpen = useAtomValue(isSideMenuOpenAtom);
  const authenticatedUser = useAtomValue(authenticatedUserAtom);

  function onLogOut(): void {
    const userData = {
      Username: authenticatedUser.username,
      Pool: UserPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.signOut(() => {
      const tokenKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith('CognitoIdentityServiceProvider'),
      );

      tokenKeys.forEach((key) => {
        localStorage.removeItem(key);
      });

      navigate('/login');
    });
  }

  return (
    <Tooltip
      text="Sair"
      position="right"
      disabled={isOpen}
      className="translate-x-5"
    >
      <div ref={undefined}>
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="hover:bg-gray-scale-200 group mt-4 flex max-h-[44px] w-full max-w-[160px] items-center gap-6 rounded py-3 px-[7px] duration-200"
            >
              <Svg
                name="logout"
                className="fill-gray-scale-500 h-5 w-5 flex-shrink-0"
              />
              <p
                className={cn(
                  'text-gray-scale-700 whitespace-nowrap text-sm font-medium transition-all duration-200',
                  isOpen
                    ? 'w-auto opacity-100'
                    : 'pointer-events-none w-0 opacity-0',
                )}
              >
                Sair
              </p>
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogDescription className="text-gray-scale-300 text-center text-base font-semibold">
                <span>Você está prestes a sair do sistema.</span>
                <br />
                <span>Deseja continuar?</span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="border-gray-scale-800 border-t pt-4">
              <DialogTrigger asChild>
                <Button
                  variant={'secondary'}
                  className="hover:bg-gray-scale-700 transition-colors duration-200"
                >
                  Cancelar
                </Button>
              </DialogTrigger>

              <DialogTrigger asChild>
                <Button
                  onClick={onLogOut}
                  className="bg-red-auxiliary hover:bg-red-auxiliary-dark text-white transition-colors duration-200"
                >
                  Sim, sair do sistema
                </Button>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Tooltip>
  );
}
