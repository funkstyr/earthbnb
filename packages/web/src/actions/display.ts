import { TOGGLE_NAV } from "./types";

export const toggleNav = () => (dispatch: any) => {
  dispatch({ type: TOGGLE_NAV });
};
