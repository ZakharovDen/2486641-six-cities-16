import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser } from '../../store/user/selectors';
import { logoutAction } from '../../store/user/thunks';
import { Offers } from '../../types/types';

type UserNavProps = {
  authStatus: AuthorizationStatus;
  favorites: Offers;
}

function UserNav({authStatus, favorites}: UserNavProps): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  return (
    <nav className="header__nav">
      {(authStatus === AuthorizationStatus.Auth)
        ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">{user?.email}</span>
              <span className="header__favorite-count">{favorites.length}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to={AppRoute.Login}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
        :
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>}
    </nav>
  );
}

export default UserNav;
