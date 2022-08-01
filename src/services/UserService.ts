import axios from '../axios';
import { User } from '../types';


const login = (naam : string) => axios.post<JSON>('/user/login', naam);

const getUser = (username: string) => axios.get<User>('/user/' + username);

const UserService = {
    getUser,
    login,
};

export default UserService;
