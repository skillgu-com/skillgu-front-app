import React from "react";

export const Pro = ({
  className,
  color = '#FF6A3D',
}: {
  className?: string
  color?: string
}) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.147 17.1587H6.8529C6.48231 17.1587 6.06761 16.8675 5.94408 16.5146L2.29114 6.29691C1.77055 4.8322 2.37937 4.3822 3.63231 5.2822L7.07349 7.74397C7.64702 8.14103 8.29996 7.93809 8.54702 7.29397L10.1 3.15573C10.5941 1.8322 11.4147 1.8322 11.9088 3.15573L13.4617 7.29397C13.7088 7.93809 14.3617 8.14103 14.9264 7.74397L18.1558 5.44103C19.5323 4.45279 20.1941 4.95573 19.6294 6.55279L16.0647 16.5322C15.9323 16.8675 15.5176 17.1587 15.147 17.1587Z"
        stroke={color}
        strokeWidth="1.32353"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.14703 19.8234H15.8529"
        stroke={color}
        strokeWidth="1.32353"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.7941 12.7645H13.2059"
        stroke={color}
        strokeWidth="1.32353"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
