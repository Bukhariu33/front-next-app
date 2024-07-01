import { GradientBg } from './gradiant-background';
import LeftSideBar from './left-side-bar';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = (props: Props) => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <LeftSideBar />
      <div className="flex h-full items-center justify-center  pb-4 pt-32">
        {props.children}
      </div>
      <GradientBg />
    </div>
  );
};

export default AuthLayout;
