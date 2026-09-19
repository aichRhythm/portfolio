import { useEffect, useState } from "react";

function formatTime(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  } catch {
    return "";
  }
}

/**
 * Live clock for a given IANA time zone. Aligns to the next minute boundary
 * and then ticks once a minute, so the displayed time is never stale.
 */
export function useLocalTime(timeZone: string): string {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;

    const tick = () => setTime(formatTime(timeZone));
    tick();

    const now = new Date();
    const msToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, msToNextMinute);

    return () => {
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [timeZone]);

  return time;
}
