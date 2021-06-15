import { Subscribes } from "../database";

class userController {

    static async subscribe(req,res){
        const {
            username,
            email
        }= req.body;
        try {
          const users = await Subscribes.where('email','==',email).get();
          if(!users.empty){
              return res.status(201).json({
                status: 201,
                message: "you are already subscribed",
              });
          }

          await Subscribes.doc().set({username,email}).then(()=>{
                res.status(200).json({
                  message: "Subscrition went well",
                  status: 200,
                });
          })
            
        } catch (error) {
            res.status(500).json({
                message: "server error",
                status: 500
            })
        }
     }
  
}
export default userController;
