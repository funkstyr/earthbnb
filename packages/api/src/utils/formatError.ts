import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ path: string; message: string }> = [];

  console.log("error before crash:", err);

  err.inner.forEach(e => {
    const { path, message } = e;

    errors.push({
      path,
      message
    });
  });
};
