import { useCallback, useEffect, useRef, useState } from 'react';

interface TimerProps {
  timer: number;
  isDisabled: boolean;
  startTimer: () => void;
}

const useTimer = (initialState = 60): TimerProps => {
  const [timer, setTimer] = useState<number>(initialState);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setIsDisabled(false);
      clearTimer();
    }
  }, [timer, clearTimer]);

  const startTimer = () => {
    setIsDisabled(true);
    setTimer(initialState);
    intervalRef.current = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);
  };

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return { timer, isDisabled, startTimer };
};

export default useTimer;
