import bcrypt from "bcryptjs";

export const CryptoService = {
  hashPassword: async ({ password }: { password: string }): Promise<string> => {
    if (!password || password.trim() === "")
      throw new Error("Password string not specified");
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },
  checkPassword: async ({
    hashedPassword,
    plainTextPassword,
  }: {
    hashedPassword: string;
    plainTextPassword: string;
  }): Promise<boolean> => {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  },
};
