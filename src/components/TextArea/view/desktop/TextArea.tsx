import block from 'bem-cn';

import './TextArea.scss';

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  color?: 'default';
  fontSize?: 16;
}

const b = block('textarea-desktop');

const TextArea = ({ ...restProps }: ITextAreaProps) => {
  return (
    <div className={b()}>
      <textarea {...restProps} className={b('native')} />
    </div>
  );
};

export default TextArea;
