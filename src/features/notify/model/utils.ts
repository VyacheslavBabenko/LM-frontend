import { INotifyTypes } from 'features/notify/redux/types';

import defaultSVG from './img/default.svg';
import successSVG from './img/success.svg';
import errorSVG from './img/error.svg';

export const getNotifyIcon = (type: INotifyTypes) => {
  switch (type) {
    case 'success':
      return successSVG;
    case 'error':
      return errorSVG;
    default:
      return defaultSVG;
  }
};
