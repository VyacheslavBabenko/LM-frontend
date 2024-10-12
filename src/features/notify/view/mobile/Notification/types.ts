import { INotifyTypes } from 'features/notify/redux/types';

interface INotificationProps {
  id: string;
  text: string;
  type: INotifyTypes;
  needClose: boolean;
  /* deleteNotify={deleteNotify} */
}

export type { INotificationProps };
