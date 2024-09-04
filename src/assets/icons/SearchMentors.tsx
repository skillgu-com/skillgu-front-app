import React from "react";

type Props = {
  className?: string;
  color?: string;
};

export const SearchMentorsSvg = ({ className, color = "currentColor" }: Props) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.5665 7.64938V13.3493C17.5665 14.2827 17.0665 15.1494 16.2581 15.6244L11.3081 18.4827C10.4998 18.9494 9.49981 18.9494 8.68314 18.4827L3.73314 15.6244C2.9248 15.1577 2.4248 14.291 2.4248 13.3493V7.64938C2.4248 6.71604 2.9248 5.84934 3.73314 5.37434L8.68314 2.51602C9.49147 2.04935 10.4915 2.04935 11.3081 2.51602L16.2581 5.37434C17.0665 5.84934 17.5665 6.70771 17.5665 7.64938Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99977 9.66651C11.0721 9.66651 11.9414 8.79719 11.9414 7.72483C11.9414 6.65248 11.0721 5.7832 9.99977 5.7832C8.92742 5.7832 8.05811 6.65248 8.05811 7.72483C8.05811 8.79719 8.92742 9.66651 9.99977 9.66651Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3332 14.3826C13.3332 12.8826 11.8415 11.666 9.99984 11.666C8.15817 11.666 6.6665 12.8826 6.6665 14.3826"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
