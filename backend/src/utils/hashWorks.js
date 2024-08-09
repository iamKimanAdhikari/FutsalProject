import bcrypt from 'bcrypt'

const passwordHasher = async (password) => {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    // console.log(hashedPassword);
    return hashedPassword;
}

export { passwordHasher }