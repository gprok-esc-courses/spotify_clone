import "./ErrorHandler.module.css";
const ErrorHandler = (errorMessage: string | undefined) => {
  if (errorMessage === null || errorMessage === undefined) {
    return `no_error`;
  } else {
    return `warningMessage alert alert-danger displayError alert-dismissible`;
  }
};

export default ErrorHandler;
