import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { User, StatusMessage } from '../../types';
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
    //
    const navigate = useNavigate();
     const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
     const [nameInput, setNameInput] = useState<string>("");

    //async functie met parameter naam
    const login = async (username: string) => {
        try {
            
            setStatusMessages([{ message: 'Try to log in with username.', type: 'success' }]);
           
            
            await UserService.login('{"name": "'+username+'"}');
            
            setStatusMessages([{ message: 'Logging in.', type: 'success' }]);
            
            window.sessionStorage.setItem("loggedinUser", username)

            //user ophalen
            const user: AxiosResponse<User> = await UserService.getUser(username);

            //id in sessionStorage zetten
            window.sessionStorage.setItem("loggedinUser", user.data.username.toString())   
            
            //als er geen userstatus is in de sessionStorge wordt deze online gezet
            if (window.sessionStorage.getItem("loggedinUserStatus") === null) {
                await UserService.changeStatus('{"username": "'+username+'","status": "Online"}');//deze lijn zou een error moeten gooien hopelijk indien het niet lukt
                window.sessionStorage.setItem("loggedinUserStatus", "Online")
            }
           
            setStatusMessages([{message: "User is loggedin", type: 'success'}])
            
            window.location.reload();
            navigate("/");
            

        } catch (any) {
            setStatusMessages([...statusMessages, {message: "Username not found", type: "error"} ])
            setNameInput('');
        }
    }

    //Als submit wordt geduwt
    const handleSubmit = (event: any) => {
        //overschrijf de default
        event.preventDefault()

        if (nameInput.trim() === '') {
            setStatusMessages([{ message: 'Please fill in name.', type: 'error' }]);
        }else{
            login(nameInput);
        }
    
    }
   
    
    return   (
        <section className="login row justify-content-center">
            <h2 className='title_login'>Login</h2>
            {statusMessages && (
                <ul className="list-unstyled col-4 mb-3">
                    {statusMessages.map(({ message, type }, index) => (
                        <li
                            key={index}
                            
                        >
                            {message}
                        </li>
                    ))}
                </ul>
            )}
        <div className="col-4 mb-3 login_box">
        <form onSubmit={handleSubmit}>
                      <label>
                          Name:
                          <input
                              className="m-sm-2"
                              type="text"
                              maxLength={30}
                              value={nameInput}
                              onChange={(event) => setNameInput(event.target.value)}
                          />
                      </label>
                      <input className='login_button' type="submit" value="Submit" />
                  </form>
                  </div>
                  </section>
               
     
      );
    };
export default Login;
