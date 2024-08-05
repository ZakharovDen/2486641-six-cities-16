import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from '../../pages/main-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import LoginScreen from '../../pages/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import NoAuthRoute from '../no-auth-route/no-auth-route';
import { Offers } from '../../types/types';
import Layout from '../layout/layout';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppProps = {
  favoriteOffers: Offers;
}

function App({favoriteOffers}: AppProps): JSX.Element {
  const AuthStatus: AuthorizationStatus = AuthorizationStatus.Auth;
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<Layout />}
        >
          <Route
            index
            element = {<MainScreen />}
          />
          <Route
            path = {AppRoute.Login}
            element = {
              <NoAuthRoute
                authorizationStatus={AuthStatus}
              >
                <LoginScreen />
              </NoAuthRoute>
            }
          />
          <Route
            path = {AppRoute.Favorites}
            element = {
              <PrivateRoute
                authorizationStatus={AuthStatus}
              >
                <FavoritesScreen favoriteOffers={favoriteOffers}/>
              </PrivateRoute>
            }
          />
          <Route
            path = {AppRoute.Offer}
            element = {<OfferScreen />}
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
