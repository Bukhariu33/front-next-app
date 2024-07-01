const ChevronIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 8.39844L12 14.3984L18 8.39844"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronIcon;
