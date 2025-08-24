import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  text,
  color,
  className = '',
  custome = '',
  size = '',
  icon: Icon = null,
  disabled = false,
  ...rest
}: {
  text: string
  color: string
  className?: string
  custome?: string
  size?: string
  icon?: React.ElementType | null
  disabled?: boolean
  [key: string]: any
}) => {
  return (
    <button
      className={` ${color} ${custome} ${className} ${size} ${
        disabled ? 'cursor-not-allowed' : ''
      }`}
      disabled={disabled}
      {...rest}
    >
      {Icon && <Icon className='size-4' />}
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
  custome: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.elementType,
  disabled: PropTypes.bool,
}

export default Button
