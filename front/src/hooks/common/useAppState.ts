import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

function useAppState() {
  const [isComeback, setIsComeback] = useState<boolean | null>(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (appState.current.match(/active/) && nextAppState === 'background') {
          setIsComeback(false);
        }
        if (
          appState.current.match(/background|inactive/) &&
          nextAppState === 'active'
        ) {
          setIsComeback(true);
        }
        appState.current = nextAppState;
      },
    );

    return () => appStateListener.remove();
  }, []);

  return { isComeback };
}

export default useAppState;
