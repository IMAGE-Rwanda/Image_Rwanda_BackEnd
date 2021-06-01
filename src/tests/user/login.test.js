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



const logintests = () =>{
    describe('User Login tests ,',()=>{
        it('user should login in',(done)=>{
            chai.request(server)
            .post('/users/login')
            .send({email:newUser.email,password:"testpassword"})
            .end((err,response)=>{
                response.should.have.status(200);
                done();
            })
        })

        it('user should not login in with unregistered email',(done)=>{
            chai.request(server)
            .post('/users/login')
            .send({email:"invalidEmail@gmail.com",password:"testpassword"})
            .end((err,response)=>{
                response.should.have.status(404);
                done();
            })
        })
        it('user should not login in with invalid password',(done)=>{
            chai.request(server)
            .post('/users/login')
            .send({email:newUser.email,password:"wrongpassword"})
            .end((err,response)=>{
                response.should.have.status(400);
                done();
            })
        })
    })
}

export {
    logintests
}