import chai from 'chai';
import chaiHttp from 'chai-http';
import  server from '../../index';
import {User} from '../../database/index';
import bcrypt from 'bcrypt';

chai.should();
chai.use(chaiHttp);


const newUser  = {
    email:"testEmail@gmail.com",
    username:"test",
    password: bcrypt.hashSync("testpassword",7)
}  
const newfakeUser  = {
    email:"testfkEmail@gmail.com",
    username:"test",
    password: bcrypt.hashSync("testpassword",7)
}  
before(async () => {
    await User.doc(newUser.email).set(newUser);
    await User.doc(newfakeUser.email).set(newfakeUser);
});

after(async () => {
    await User.doc(newUser.email).delete();
    await User.doc(newfakeUser.email).delete();
});

let authToken= '';

const resetpasswordtests = () =>{
    describe('Reset and Change password tests ,',()=>{
        it('user should request a reset password link',(done)=>{
            chai.request(server)
            .post('/users/forgot-password')
            .send({userEmail:newUser.email})
            .end((err,response)=>{
                authToken =response.body.data.authToken;
                response.should.have.status(200);
                done();
            })
        })

        it('user should chnnge his/her password after geting the link',(done)=>{
            chai.request(server)
            .put(`/users/reset-password/${authToken}`)
            .send({password:"resetpassword",cpassword:"resetpassword"})
            .end((err,response)=>{
                response.should.have.status(200);
                done();
            })
        })
        it('user should not change password with passwords which not match',(done)=>{
            chai.request(server)
            .put(`/users/reset-password/${authToken}`)
            .send({password:"resetpassword",cpassword:"resetpassword456"})
            .end((err,response)=>{
                response.should.have.status(400);
                done();
            })
        })
    })
}

export {
    resetpasswordtests
}