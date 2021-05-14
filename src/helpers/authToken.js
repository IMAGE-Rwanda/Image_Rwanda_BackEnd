import jwt from 'jsonwebtoken';

export const authicationToken = (data) =>{ 
    return jwt.sign(data, process.env.SECRETTE_KEY, { expiresIn: '1h' });
}