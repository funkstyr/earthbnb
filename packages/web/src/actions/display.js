import { TOGGLE_NAV } from './types';

export const toggleNav = () => dispatch => {
  dispatch({ type: TOGGLE_NAV });
};
