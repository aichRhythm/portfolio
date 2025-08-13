import { useEffect, useRef } from 'react';

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
      
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, input, textarea, [role="button"]') || target.closest('a, button, input, textarea, [role="button"]')) {
        cursor.classList.add('hover');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, input, textarea, [role="button"]') || target.closest('a, button, input, textarea, [role="button"]')) {
        cursor.classList.remove('hover');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return { cursorRef };
}