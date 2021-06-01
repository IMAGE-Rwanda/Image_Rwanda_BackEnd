import {userSchema} from '../../../validators/validateUser';

export const userValidation = async(req,res,next)=>{
    const user = {...req.body};
    const {error, value} = userSchema.validate(user,{ abortEarly: false });
    if(error){
        return res.status(400).send({error:error.message})
    }
    next();
}