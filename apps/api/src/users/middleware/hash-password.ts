import * as bcrypt from 'bcryptjs';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};