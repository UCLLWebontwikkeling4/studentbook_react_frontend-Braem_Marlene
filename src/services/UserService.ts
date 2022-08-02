import axios from '../axios';
import { User } from '../types';


const login = (naam : string) => axios.post<JSON>('/user/login', naam);

const getUser = (username: string) => axios.get<User>('/user/' + username);

const changeStatus = (body: string) => axios.put<JSON>('/user/status', body)

const UserService = {
    getUser,
    login,
    changeStatus,
};

export default UserService;
