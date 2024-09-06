import React from "react";

export const Basic = ({
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
        d="M13.9912 5.00872L15.2353 7.49694C15.4029 7.84106 15.8529 8.16753 16.2323 8.23812L18.4823 8.6087C19.9206 8.84694 20.2559 9.88812 19.2235 10.9293L17.4676 12.6852C17.1764 12.9764 17.0088 13.5499 17.1059 13.9646L17.6088 16.1352C18.0059 17.847 17.0882 18.5175 15.5794 17.6175L13.4706 16.3646C13.0911 16.1352 12.4559 16.1352 12.0764 16.3646L9.96761 17.6175C8.45879 18.5087 7.54115 17.847 7.93821 16.1352L8.44116 13.9646C8.53822 13.5587 8.37057 12.9852 8.07939 12.6852L6.32352 10.9293C5.29117 9.89694 5.62646 8.85576 7.06469 8.6087L9.31468 8.23812C9.69409 8.17635 10.1441 7.84106 10.3117 7.49694L11.5559 5.00872C12.2176 3.65872 13.3118 3.65872 13.9912 5.00872Z"
        stroke={color}
        strokeWidth="1.32353"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.47057 4.82336H2.17645"
        stroke={color}
        strokeWidth="1.32353"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.82351 17.1763H2.17645"
        stroke={color}
        strokeWidth="1.32353"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.05881 10.9999H2.17645"
        stroke={color}
        strokeWidth="1.32353"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
