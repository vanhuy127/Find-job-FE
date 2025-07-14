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
