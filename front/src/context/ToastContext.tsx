import { createContext, ReactNode, useState } from 'react';
import CustomToast from '@/components/common/CustomToast.tsx';

export interface ToastContext {
  show: ({ message, time }: ShowToastParams) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

type DurationTime = 'long' | 'short';

type ToastState = {
  message: string;
  isShowToast: boolean;
  time: DurationTime;
};

const ToastContext = createContext<ToastContext>({
  show: ({ message, time }) => {},
});

type ShowToastParams = {
  message: string;
  time: DurationTime;
};

function ToastProvider({ children }: ToastProviderProps) {
  const [toastState, setToastState] = useState<ToastState>({
    isShowToast: false,
    message: '',
    time: 'short',
  });
  const { isShowToast, ...toastProps } = toastState;

  function showToast({ message, time }: ShowToastParams) {
    setToastState({
      message,
      time,
      isShowToast: true,
    });

    const durationTime = time === 'long' ? 4000 : 2500;

    const timer = setTimeout(() => {
      setToastState({ isShowToast: false, message: '', time: 'short' });
    }, durationTime + 500);

    return () => clearTimeout(timer);
  }

  const providerValue = {
    show: ({ message, time }: ShowToastParams) => {
      showToast({ message, time });
    },
  };

  return (
    <ToastContext.Provider value={providerValue}>
      {children}
      {toastState.isShowToast && <CustomToast {...toastProps} />}
    </ToastContext.Provider>
  );
}

export { ToastProvider, ToastContext };
