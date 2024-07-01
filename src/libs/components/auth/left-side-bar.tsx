import Image from '@/libs/components/Base/Image';

const LeftSideBar = () => {
  return (
    <div className="relative hidden h-full lg:block">
      <Image src="/images/auth_bg_left.jpg" alt="image" fill />
      <div className="felx-col relative flex h-full items-center justify-center">
        <div className="absolute top-52 mx-10 h-[400px] rounded-2xl bg-[rgba(0,0,0,0.64)] p-8  text-center">
          <p className="mb-3 text-[40px] font-bold text-white">
            Grow your Finance with Network Buxx
          </p>
          <p className="my-3 text-2xl text-white">
            NetworkBuxx is an advertising agency that advertises different //
            eslint-disable-next-line react/no-unescaped-entities national and
            multination brands businesses. We also provide earnings
            opportunities to people through viewing ads on our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
