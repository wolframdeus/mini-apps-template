import {ButtonHTMLAttributes, ReactNode} from 'react';
import {StyledComponentProps} from '@material-ui/styles';

export type ButtonVariantType = 'primary' | 'secondary' | 'tertiary'
  | 'outline';

export interface Point {
  x: number;
  y: number;
}

export interface Ripple {
  id: string;
  coords: Point;
  removeTimeoutId: number | null;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, StyledComponentProps {
  before?: ReactNode;
  after?: ReactNode;
  variant?: ButtonVariantType;
  href?: string;
  fullWidth?: boolean;
  size?: 'm' | 'l' | 'xl';
}

export interface ButtonColors {
  background: string;
  foreground: string;
  border: string;
  ripple: string;
}

export interface ButtonVariant {
  colors: ButtonColors;
}

export interface ButtonTheme {
  primary: ButtonVariant;
  secondary: ButtonVariant;
  tertiary: ButtonVariant;
  outline: ButtonVariant;
}
