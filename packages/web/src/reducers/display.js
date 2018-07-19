import { TOGGLE_NAV } from '../actions/types';

const initialState = {
  navCollapsed: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_NAV:
      return { ...state, navCollapsed: !state.navCollapsed };
    default:
      return state;
  }
};
