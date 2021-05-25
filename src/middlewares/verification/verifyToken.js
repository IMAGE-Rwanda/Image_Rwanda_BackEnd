import jwt from 'jsonwebtoken';
import { User } from '../../database';


export const verifyToken = async (req, res, next) => {
    const token = req.params.token;
    const decodeToken = await jwt.verify(token, process.env.SECRETTE_KEY);
    req.email = decodeToken.email;
    next();
}

export const validateToken = async (req, res, next) => {
    try {
        const token = req.params.token;
        const decodeToken = await jwt.verify(token, process.env.SECRETTE_KEY);
        const user = (await User.doc(decodeToken.email).get()).data();
        if (!user) {
            return res.status(404).send({ message: "user not Found" })
        }
        if (token !== user.token) {
            return res.status(404).send({ message: "Invalid Authentication" })
        }
        req.email = user.email;
        next();
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

}
