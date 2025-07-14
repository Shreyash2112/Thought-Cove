function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props }) {
    return (
        <button
            className={`px-6 py-2 ${bgColor} ${textColor} ${className}`}
            {...props}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button