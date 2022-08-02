import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import MessageService from '../../services/MessageService';
import { Message } from '../../types';
import MessagesOverviewTable from './MessagesOverviewTable';
import ChangeStatus from './ChangeStatusForm';
import useInterval from 'use-interval';


const MessageOverview: React.FC = () => {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [status, setStatus] = useState<string>(String);


    useEffect(() => {
        getMessages();
        getStatus();
    }, []);

    useInterval(() => {
        getMessages();
        getStatus();
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
            </div>
        </section>
    );
};

export default MessageOverview;
