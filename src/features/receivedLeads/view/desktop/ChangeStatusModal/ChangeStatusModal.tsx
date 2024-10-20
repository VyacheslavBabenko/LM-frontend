import React from 'react';

import block from 'bem-cn';

import Button from 'components/Button/desktop';
import Modal from 'components/Modal/desktop';


import './ChangeStatusModal.scss';
import { useAppDispatch, useAppSelector } from 'shared/hooks/useAppSelector';

interface IChangeStatusModal {
  setIsOpenModal: (arg: boolean) => void;
}

const b = block('change-status-modal');
export const ChangeStatusModal: React.FC<IChangeStatusModal> = ({ setIsOpenModal }) => {
  const locale = useAppSelector(state => state.locale.common);
  const dispatch = useAppDispatch();


  return (
    <Modal onClose={() => setIsOpenModal(false)}>
      <div className={b('modal')}>
        <h5 className={b('modal-title')}>
          {locale.areYouSureDeleteUser}
          <span className={b('modal-title_highlighted')}>asf</span>?
        </h5>

        <div className={b('modal-buttons')}>
          <div className={b('modal-button')}>
            <Button
              color="hollow"
              >
              {locale.delete}
            </Button>
          </div>
          <div className={b('modal-button')}>
            <Button color="hollow-blue" onClick={() => setIsOpenModal(false)}>
              {locale.cancel}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeStatusModal;
