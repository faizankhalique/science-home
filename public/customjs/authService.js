const tokenKey = "token1";
function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
function logoutUser() {
  localStorage.removeItem(tokenKey);
}
function getJwt() {
  const jwt = localStorage.getItem(tokenKey);
  return jwt;
}
function getCurrentUser() {
  try {
    const jwt = getJwt();
    const user = jwt_decode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}
