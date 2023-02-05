import clsx from 'clsx';
import { forwardRef } from 'react';
import { BaseButton } from './BaseButton';
import { CLASSNAME_PREFIX } from '../../utils/constant';
import Loading from '../../icons/Loading';
import type { ButtonHTMLAttributes } from 'react';
import type { BaseButtonProps } from './BaseButton';

export type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    loadingPosition = 'left',
    loadingText,
    leftIcon,
    loading,
    rightIcon,
    className,
    variant = 'solid',
    ...rest
  } = props;

  return (
    <BaseButton
      className={clsx(
        `${CLASSNAME_PREFIX}-btn`,
        { [`${CLASSNAME_PREFIX}-btn-disabled`]: rest.disabled },
        { [`${CLASSNAME_PREFIX}-btn-loading`]: loading },
        className,
      )}
      variant={variant}
      ref={ref}
      {...rest}
    >
      {loading && loadingPosition === 'center' && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
         <Loading width={16} stroke={variant !== 'solid' ? '#333' : '#fff'} />
        </div>
      )}

      {loading && loadingPosition === 'left' ? (
        <Loading width={16} stroke={variant !== 'solid' ? '#333' : '#fff'} />
      ) : (
        leftIcon
      )}
      {loading && loadingText ? loadingText : children}
      {loading && loadingPosition === 'right' ? (
        <Loading width={16} stroke={variant !== 'solid' ? '#333' : '#fff'} />
      ) : (
        rightIcon
      )}
    </BaseButton>
  );
});

export default Button;
