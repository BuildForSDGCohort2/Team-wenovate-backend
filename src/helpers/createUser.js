const createUser = (item) => {
  const { email, username } = item;
  return { email, username };
};
module.exports = createUser;
