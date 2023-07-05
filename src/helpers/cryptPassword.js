import bcrypt from "bcrypt";

const createHash = async (password) => {
  const salts = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salts);
};

const isValidPassword = (user, data) => bcrypt.compare(data, user.password);

export { createHash, isValidPassword };

