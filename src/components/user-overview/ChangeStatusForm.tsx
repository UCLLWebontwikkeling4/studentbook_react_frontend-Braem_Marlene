import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { User, StatusMessage } from '../../types';
import { useNavigate } from "react-router-dom";

type Props = {
    status: string;
};

const ChangeStatus: React.FC<Props> = ({ status }: Props) => {
    //
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [statusInput, setStatusInput] = useState<string>("");

    //async functie met parameter naam
    const changeStatus = async (status: string) => {
        try {
            
            // setStatusMessages([{ message: 'trying to change status.', type: 'success' }]);
            // await new Promise(f => setTimeout(f, 5000));

            const username = String(sessionStorage.getItem("loggedinUser"));

            // setStatusMessages([{ message: '{"username": "'+username+'","status": "'+status+'"}', type: 'success' }]);
            // await new Promise(f => setTimeout(f, 5000));

            await UserService.changeStatus('{"username": "'+username+'","status": "'+status+'"}');//deze lijn zou een error moeten gooien hopelijk indien het niet lukt
            
            // setStatusMessages([{ message: 'Change in database', type: 'success' }]);
            // await new Promise(f => setTimeout(f, 5000));

            sessionStorage.setItem("loggedinUserStatus", statusInput);

            // setStatusMessages([{ message: 'Changed status.', type: 'success' }]);
            
        } catch (any) {
            setStatusMessages([...statusMessages, {message: "Fout opgetreden", type: "error"} ])
            setStatusInput('');
        }
    }

    //wat te doen als je op submit duwt
    const handleSubmit = (event: any) => {
        //overschrijf de default
        event.preventDefault()

        if (statusInput.trim() === '') {
            setStatusMessages([{ message: 'Please fill in.', type: 'error' }]);
        }else{
            changeStatus(statusInput);
        }
    
    }
   
    
    return   (

        <section className="box">
         <h4 className='title_login'> My status: {status}</h4>
         {/* {statusMessages && (
                <ul className="list-unstyled col-4 mb-3">
                    {statusMessages.map(({ message, type }, index) => (
                        <li
                            key={index}
                            
                        >
                            {message}
                        </li>
                    ))}
                </ul>
            )} */}
        <div className="status_form">
            <form onSubmit={handleSubmit}>
                      <label>
                          <input
                              className="m-sm-2"
                              type="text"
                              value={statusInput}
                              onChange={(event) => setStatusInput(event.target.value)}
                          />
                      </label>
                      <input type="submit" value="Change" />
            </form>
        </div>    
        </section>
        
      );
    };


export default ChangeStatus;
