import bcrypt from "bcrypt";

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(
    plainPassword,
    hashedPassword
  );
};