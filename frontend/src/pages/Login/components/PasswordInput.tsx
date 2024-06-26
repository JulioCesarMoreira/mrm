import { Input } from '@components/Input';
import Svg from '@components/Svg/Svg';
import { ReactElement, useState } from 'react';

export default function PasswordInput({
  disabled,
}: {
  disabled: boolean;
}): ReactElement {
  const [visible, setVisible] = useState<boolean>(false);

  function onChangeVisibility(): void {
    setVisible((previous) => !previous);
  }

  return (
    <Input.Wrapper className="mt-8">
      <Input.Label label="Senha" required />
      <Input.Field
        name="password"
        placeholder="Digite sua senha"
        type={visible ? 'text' : 'password'}
        disabled={disabled}
      >
        <button
          type="button"
          onClick={onChangeVisibility}
          className="group focus-visible:!outline-0"
          tabIndex={-1}
        >
          {visible ? (
            <Svg className="fill-gray-scale-500 mr-2" name="visibility" />
          ) : (
            <Svg className="fill-gray-scale-500 mr-2" name="visibility_off" />
          )}
        </button>
      </Input.Field>
    </Input.Wrapper>
  );
}
