import bcrypt from 'bcrypt';

export const hashPassword = async(password) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;

    }
    catch(error){
        console.log(error+" in hashPassword".bgRed.white);
        return error;
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try{
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
    catch(error){
        console.log(error+" in comparePassword".bgRed.white);
    }
}
