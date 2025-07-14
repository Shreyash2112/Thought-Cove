import { useId } from "react"

function SelectBtn({ options, label, className = '', ref, ...props }) {

    const id = useId()

    return (
        <div className="w-full">
            {label && <label htmlFor={id}></label>}
            <select
                id={id}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 border border-gray-200 w-full duration-200 ${className}`}
                {...props}
                ref={ref}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectBtn