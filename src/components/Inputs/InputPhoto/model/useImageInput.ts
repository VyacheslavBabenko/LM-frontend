import React, { useCallback } from 'react';

import { IImageData } from './types';

const readFileAsBase64 = (file: Blob): Promise<string | ArrayBuffer | null> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise(resolve => {
    reader.onloadend = () => resolve(reader.result);
  });
};

const readImg = async (files: File | FileList | null /* Blob[] */): Promise<IImageData> => {
  if (files === null)
    return {
      ext: '',
      image: null,
      error: 'hasNoFiles',
    };

  const img = (files as FileList)?.length ? (files as FileList)[0] : files as File;

  if (img && img.size > 7000000) return { ext: '', image: null, error: 'fileSizeExceed' };

  const result = await readFileAsBase64(img);

  if (typeof result === 'string') {
    const arr = result.split(',');
    const extension = arr[0].match(/(jpeg|png|jpg|gif|webp)/i);

    if (!extension) return { ext: '', image: null, error: 'fileReadError' };
    const ext = extension[0];
    const image = result; /* arr[1] */

    return {
      ext,
      image,
      error: null,
    };
  }

  return { ext: '', image: null, error: 'someError' };
};

const useImageInput = () => useCallback(async (files: FileList | File | null) => {
    const imageData = await readImg(files);
    return imageData;
  }, []);

export default useImageInput;
