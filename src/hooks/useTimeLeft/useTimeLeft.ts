import { useEffect, useState } from 'react';
import { Nullable } from 'types';

import { ITimeLeft } from './useTimeLeft.types';

export type DateLike = string | number | Date;

const MILLISECONDS = 1;
const SECONDS = 1000 * MILLISECONDS;
const MINUTE = 60 * SECONDS;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
/**
 * Calculates time left from endTime to now
 * @param endTime
 * @returns {
 *     days: number | string;
 *     hours: number | string;
 *     minutes: number | string;
 *     seconds: number | string;
 * } | null
 */

const padNumber = (number: string | number) => {
  return `0${String(number)}`.slice(-2);
};
export const useTimeLeft = (endTime: DateLike, isPadded = false): Nullable<ITimeLeft> => {
  const calculateTimeLeft = (): Nullable<ITimeLeft> => {
    const dateEndTime = new Date(endTime);
    const difference = +dateEndTime - Date.now();

    if (difference > 0) {
      const days = Math.floor(difference / DAY);
      const hours = Math.floor(difference / HOUR) % 24;
      const minutes = Math.floor((difference / MINUTE) % 60);
      const seconds = Math.floor((difference / SECONDS) % 60);
      return {
        days: isPadded ? padNumber(days) : days,
        hours: isPadded ? padNumber(hours) : hours,
        minutes: isPadded ? padNumber(minutes) : minutes,
        seconds: isPadded ? padNumber(seconds) : seconds,
      };
    }

    return {
      days: isPadded ? padNumber(0) : 0,
      hours: isPadded ? padNumber(0) : 0,
      minutes: isPadded ? padNumber(0) : 0,
      seconds: isPadded ? padNumber(0) : 0,
    };
  };

  const [timeLeft, setTimeLeft] = useState<Nullable<ITimeLeft>>(calculateTimeLeft());

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  });

  return timeLeft;
};
