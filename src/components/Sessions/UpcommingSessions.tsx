import { useEffect, useRef } from 'react';
import UpcommingSession from './UpcommingSession';
import { useSessionContext } from '../../store/sessions-context';

import Button from '../UI/Button';
import Modal, { type ModalHandle } from '../UI/Modal';

type UpcommingSessionProps = {
  onClose: () => void;
};

export default function UpcommingSessions({ onClose }: UpcommingSessionProps) {
  const modal = useRef<ModalHandle>(null);
  const sessionsCtx = useSessionContext();

  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);

  function handleCancelSession(sessionId: string) {
    sessionsCtx.cancelSession(sessionId);
  }

  const hasSessions = sessionsCtx.upcommingSessions.length > 0;

  return (
    <Modal ref={modal} onClose={onClose}>
      <h2>Upcomming Sessions</h2>
      {hasSessions && (
        <ul>
          {sessionsCtx.upcommingSessions.map((session) => (
            <li key={session.id}>
              <UpcommingSession
                session={session}
                onCancel={() => handleCancelSession(session.id)}
              />
            </li>
          ))}
        </ul>
      )}
      {!hasSessions && <p>No sessions</p>}
      <p className='actions'>
        <Button onClick={onClose}>Close</Button>
      </p>
    </Modal>
  );
}
