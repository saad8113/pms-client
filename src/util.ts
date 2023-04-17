const validateToken = () => {
  if (localStorage.getItem("token")) {
    return true;
  }

  return false;
};

export { validateToken };
