import { TOGGLE_NAV } from "../actions/types";

const initialState = {
  navCollapsed: true
};

export default (state = initialState, { type }: any) => {
  switch (type) {
    case TOGGLE_NAV:
      return { ...state, navCollapsed: !state.navCollapsed };
    default:
      return state;
  }
};
