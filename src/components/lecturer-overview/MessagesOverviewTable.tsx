import React from 'react';
import { Message } from '../../types';

type Props = {
    messages: Array<Message>;
};

const MessagesOverviewTable: React.FC<Props> = ({ messages }: Props) => {
    return (
        // <div className="col-8">
        //     <table className="table table-striped">
        //         <thead>
        //             <tr>
        //                 <th scope="col">Author</th>
        //                 <th scope="col">Date</th>
        //                 <th className="text-center" scope="col">
        //                     Text
        //                 </th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {messages &&
        //                 messages.map((message, index) => (
        //                     <tr key={index}>
        //                         <td>{message.author}</td>
        //                         <td>{message.text}</td>
        //                         <td className="text-center">{message.dateSent}</td>
        //                     </tr>
        //                 ))}
        //         </tbody>
        //     </table>
        // </div>
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
};

export default MessagesOverviewTable;
