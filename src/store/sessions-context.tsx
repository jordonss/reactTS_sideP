import { type ReactNode, createContext, useReducer, useContext } from 'react';

export type Session = {
  id: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  image: string;
  duration: number;
};

type SessionState = {
  upcommingSessions: Session[];
};

type SessionContextValue = SessionState & {
  bookSession: (session: Session) => void;
  cancelSession: (sessionId: string) => void;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

export function useSessionContext() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error(
      'useSessionsContext must be used within a SessionsContextProvider'
    );
  }
  return context;
}

type BookSession = {
  type: 'BOOK_SESSION';
  session: Session;
};

type CancelSession = {
  type: 'CANCEL_SESSION';
  sessionId: string;
};

type SessionAction = BookSession | CancelSession;

function sessionReducer(state: SessionState, action: SessionAction) {
  if (action.type === 'BOOK_SESSION') {
    if (
      state.upcommingSessions.some(
        (session) => session.id === action.session.id
      )
    ) {
      return state;
    }
    return {
      upcommingSessions: state.upcommingSessions.concat(action.session),
    };
  }

  if (action.type === 'CANCEL_SESSION') {
    return {
      upcommingSessions: state.upcommingSessions.filter(
        (session) => session.id !== action.sessionId
      ),
    };
  }
  return state;
}

export default function SessionsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sessionState, dispatch] = useReducer(sessionReducer, {
    upcommingSessions: [],
  });

  function bookSession(session: Session) {
    dispatch({ type: 'BOOK_SESSION', session });
  }

  function cancelSession(sessionId: string) {
    dispatch({ type: 'CANCEL_SESSION', sessionId });
  }

  const ctxValue = {
    upcommingSessions: sessionState.upcommingSessions,
    bookSession,
    cancelSession,
  };

  return (
    <SessionContext.Provider value={ctxValue}>
      {children}
    </SessionContext.Provider>
  );
}
