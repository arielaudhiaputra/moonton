import { forwardRef, useEffect, useRef } from 'react';
import PropTypes from "prop-types";

forwardRef.PropTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "error", "primary-outline"]),
    autoCompolete: PropTypes.string,
    required: PropTypes.bool,
    isFocused: PropTypes.bool,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    isError: PropTypes.bool
}

export default forwardRef(function TextInput({
    type = 'text',
    className = '',
    defaultValue,
    autoCompolete,
    variant = 'primary',
    placeholder,
    isError,
    isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
               {...props}
               type={type}
               defaultValue={defaultValue}
               className={`rounded-2xl bg-form-bg py-[13px] px-7 ${isError && "input-error"} w-full input-${variant} ${className}`}
               ref={input}
               placeholder={placeholder}
               autoComplete = {autoCompolete}
            />
        </div>
    );
});
