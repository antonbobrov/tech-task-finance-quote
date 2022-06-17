import { AuthUser } from '../store/auth/types';

export default function authHeaders() {
  const lsUser = localStorage.getItem('user');
  let user: AuthUser | undefined;
  try {
    const data = JSON.parse(lsUser || '') as AuthUser;
    user = data;
  } catch (e) {
    //
  }

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return undefined;
}
