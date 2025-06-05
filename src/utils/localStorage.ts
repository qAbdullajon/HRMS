const addAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};
const removeToken = () => {
  localStorage.removeItem("accessToken");
};
export { addAccessToken, removeToken };
