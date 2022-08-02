import React, { useState } from 'react';
import { Friend, User, StatusMessage} from '../../types';
import { AxiosResponse } from 'axios';
import MessageService from '../../services/MessageService';



const AddMessage: React.FC = () => {
    //
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [textInput, setTextInput] = useState<string>("");

    //async functie met parameter naam
    const addMessage = async (text: string) => {
        try {
            
            setStatusMessages([{ message: 'trying to add message.', type: 'success' }]);

            const id = String(sessionStorage.getItem("loggedinUser"));
            await MessageService.addMessage('{"author": "'+id+'","text": "'+text+'","type": "public"}');
            
            setStatusMessages([{ message: 'Message is posted.', type: 'success' }]);
            setTextInput('');

        } catch (any) {
            setStatusMessages([...statusMessages, {message: "Fout opgetreden", type: "error"} ])
            setTextInput('');
        }
    }

    //wat te doen als je op submit duwt
    const handleSubmit = (event: any) => {
        //overschrijf de default
        event.preventDefault()

        if (textInput.trim() === '') {
            setStatusMessages([{ message: 'Please fill in.', type: 'error' }]);
        }else{
            addMessage(textInput);
        }
    
    }
   
    return   (
               <div className='box box_marge'>
                <h4 className='title_login'>Publish message</h4>
                <form onSubmit={handleSubmit}>
                          <div className='form_message'>
                                <textarea
                                    className="m-sm-2 text_message"
                                    value={textInput}
                                    onChange={(event) => setTextInput(event.target.value)}
                                    maxLength={256}
                                />
                              <input className='publish_button' type="submit" value="Publish" />
                          </div>
                          
                  </form>
                </div> 

     
      );
    };

export default AddMessage;
