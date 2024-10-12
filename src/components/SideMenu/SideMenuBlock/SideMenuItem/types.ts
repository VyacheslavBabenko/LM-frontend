import { RouteComponentProps } from 'react-router-dom';

type ISideMenuItem = {
  to: string;
  svg: string;
  svgActive: string;
  text: string;
  activeLinks: string[];
  activeLinkExceptions?: string[];
  disabledRoles?: number[];
};

interface ISideMenuItemProps extends RouteComponentProps {
  item: ISideMenuItem;
}

export type { ISideMenuItemProps, ISideMenuItem };
