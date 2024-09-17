import React from 'react';

interface Props {
    size?: string;
    className?: string;
    color?: string;
}

export const WWWIcon: React.FC<Props> = ({
                                             size = "1em",
                                             className,
                                             color = "currentColor",
                                         }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 32 32"
            className={className}
        >
            <circle cx="16" cy="16" r="16" fill={color} />
            <path
                fill="#000"
                d="M10.4 22l-2.4-8h-1l2.4 8h1zm6.4 0l-2.4-8h-1l2.4 8h1zm5.6 0l-2.4-8h-1l2.4 8h1zm-3.6-8h-1l-2.4 8h1l2.4-8zm-1-4l-2.4 8h1l2.4-8h-1z"
            />
        </svg>
    );
};
