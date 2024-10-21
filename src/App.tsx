import { Suspense, useEffect } from 'react';

import Header from './components/Header';
import SideMenu from './components/SideMenu';

import { useAppDispatch, useAppSelector } from 'shared/hooks/useAppSelector';
import Notify from 'features/notify/desktop';
import Spinner from 'components/Spinner/desktop';
import { AppRoutes } from './AppRoutes';
import './App.scss';
import block from 'bem-cn';
import axios from 'axios';
import { logoutUser } from 'store/auth/authThunks';
import { domain } from 'shared/constants';
import { fetchCompanies } from 'store/users/usersSlice';

const b = block('app-desktop');

const App = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${domain}/api/auth/check`, {
          withCredentials: true,
        });

        if (!response.data.isAuth && isAuthenticated) {
          dispatch(logoutUser());
        }
      } catch (e: unknown) {
        dispatch(logoutUser());
      }
    };
    checkAuth();
    dispatch(fetchCompanies());
  }, []);

  return (
    <>
      <Notify />

      {isAuthenticated ? (
        <>
          <div className={b('header-wrapper')}>
            <Header />
          </div>
          <main className={b('main')}>
            <div className={b('side-menu')}>
              <SideMenu />
            </div>
            <div className={b('content')}>
              <Suspense fallback={<Spinner isLoading />}>
                <AppRoutes isAuth={isAuthenticated} />
              </Suspense>
            </div>
          </main>
        </>
      ) : (
        <AppRoutes isAuth={isAuthenticated} />
      )}
    </>
  );
};

export default App;
