import axios from '../axios';
import { Message } from '../types';

//get all messages from user 
const getAllMessagesFromUser = (username: string) => axios.get<Array<Message>>(`/messages/${username}`);

const addMessage = (body: string) => axios.post<string>('/messages', body)


const MessageService = {
    getAllMessagesFromUser,
    addMessage,
};

export default MessageService;
