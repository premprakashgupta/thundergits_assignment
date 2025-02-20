import { authMeAsync } from "../lib/slices/auth.slice";


const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'app/init') {
    // When the app is initialized, check for the user's authentication status
    const token = localStorage.getItem('token');
    
    if (token) {
      // If token exists, dispatch the authMeAsync action to check if the user is still valid
      store.dispatch(authMeAsync());
    } else {
      // If no token, make sure the user state is cleared
      store.dispatch({ type: 'auth/logout' });
    }
  }
  
  return next(action);
};

export default authMiddleware;
