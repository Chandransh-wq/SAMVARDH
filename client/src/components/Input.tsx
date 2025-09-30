import React from 'react'

interface InputProps {
    placeholder?: string;
    type?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    type = "text",
    value,
    onChange,
    className
}) => {
    return (
        <input
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            className={className}
        />
    )
}


export default Input