import type { IconProps } from '../types/icon-props';

const FundIssuanceIcon = ({ className, active, variant }: IconProps) => {
  if (variant === 'large') {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="10" fill="#FFF7DF" />
        <path
          d="M30.0165 8.49895C29.3673 7.84979 28.2432 8.29312 28.2432 9.19562V14.7215C28.2432 17.0331 30.2065 18.949 32.5973 18.949C34.1015 18.9648 36.1915 18.9648 37.9807 18.9648C38.8832 18.9648 39.3582 17.904 38.7248 17.2706C36.4448 14.9748 32.3598 10.8423 30.0165 8.49895Z"
          fill="#DCAC00"
        />
        <path
          d="M37.458 21.1345H32.8822C29.1297 21.1345 26.0738 18.0787 26.0738 14.3262V9.75033C26.0738 8.87949 25.3613 8.16699 24.4905 8.16699H17.7772C12.9005 8.16699 8.95801 11.3337 8.95801 16.9862V31.0145C8.95801 36.667 12.9005 39.8337 17.7772 39.8337H30.2222C35.0988 39.8337 39.0413 36.667 39.0413 31.0145V22.7178C39.0413 21.847 38.3288 21.1345 37.458 21.1345ZM23.208 33.1045H16.8747C16.2255 33.1045 15.6872 32.5662 15.6872 31.917C15.6872 31.2678 16.2255 30.7295 16.8747 30.7295H23.208C23.8572 30.7295 24.3955 31.2678 24.3955 31.917C24.3955 32.5662 23.8572 33.1045 23.208 33.1045ZM26.3747 26.7712H16.8747C16.2255 26.7712 15.6872 26.2328 15.6872 25.5837C15.6872 24.9345 16.2255 24.3962 16.8747 24.3962H26.3747C27.0238 24.3962 27.5622 24.9345 27.5622 25.5837C27.5622 26.2328 27.0238 26.7712 26.3747 26.7712Z"
          fill="#DCAC00"
        />
      </svg>
    );
  }
  return active ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
        stroke="#DCAC00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13H13M7 17H11M22 10H18C15 10 14 9 14 6V2L22 10Z"
        stroke="#DCAC00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13H13M7 17H11M22 10H18C15 10 14 9 14 6V2L22 10Z"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FundIssuanceIcon;
