import { FormEvent, useRef, useEffect } from 'react';

import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal, { ModalHandle } from '../UI/Modal';

import { useSessionContext, Session } from '../../store/sessions-context';

type BookSessionProps = {
  session: Session;
  onDone: () => void;
};

export default function BookSessions({ session, onDone }: BookSessionProps) {
  const modal = useRef<ModalHandle>(null);
  const sessionsCtx = useSessionContext();

  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    sessionsCtx.bookSession(session);
    onDone();
  }

  return (
    <Modal ref={modal} onClose={onDone}>
      <h2>Book Session</h2>
      <form onSubmit={handleSubmit}>
        <Input label='Name' id='name' name='name' type='text' />
        <Input label='email' id='email' name='email' type='email' />
        <p className='actions'>
          <Button type='button' textOnly onClick={onDone}>
            Cancel
          </Button>
          <Button>Book Session</Button>
        </p>
      </form>
    </Modal>
  );
}
