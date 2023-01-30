import moment from 'moment';

export const dateFormatter = (date: number | string, format = 'lll', daysLeftFormat = false) => {
  if (typeof date === 'string') {
    return moment(date).format(format);
  }
  if (daysLeftFormat) {
    const differenceDate = moment(date * 1000).diff(moment(), 'days');
    return differenceDate >= 0 ? differenceDate : '0';
  }
  return moment(date * 1000).format(format);
};

type intervalDateObj = {
  datetimeStart?: string | number;
  datetimeEnd: string;
};

export const getTimeAgo = (timeStamp: string | number) => moment(timeStamp).fromNow(true);
export const getTimeTo = (timeStamp: string | number) => moment(timeStamp).toNow(true);

export const getDateData = (timeStamp: string | number) => {
  const month = moment(timeStamp).format('MMMM');
  const year = moment(timeStamp).format('YYYY');
  const day = moment(timeStamp).format('D');
  const time = moment(timeStamp).format('h:mm a');

  return {
    year,
    month,
    day,
    time,
  };
};

export const registrationTimeStamp = ({ datetimeStart = Date.now(), datetimeEnd }: intervalDateObj) => {
  return moment(datetimeEnd).diff(moment(datetimeStart), 'days') + 1;
};

export const isValidPeriod = ({ datetimeStart, datetimeEnd }: intervalDateObj) => {
  return moment.utc(datetimeEnd).valueOf() > Date.now() && Date.now() > moment.utc(datetimeStart).valueOf();
};
