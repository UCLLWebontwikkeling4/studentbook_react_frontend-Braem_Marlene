import axios from '../axios';
import { Friend } from '../types';

const getFriends = (username: string) => axios.get<Array<Friend>>('/friends/' + username);

const FriendService = {
   getFriends,
};

export default FriendService;
