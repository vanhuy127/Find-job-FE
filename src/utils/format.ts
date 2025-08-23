import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { DATE_PATTERN, DEFAULT_TIME_ZONE } from '@/constants';

export function formatDate(
  date: string | Date,
  pattern: string = DATE_PATTERN.DATE_TIME,
  timeZone: string = DEFAULT_TIME_ZONE,
): string {
  const zonedDate = toZonedTime(date, timeZone);

  return format(zonedDate, pattern);
}

export function parseDateFromString(dateStr: string): Date | undefined {
  const [day, month, year] = dateStr.split('-').map(Number);
  if (!day || !month || !year) return undefined;

  return new Date(year, month - 1, day);
}

export const formatSalary = (min: number, max: number) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }

    return `${(num / 1000).toFixed(0)}K`;
  };

  return `${formatNumber(min)} - ${formatNumber(max)} VND`;
};

export const isDateExpired = (endDate: string) => {
  return new Date(endDate) < new Date();
};

export const numDateSince = (date: string | Date) => {
  const inputDate = date instanceof Date ? date : new Date(date);
  const now = new Date();

  const diffMs = now.getTime() - inputDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // tính theo năm & tháng
  const diffYears = now.getFullYear() - inputDate.getFullYear();
  const diffMonths = diffYears * 12 + (now.getMonth() - inputDate.getMonth());

  if (diffYears >= 1) {
    return `${diffYears} năm trước`;
  } else if (diffMonths >= 1) {
    return `${diffMonths} tháng trước`;
  } else {
    return `${diffDays} ngày trước`;
  }
};
