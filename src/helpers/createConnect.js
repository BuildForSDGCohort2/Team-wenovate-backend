const createConnect = (data) => {
  const { title, description, connect_type } = data;
  return { title, description, connect_type };
};
module.exports = createConnect;
