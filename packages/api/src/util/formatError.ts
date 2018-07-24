import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
  console.log(err);

  const errors: Array<{ path: string; message: string }> = [];

  err.inner.forEach(e => {
    const { path, message } = e;

    errors.push({
      path,
      message
    });
  });
};
