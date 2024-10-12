import { InputHTMLAttributes } from 'react';

import { IImageData } from '../../model/types';

interface IInputPhotoProps extends InputHTMLAttributes<HTMLInputElement> {
  currentImageData: IImageData;
  onImageChange: (imageData: IImageData) => void;
  url?: string;
}

export type { IInputPhotoProps };
