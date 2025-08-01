import { useId } from "react"

function Input({ label, type = "text", placeholder, className = "", ref, ...props }) {

    const id = useId()

    return (
        <div className="w-full text-left">
            {
                label && <label
                    className="inline-block pl-1 mb-1 text-left"
                    htmlFor={id}
                >
                    {label}
                </label>
            }

            <input
                type={type}
                placeholder={placeholder}
                className={`px-3 py-2 rounded-lg  outline-none focus:bg- bg-header/50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />

        </div>
    )
}

export default Input