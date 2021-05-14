import { User, firebaseRef } from '../database';
import brip from 'bcrypt';
import {authicationToken} from '../helpers/authToken';
import {
  sendPasswordResetLink,
} from '../utils/sendPasswordLInk';

export default new class userController {
    async saveNewUser(req, res){
       try {
        if(req.body['password']!==req.body['cpassword']){
            return res.status(400).send({message:"Password dont match !!"})
        }
        const user = {
            username: req.body['username'],
            email: req.body['email'],
            password: await brip.hash(req.body['password'],7),
        }

        await User.doc(user.email).set(user);
        return res.send({message:"Data saved Sucess"});
       } catch (error) {
           return res.status(500).send({error:error.message})
       }
      }
  async saveNewUser(req, res) {
    try {
      const userEmail = req.body['email'];
      const userExist = (await User.doc(userEmail).get()).data();
      if (userExist) {
        return res.status(400).send({ message: "user already exists" })
      }
      if (req.body['password'] !== req.body['cpassword']) {
        return res.status(400).send({ message: "Password dont match !!" })
      }
      const user = {
        username: req.body['username'],
        email: req.body['email'],
        password: await brip.hash(req.body['password'], 7),
      }

      await User.doc(user.email).set(user);
      return res.send({ message: "Data saved Sucess" });
    } catch (error) {
      return res.status(500).send({ error: error.message })
    }
  }

  async loginUser(req, res) {
    try {
      const userEmail = req.body['email'];
      const userPassword = req.body['password'];
      const user = (await User.doc(userEmail).get()).data();
      if (!user) {
        return res.status(404).send({ message: "user not Found" })
      }
      const match = await brip.compare(userPassword, user.password)
      if (match) {
        const authToken = authicationToken({ username: user.username, email: user.email })
        return res.send({ message: "Loggedin Sucessfully", userdata: { username: user.username, email: user.email, authToken: authToken } })
      }
      return res.status(400).send({ message: "Password not correct" })

    } catch (error) {
      return res.status(500).send({ error: error.message })
    }
  }

  async resetPassword(req, res) {
    try {
      const { userEmail } = req.body;
      console.log(userEmail)
      const user = (await User.doc(userEmail).get()).data();
      if (!user) {
        return res.status(404).send({ message: "user not Found" })
      }
      const authToken = authicationToken({ username: user.username, email: user.email });
      const sentLink = await sendPasswordResetLink({
        authToken,
        email: user.email,
        name: user.username,
      });
      return res.send({message:sentLink.message, data:sentLink.data}); 
    } catch (error) {
      return res.status(500).send({error:error.message})
    }
  }

  async changePassword(req, res) {
    try {
      const email = req.email;
      if (req.body['password'] !== req.body['cpassword']) {
        return res.status(400).send({ message: "Password dont match !!" })
      }
      
      const hashedPassword = await brip.hash(req.body['password'], 7);
      User.doc(email).update({
        "password": hashedPassword
      })
      return res.send('password changed! you can now login with new password');
    } catch (error) {
      return res.send({ error: error.message })
    }
  }

}