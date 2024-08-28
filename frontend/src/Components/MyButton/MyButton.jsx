import React from 'react'

function MyButton(
    {
        children = "hehe, pass children prop",
        type = "button",
        bgColor = "bg-orange",
        textColor = "text-white",
        className = "",
        ...props

    }
) {
    return (
        <button

            className={`px-8 md:px-10 py-2 text-xl rounded-full hover:bg-transparent border-darkBlue hover:border-orange border-2 duration-300  ${className} ${bgColor} ${textColor}`} {...props}
        >{children}</button>
    )
}

export default MyButton