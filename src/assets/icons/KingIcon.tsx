import React from "react";

type Props = {
  className?: string;
};

export function KingIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        d="M12 2C10.8954 2 10 2.89543 10 4V5.5H8C7.44772 5.5 7 5.94772 7 6.5V10C7 10.5523 7.44772 11 8 11H16C16.5523 11 17 10.5523 17 10V6.5C17 5.94772 16.5523 5.5 16 5.5H14V4C14 2.89543 13.1046 2 12 2Z"
        fill="currentColor"
      />
      <path
        d="M8 11V18H10.5V21.5C10.5 21.7761 10.7239 22 11 22H13C13.2761 22 13.5 21.7761 13.5 21.5V18H16V11H8Z"
        fill="currentColor"
      />
    </svg>
  );
}
