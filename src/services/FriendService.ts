import axios from '../axios';
import { Friend } from '../types';

const getFriends = (username: string) => axios.get<Array<Friend>>('/friends/' + username);

const addFriend = (body: string) => axios.post<JSON>('/friends', body)


const FriendService = {
   getFriends,
   addFriend,
};

export default FriendService;
