import { cn } from '@/utils/cn';

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('inline-block text-white', className)}
  >
    <path
      d="M11 8.11914C11 10.3541 10.1534 11.2491 8.03941 11.2491H4.96059C2.84656 11.2491 2 10.3541 2 8.11914"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 2L6.5 7M6.5 7L4.5 5.23684M6.5 7L8.5 5.23684"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DownloadIcon;
