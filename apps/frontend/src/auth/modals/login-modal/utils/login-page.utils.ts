const IS_LOGGED_OUT_KEY = 'isLoggedOut';

export const getIsLoggedOut = () => sessionStorage.getItem(IS_LOGGED_OUT_KEY);

export const setIsLoggedOut = () => sessionStorage.setItem(IS_LOGGED_OUT_KEY, 'true');

export const removeIsLoggedOut = () => sessionStorage.removeItem(IS_LOGGED_OUT_KEY);
