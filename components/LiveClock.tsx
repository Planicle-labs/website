'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface LiveClockProps {
  showIcon?: boolean;
  timeZone?: string;
  label?: string;
  className?: string;
}

export default function LiveClock({
  showIcon = true,
  timeZone = 'Europe/London',
  label = 'in London',
  className = 'text-[13px] text-gray-600 font-normal',
}: LiveClockProps) {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      try {
        const formatted = now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          timeZone: timeZone,
        });
        setTimeStr(formatted);
      } catch {
        // Fallback if timezone not supported
        const formatted = now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        });
        setTimeStr(formatted);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, [timeZone]);

  if (!timeStr) {
    return (
      <span className={`inline-flex items-center gap-1.5 opacity-50 ${className}`}>
        {showIcon && <Clock size={14} className="text-current" />}
        <span>--:-- {label}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {showIcon && <Clock size={14} className="text-current" />}
      <span>
        {timeStr} {label ? `${label}` : ''}
      </span>
    </span>
  );
}
