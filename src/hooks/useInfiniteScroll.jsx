
import { useEffect } from "react";

export default function useInfiniteScroll({ targetRef, disabled, onIntersect, rootMargin = "200px" }) {
  useEffect(() => {
    const target = targetRef?.current;
    if (!target || disabled) return;
    let disconnected = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && onIntersect && !disconnected) onIntersect();
        });
      },
      { root: null, rootMargin, threshold: 0 }
    );
    obs.observe(target);
    return () => {
      disconnected = true;
      obs.disconnect();
    };
  }, [targetRef, disabled, onIntersect, rootMargin]);
}
