import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import MessageService from '../../services/MessageService';
import { Message, User, Friend} from '../../types';
import MessagesOverviewTable from './MessagesOverviewTable';
import ChangeStatus from './ChangeStatusForm';
import useInterval from 'use-interval';
import FriendService from '../../services/FriendService';
import FriendsOverview from './FriendsOverview';


const MessageOverview: React.FC = () => {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [status, setStatus] = useState<string>(String);
    const [friends, setFriends] = useState<Array<Friend>>([]);


    useEffect(() => {
        getMessages();
        getStatus();
        getFriends();
    }, []);

    useInterval(() => {
        getMessages();
        getStatus();
        getFriends();
    }, 5000);

    const getMessages = async () => {
        var loggedInUser= String(sessionStorage.getItem("loggedinUser"))
        const res: AxiosResponse<Array<Message>> = await MessageService.getAllMessagesFromUser(loggedInUser.toString());
        setMessages(res.data);
    };

    const getStatus = async () => {
        var status = String(sessionStorage.getItem("loggedinUserStatus"))
        setStatus(String(status));
    };

    const getFriends = async () => {
        var loggedInUser= String(sessionStorage.getItem("loggedinUser"))
        const res: AxiosResponse<Array<Friend>> = await FriendService.getFriends(loggedInUser.toString());
        setFriends(res.data);
    };

    return (
        <section className="main_section">
            <div className="message">
                <h1>Messages</h1>
                <MessagesOverviewTable
                    messages={messages}
                />
            </div>
             <div className='right_box'>
                <ChangeStatus 
                    status={status}
                />
                <FriendsOverview
                    friends={friends}
                />
            </div>
        </section>
    );
};

export default MessageOverview;
