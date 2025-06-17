import styles from './Button.module.css';
import { Slot } from '@radix-ui/react-slot';

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'cancel' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
} & Pick<HTMLButtonProps, 'type' | 'disabled' | 'onClick'>;

export const Button: React.FC<Props> = ({
  type = 'button',
  children = 'Button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  asChild = false,
  onClick,
}) => {
  const buttonClass = `${styles.button} ${styles[`button-${variant}`]} ${
    styles[`size-${size}`]
  }`;

  const Component = asChild ? Slot : 'button';

  return (
    <Component
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      data-testid="button"
    >
      {children}
    </Component>
  );
};
