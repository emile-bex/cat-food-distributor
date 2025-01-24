import Cron from "react-js-cron";
import 'react-js-cron/dist/styles.css'

interface CronSelectorProps {
  value: string;
  setValue: (cron: string) => void;
}

export function CronSelector({value, setValue}: CronSelectorProps) {
  return (
    <Cron
      value={value}
      setValue={setValue}
      allowEmpty={'for-default-value'}
      clockFormat={'24-hour-clock'}
      defaultPeriod={'day'}
      mode={'single'}
      allowedPeriods={['year',
        'month',
        'week',
        'day',
        'hour',
        'minute']}
    />
  );
}
