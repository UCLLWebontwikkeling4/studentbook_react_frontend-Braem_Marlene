import React from 'react';
import { Message } from '../../types';

type Props = {
    messages: Array<Message>;
};

const MessagesOverviewTable: React.FC<Props> = ({ messages }: Props) => {
    // als er geen messages zijn, dan moet er een message zijn
    if (messages.length === 0) {
        return(
            <div className="col-12">
                <p>Your friends have been quiet lately…</p>
            </div>
        )}
     else {
        return (

            <div className='messages_box'>
                {messages &&
                            messages.map((message, index) => (
                                <div className='message_box' key={index}>
                                    <h4>{message.author}</h4>
                                    <span>{message.text}</span>
                                    <div className='date_box'>
                                        <span>{message.dateSent}</span>
                                    </div>
                                </div>
                            ))}
            </div>
        );
     }



    
};

export default MessagesOverviewTable;
