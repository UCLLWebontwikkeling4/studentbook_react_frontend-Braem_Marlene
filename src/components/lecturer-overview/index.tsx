import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import MessageService from '../../services/MessageService';
import { Message } from '../../types';
import MessageOverviewTable from './MessagesOverviewTable';

const MessageOverview: React.FC = () => {
    const [messages, setMessages] = useState<Array<Message>>([]);

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        const res: AxiosResponse<Array<Message>> = await MessageService.getAllMessagesFromUser('Marina');
        setMessages(res.data);
    };

    return (
        <section className="message row justify-content-center">
            <h1>Messages</h1>
            <MessageOverviewTable
                messages={messages}
            />
        </section>
    );
};

export default MessageOverview;
