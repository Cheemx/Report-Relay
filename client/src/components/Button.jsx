import React from 'react'

const Button = ({
    children,
    type = "button",
    bgColor = "bg-cyan-400",
    textColor = "text-black-950",
    className = "",
    ...props
}) => {
    return (
        <button className={`px-4 py-2 rounded-full hover:bg-cyan-600 ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button