import React from 'react';

interface Props {
    size?: string;
    className?: string;
    color?: string;
}

export const BehanceIcon: React.FC<Props> = ({
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
            <circle cx="16" cy="16" r="16" fill={color}/>
            <path
                fill="#1769FF"
                d="M10 11h5c2 0 3 1 3 3s-1 3-3 3h-5V11zm0 8h5c2 0 3 1 3 3s-1 3-3 3h-5V19zm9 0h2.5c1.5 0 2.5-1 2.5-2.5V16c0-1.5-1-2.5-2.5-2.5H19v5zm0-8h2.5c1.5 0 2.5-1 2.5-2.5V8c0-1.5-1-2.5-2.5-2.5H19v5z"
            />
        </svg>
    );
};
