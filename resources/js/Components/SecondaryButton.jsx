import React from 'react';
import PropTypes from "prop-types";

SecondaryButton.propTypes = {
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "danger", "warning", "light-outline", "white-outline"]),
    processing: PropTypes.bool,
}

export default function SecondaryButton({
    type = "primary",
    className,
    variant,
    disabled,
    processing,
    children,
     ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={`rounded-2xl py-[13px] text-center w-full ${processing && "opacity-30"} btn-${variant} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
