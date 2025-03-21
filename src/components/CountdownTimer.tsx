import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const now = new Date();
    return {
      days: 13,
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    };
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper for two-digit display
  const formatTimeUnit = (value: number): string[] => {
    return value.toString().padStart(2, '0').split('');
  };

  // Static card (no flip animation)
  const FlipCard = ({ value }: { value: string }) => {
    return (
      <motion.div
        className="flip-card relative w-14 h-20 md:w-16 md:h-24 mx-0.5 md:mx-1 flex items-center justify-center text-2xl md:text-4xl"
        // No animate prop here, so the digit simply updates without flipping.
        animate={{ rotateX: 0, scale: 1 }}
      >
        {value}
      </motion.div>
    );
  };

  // Timer unit (days, hours, etc.) with label
  const TimerUnit = ({ value, label }: { value: number; label: string }) => {
    const digits = formatTimeUnit(value);

    return (
      <div className="flex flex-col items-center mx-1 md:mx-3">
        <div className="flex">
          <FlipCard value={digits[0]} />
          <FlipCard value={digits[1]} />
        </div>
        <span className="text-white text-xs md:text-sm mt-2 font-bold tracking-wider">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap justify-center">
        <TimerUnit value={timeLeft.days} label="DAYS" />
        <TimerUnit value={timeLeft.hours} label="HOURS" />
        <TimerUnit value={timeLeft.minutes} label="MINUTES" />
        <TimerUnit value={timeLeft.seconds} label="SECONDS" />
      </div>
      <div className="text-[25px] md:text-[30px] lg:text-[35px] font-bold text-white bolt-title">
        
        {/* <span className="mx-4">Hours</span>
        <span className="mx-4">Minutes</span>
        <span className="mx-4">Seconds</span> */}
      </div>
      
    </div>
  );
};

export default CountdownTimer;
