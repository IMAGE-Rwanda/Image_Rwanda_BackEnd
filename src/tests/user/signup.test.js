import chai from 'chai';
import chaiHttp from 'chai-http';
import  server from '../../index';
import {User} from '../../database/index';
import bcrypt from 'bcrypt';

chai.should();
chai.use(chaiHttp);


const createUser  = {
    email:"testEmailnew@gmail.com",
    username:"test",
    password: "testpassword",
    cpassword: "testpassword"
}  

const createUserWrongPassword  = {
    email:"testEmailwrongpassword@gmail.com",
    username:"test",
    password: "testpassword123",
    cpassword: "testpassword"
}  


const createUserExists  = {
    email:"testEmail@gmail.com",
    username:"test",
    password: "testpassword1",
    cpassword: "testpassword1"
}  

const newUser  = {
    email:"testEmail@gmail.com",
    username:"test",
    password: bcrypt.hashSync("testpassword",7)
}  

before(async () => {
    await User.doc(newUser.email).set(newUser);
});

after(async () => {
    await User.doc(newUser.email).delete();
    await User.doc(createUser.email).delete();
});

const signuptests = () =>{
    describe('Sign up Tests,',()=>{
        it('user should signup',(done)=>{
            chai.request(server)
            .post('/users/signup')
            .send(createUser)
            .end((err,response)=>{
                response.should.have.status(200);
                done();
            })
        })

        it('user should not sign up with wrong password',(done)=>{
            chai.request(server)
            .post('/users/signup')
            .send(createUserWrongPassword)
            .end((err,response)=>{
                response.should.have.status(400);
                done();
            })
        })
        it('user should not sign up with existing email',(done)=>{
            chai.request(server)
            .post('/users/signup')
            .send(createUserExists)
            .end((err,response)=>{
                response.should.have.status(400);
                done();
            })
        })
    })
}

export {
    signuptests
}