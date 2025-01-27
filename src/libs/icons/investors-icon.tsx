import type { IconProps } from '../types/icon-props';

function InvestorsIcon({ className, active, variant }: IconProps) {
  if (variant === 'large') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="38"
        fill="none"
        viewBox="0 0 38 38"
      >
        <path
          fill="#DCAC00"
          d="M27.756 12.302a1.172 1.172 0 00-.333 0 4.55 4.55 0 01-4.401-4.56 4.578 4.578 0 014.575-4.575 4.578 4.578 0 014.576 4.575 4.576 4.576 0 01-4.417 4.56zm5.164 10.973c-1.773 1.187-4.259 1.63-6.555 1.33.602-1.299.919-2.74.935-4.26 0-1.583-.349-3.087-1.014-4.401 2.344-.317 4.83.127 6.619 1.314 2.501 1.647 2.501 4.354.015 6.017zM10.196 12.302c.111-.015.222-.015.333 0a4.55 4.55 0 004.402-4.56 4.567 4.567 0 00-9.136 0 4.55 4.55 0 004.402 4.56zm.176 8.044c0 1.535.333 2.992.934 4.306-2.232.238-4.56-.237-6.27-1.361-2.501-1.663-2.501-4.37 0-6.033 1.695-1.14 4.085-1.599 6.334-1.346-.65 1.33-.998 2.835-.998 4.434zm8.818 4.781a1.793 1.793 0 00-.412 0 5.423 5.423 0 01-5.24-5.43A5.46 5.46 0 0119 14.25a5.446 5.446 0 015.447 5.447 5.437 5.437 0 01-5.257 5.43zm-5.146 3.278c-2.39 1.599-2.39 4.227 0 5.81 2.723 1.821 7.188 1.821 9.912 0 2.39-1.599 2.39-4.227 0-5.81-2.708-1.821-7.173-1.821-9.912 0z"
        />
      </svg>
    );
  }
  return active ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="#DCAC00"
        d="M17.53 7.77a.739.739 0 00-.21 0 2.874 2.874 0 01-2.78-2.88C14.54 3.3 15.83 2 17.43 2c1.59 0 2.89 1.29 2.89 2.89a2.89 2.89 0 01-2.79 2.88zm3.262 6.93c-1.12.75-2.69 1.03-4.14.84.38-.82.58-1.73.59-2.69 0-1-.22-1.95-.64-2.78 1.48-.2 3.05.08 4.18.83 1.58 1.04 1.58 2.75.01 3.8zM6.44 7.77c.07-.01.14-.01.21 0a2.874 2.874 0 002.78-2.88 2.885 2.885 0 10-5.77 0c0 1.56 1.23 2.83 2.78 2.88zm.111 5.08c0 .97.21 1.89.59 2.72-1.41.15-2.88-.15-3.96-.86-1.58-1.05-1.58-2.76 0-3.81 1.07-.72 2.58-1.01 4-.85-.41.84-.63 1.79-.63 2.8zm5.57 3.02a1.13 1.13 0 00-.26 0 3.425 3.425 0 01-3.31-3.43C8.56 10.54 10.09 9 12 9c1.9 0 3.44 1.54 3.44 3.44a3.434 3.434 0 01-3.32 3.43zm-3.25 2.07c-1.51 1.01-1.51 2.67 0 3.67 1.72 1.15 4.54 1.15 6.26 0 1.51-1.01 1.51-2.67 0-3.67-1.71-1.15-4.53-1.15-6.26 0z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g>
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.97 14.44c1.37.23 2.88-.01 3.94-.72 1.41-.94 1.41-2.48 0-3.42-1.07-.71-2.6-.95-3.97-.71M7 14.44c-1.37.23-2.88-.01-3.94-.72-1.41-.94-1.41-2.48 0-3.42 1.07-.71 2.6-.95 3.97-.71M18 7.16a.605.605 0 00-.19 0 2.573 2.573 0 01-2.48-2.58c0-1.43 1.15-2.58 2.58-2.58a2.58 2.58 0 012.58 2.58A2.589 2.589 0 0118 7.16zm-12.03 0c.06-.01.13-.01.19 0a2.573 2.573 0 002.48-2.58C8.64 3.15 7.49 2 6.06 2a2.58 2.58 0 00-2.58 2.58c.01 1.4 1.11 2.53 2.49 2.58zM12 14.63a.605.605 0 00-.19 0 2.573 2.573 0 01-2.48-2.58c0-1.43 1.15-2.58 2.58-2.58a2.58 2.58 0 012.58 2.58c-.01 1.4-1.11 2.54-2.49 2.58zm-2.91 3.15c-1.41.94-1.41 2.48 0 3.42 1.6 1.07 4.22 1.07 5.82 0 1.41-.94 1.41-2.48 0-3.42-1.59-1.06-4.22-1.06-5.82 0z"
        />
      </g>
    </svg>
  );
}

export default InvestorsIcon;
