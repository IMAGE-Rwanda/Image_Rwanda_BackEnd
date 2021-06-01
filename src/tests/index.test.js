import {logintests} from './user/login.test';
import {resetpasswordtests} from './user/password-reset.test';
import {signuptests} from './user/signup.test';

describe('test user login endpoint',logintests);
describe('test user signin endpoint',signuptests)
describe('test user reset and change password endpoints',resetpasswordtests);