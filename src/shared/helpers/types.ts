import React from 'react';

interface ISelectorListItem<TValue> {
  // сырое значение исходного списка(на основе этого можно сгенерить ключ и рендер эелемент)
  // в самом селекторе непосредственного участия не принимает
  value: TValue;
  // уникальный ключ(id)
  key: string;
  // то как элемент будет выводиться в списке
  renderElement: React.ReactNode | string | null;
  // то как элемент будет выводиться в инпуте
  selectedRenderElement: React.ReactNode | string | null;
  // выбран ли элемент
  active: boolean;
}

interface ISelectorListItemSimple<TValue> {
  // сырое значение исходного списка(на основе этого можно сгенерить ключ и рендер эелемент)
  // в самом селекторе непосредственного участия не принимает
  value: TValue;
  // то как элемент будет выводиться в списке
  renderElement: string;
  // уникальный ключ(id)
  key: string;
  // выбран ли элемент
  active: boolean;
}

interface IImages {
  [key: string]: any;
}

// Для инпута с номером телефона
export type CustomChangeEvent = {
  target: {
    name: string;
    value: string;
  };
};

// позволяет вытаскивать типы свойств по имени
type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

type ISetTimeout = ReturnType<typeof setTimeout>;

interface IKey {
  key: string;
}

export type { IImages, ISelectorListItem, ISelectorListItemSimple, ISetTimeout, IKey, PropType };

export interface TCallbacks<T, K = string> {
  onSuccess?: (data: T) => void;
  onError?: (data: K) => void;
}
