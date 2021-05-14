import jwt from 'jsonwebtoken';


export const verifyToken = async(req, res, next) => {
    const token = req.params.token;
    const decodeToken = await jwt.verify(token, process.env.SECRETTE_KEY);
    req.email = decodeToken.email;
    next();
}