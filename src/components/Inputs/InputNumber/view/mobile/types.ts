import { IInputProps } from 'components/Inputs/Input/view/desktop/types';

interface IInputNumberProps extends IInputProps {
  onChangeNumber: (value: number) => void;
  needFilled?: boolean;
}

export type { IInputNumberProps };
