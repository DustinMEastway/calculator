import { useEffect } from 'react';

export function useEventListener(
  target: EventTarget,
  event: string,
  callback: EventListener
): void {
  useEffect(() => {
    target.addEventListener(event, callback);

    return () => {
      target.removeEventListener(event, callback);
    }
  }, [callback, event, target]);
}
