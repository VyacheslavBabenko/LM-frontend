import React from 'react';
import block from 'bem-cn';

import SVG from 'components/SVG';
import './TitleWithIcon.scss';

export type ITitleWithIcon = {
  icon: string;
  title: string;
};

const b = block('title-with-icon');

export const TitleWithIcon: React.FC<ITitleWithIcon> = ({ icon, title }) => {
  console.log('title: ', title);
  return (
    <div className={b()}>
      <SVG svgProps={{ src: icon }} className={b('image')} />
      <span className={b('title')}>{title}</span>
    </div>
  );
};

export default TitleWithIcon;
