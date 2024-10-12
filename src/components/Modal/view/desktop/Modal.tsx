import React, { useCallback } from 'react';
import block from 'bem-cn';
import ReactDOM from 'react-dom';

import { IModalProps } from './types';
import './Modal.scss';

const b = block('modal-desktop');

const Modal = ({ onClose, children, ...restProps }: IModalProps) => {
  const stop = useCallback(e => e.stopPropagation(), []);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const content = (
    <div className={b()} onMouseDown={handleClose}>
      <div {...restProps} className={b('content-container')} onMouseDown={stop} onMouseUp={stop} onClick={stop}>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-root') as HTMLElement);
};

export default Modal;
