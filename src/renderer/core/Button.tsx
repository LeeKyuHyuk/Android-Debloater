import { styled } from '@stitches/react';
import * as React from 'react';
import { ACTIVE, BLACK_TEXT, DISABLED, PRIMARY, WHITE, WHITE_TEXT } from '../constants/colors';

const CommonButton = styled('button', {
  minWidth: '72px',
  display: 'inline-block',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 20px',
  margin: '0px 6px',
  background: PRIMARY,
  boxShadow: '0px 1px 4px rgba(3, 129, 254, 0.1), 0px 2px 4px rgba(3, 129, 254, 0.3)',
  border: 'none',
  borderRadius: '24px',
  verticalAlign: 'middle',
  '&:hover': {
    background: ACTIVE,
  },
  '&:active': {
    background: PRIMARY,
    boxShadow: 'none',
  },
  '&:disabled': {
    background: DISABLED,
    boxShadow: 'none',
  },
});

const ButtonText = styled('span', {
  color: WHITE_TEXT,
  fontSize: '1.15em',
});

type ButtonProps = {
  type: 'Main' | 'Sub';
  disable?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: string;
};

function Button({ type, disable, onClick, children }: ButtonProps) {
  return (
    <CommonButton
      style={
        type === 'Sub'
          ? {
              background: WHITE,
              boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.3)',
            }
          : {}
      }
      disabled={disable}
      onClick={onClick}
    >
      <ButtonText style={type === 'Sub' ? { color: BLACK_TEXT } : {}}>{children}</ButtonText>
    </CommonButton>
  );
}

export default Button;
