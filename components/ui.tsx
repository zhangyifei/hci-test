import React from 'react';

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.();
  };

  const finalTestId = disabled && props['data-testid'] ? `${props['data-testid']}-disabled` : props['data-testid'];

  return (
    <button
      onClick={handleClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
      data-testid={finalTestId}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  onClick,
  className = '',
  hoverable = false,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      onClick={onClick}
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export function Chip({
  children,
  selected = false,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className={`chip ${selected ? 'chip-selected' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Tag({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLSpanElement>) {
  return <span className="tag" {...props}>{children}</span>;
}
