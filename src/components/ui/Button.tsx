import { FunctionComponent, ReactNode } from 'react'

import { cn } from 'lib/utils'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-row items-center justify-center px-6 py-3 font-medium transition hover:brightness-125 active:scale-95',
        {
          'bg-primary text-black': variant === 'primary',
          'border-secondary text-secondary border': variant == 'secondary',
        },
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
