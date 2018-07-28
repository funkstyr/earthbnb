export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("settings");

    if (!serializedState) return undefined;

    const store = JSON.parse(serializedState);

    return store;
  } catch (err) {
    console.log("Loading State Error", err);

    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem("settings", serializedState);
  } catch (err) {
    console.log("Persiting State Error", err);
  }
};
