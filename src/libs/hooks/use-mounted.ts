import { useEffect, useState } from 'react';

const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted;
};

export default useIsMounted;
