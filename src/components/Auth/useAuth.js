import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  loginRequest,
  logoutRequest,
  selectUser,
  selectAuthStatus,
  selectAuthError
} from './authSlice';

export default function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state && location.state.from ? location.state.from.pathname : '/';
  const user = useSelector(selectUser);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const dispatch = useDispatch();

  const login = async (user, pass) => {
    if (status === 'idle') {
      const res = await dispatch(loginRequest({ user, pass }));

      if (res.type === 'auth/loginRequest/fulfilled') {
        navigate(from, { replace: true });
      }
    };
  }

  const logout = async (token) => {
    if (status === 'idle') {
      const res = await dispatch(logoutRequest({ token }));

      if (res.type === 'auth/logoutRequest/fulfilled') {
        navigate('/', { replace: true });
      }
    }
  }

  return {
    login,
    logout,
    user,
    status,
    error
  }
}
