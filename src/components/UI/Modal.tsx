import {
  useRef,
  useImperativeHandle,
  ReactNode,
  forwardRef,
} from 'react';
import { createPortal } from 'react-dom';

export type ModalHandle = {
  open: () => void;
};

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { children, onClose },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className='modal' onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal-root')!
  );
});


export default Modal