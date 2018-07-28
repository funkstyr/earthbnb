interface Error {
  path: string;
  message: string;
}

export const formatErrors = (errors: Error[]) => {
  const map: { [key: string]: string } = {};

  errors.forEach(err => {
    map[err.path] = err.message;
  });

  return map;
};
