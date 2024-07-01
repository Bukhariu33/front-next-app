interface Props extends React.SVGProps<SVGSVGElement> {}
function UploadIcon(props: Props) {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.2998 21.6002L5.2998 23.0002C5.2998 25.3198 7.18021 27.2002 9.4998 27.2002L23.4998 27.2002C25.8194 27.2002 27.6998 25.3198 27.6998 23.0002L27.6998 21.6002M22.0998 10.4002L16.4998 4.8002M16.4998 4.8002L10.8998 10.4002M16.4998 4.8002L16.4998 21.6002"
        stroke="#171717"
        strokeWidth="2.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default UploadIcon;
