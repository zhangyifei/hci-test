import React from 'react';

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
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
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

export function Chip({
  children,
  selected = false,
  onClick,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`chip ${selected ? 'chip-selected' : ''}`}
    >
      {children}
    </button>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}
