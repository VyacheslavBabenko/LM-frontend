import React, { useState, useEffect } from 'react';
import block from 'bem-cn';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import './Time.scss';

const b = block('time-desktop');

const timeZone = Math.abs(new Date().getTimezoneOffset() / 60);

const getCurrentTime = () => dayjs().locale('ru').format('HH:mm:ss');

const Time = () => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const timeId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(timeId);
  }, [time]);

  return (
    <div className={b()}>
      <div className={b('time')}>{getCurrentTime()}</div>
      <div className={b('timezone')}>(GMT+{timeZone})</div>
    </div>
  );
};

export default Time;
