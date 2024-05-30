import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg active:bg-blue-300 duration-200 ${textColor} ${bgColor} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button