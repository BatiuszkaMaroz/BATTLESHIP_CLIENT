import React from 'react';

import styles from './Button.module.scss';

interface Props {
  className?: string;
  icon?: React.FC;
  [x: string]: any;
}

const Button: React.FC<Props> = ({
  children,
  className = '',
  icon: Icon,
  ...rest
}) => {
  const animate = (e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLButtonElement;

    const { x, y } = button.getBoundingClientRect();
    const { clientX, clientY } = e;

    const left = clientX - x;
    const top = clientY - y;

    const ripple = document.createElement('div');
    ripple.className = styles.Ripple;
    ripple.style.left = left + 'px';
    ripple.style.top = top + 'px';

    button.append(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 500);
  };

  return (
    <button className={`${styles.Button} ${className}`} {...rest}>
      <div onClick={animate} className={styles.Ripple__Container}></div>
      <div className={styles.Icon}>{Icon && <Icon />}</div>
      <div className={styles.Text}>{children}</div>
    </button>
  );
};

export default Button;