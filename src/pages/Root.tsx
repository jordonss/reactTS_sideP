import { Outlet } from 'react-router-dom';

import MainHeader from '../components/Navigation/MainHeader';
import SessionsContextProvider from '../store/sessions-context';

export default function Root() {
  return (
    <>
      <SessionsContextProvider>
        <MainHeader />
        <Outlet />
      </SessionsContextProvider>
    </>
  );
}
