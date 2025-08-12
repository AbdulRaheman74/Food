import jwt from 'jsonwebtoken';

const generateToken=(user)=>{
    return jwt.sign({user:user._id},
        process.env.JWT_PRIVATE_KEY,
        {expiresIn: '7d'}


    )
}
export default generateToken;