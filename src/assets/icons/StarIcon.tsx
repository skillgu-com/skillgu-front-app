import React from "react";

type Props = {
  className?: string;
};

export const StarIcon = ({ className }: Props) => {
  return (
      <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
      >
        <rect
            x="0.588236"
            y="0.588236"
            width="38.8235"
            height="38.8235"
            rx="19.4118"
            fill="#F8F8FB"
        />
        <rect
            x="0.588236"
            y="0.588236"
            width="38.8235"
            height="38.8235"
            rx="19.4118"
            stroke="#E2E9FC"
            strokeWidth="1.17647"
        />
        <path
            d="M22.9912 14.0087L24.2353 16.4969C24.4029 16.8411 24.8529 17.1675 25.2323 17.2381L27.4823 17.6087C28.9206 17.8469 29.2559 18.8881 28.2235 19.9293L26.4676 21.6852C26.1764 21.9764 26.0088 22.5499 26.1059 22.9646L26.6088 25.1352C27.0059 26.847 26.0882 27.5175 24.5794 26.6175L22.4706 25.3646C22.0911 25.1352 21.4559 25.1352 21.0764 25.3646L18.9676 26.6175C17.4588 27.5087 16.5412 26.847 16.9382 25.1352L17.4412 22.9646C17.5382 22.5587 17.3706 21.9852 17.0794 21.6852L15.3235 19.9293C14.2912 18.8969 14.6265 17.8558 16.0647 17.6087L18.3147 17.2381C18.6941 17.1764 19.1441 16.8411 19.3117 16.4969L20.5559 14.0087C21.2176 12.6587 22.3118 12.6587 22.9912 14.0087Z"
            stroke="#FF6A3D"
            strokeWidth="1.32353"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16.4706 13.8234H11.1765"
            stroke="#FF6A3D"
            strokeWidth="1.32353"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13.8235 26.1763H11.1765"
            stroke="#FF6A3D"
            strokeWidth="1.32353"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12.0588 19.9999H11.1765"
            stroke="#FF6A3D"
            strokeWidth="1.32353"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </svg>
  );
};
