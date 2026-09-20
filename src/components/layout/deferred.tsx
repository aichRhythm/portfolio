import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Defers rendering (and therefore loading) of a below-the-fold chunk until it
 * is near the viewport. Wrap a React.lazy component to split it out of the
 * main bundle and load it on demand.
 */
export function Deferred({
  children,
  rootMargin = "500px 0px",
}: {
  children: ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref}>
      {show ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}
