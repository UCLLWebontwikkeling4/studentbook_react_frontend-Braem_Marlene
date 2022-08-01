import axios from '../axios';
import { Message } from '../types';

//get all messages from user 
const getAllMessagesFromUser = (username: string) => axios.get<Array<Message>>(`/messages/${username}`);

const MessageService = {
    getAllMessagesFromUser,
};

export default MessageService;
