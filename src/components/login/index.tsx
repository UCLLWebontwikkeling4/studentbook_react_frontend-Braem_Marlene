import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { User, StatusMessage } from '../../types';


const Login: React.FC = () => {
    //
     const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
     const [nameInput, setNameInput] = useState<string>("");

    //async functie met parameter naam
    const login = async (username: string) => {
        try {
            //res == het resultaat van login => res is dus gelijk aan X of Y  (nog in te vullen)
            //laat loginservice error gooien indien het niet lukt??
            //login returned naam van user
            setStatusMessages([{ message: 'trying to log in with the name.', type: 'success' }]);
            await new Promise(f => setTimeout(f, 5000));
            setStatusMessages([{ message: '{"name": "'+username+'"}', type: 'success' }]);
            await new Promise(f => setTimeout(f, 5000));

            await UserService.login('{"name": "'+username+'"}');//deze lijn zou een error moeten gooien hopelijk indien het niet lukt
            
            setStatusMessages([{ message: 'Logging in.', type: 'success' }]);
            await new Promise(f => setTimeout(f, 5000));

            
            window.sessionStorage.setItem("loggedinUser", username)

            setStatusMessages([{message:"Uit storrage: " +window.sessionStorage.getItem("loggedinUser"), type:"error"}]);
            await new Promise(f => setTimeout(f, 5000));

            //in session storage best de user id zetten ipv naam
            //user ophalen
            const user: AxiosResponse<User> = await UserService.getUser(username);

             setStatusMessages([{ message: "de status: " + user + " ", type: 'success' }]);
             await new Promise(f => setTimeout(f, 5000));

            // if(user.data.status === "Offline"){
            // await UserService.changeStatus('{"id": "'+user.data.id+'","status": "'+"Online"+'"}');

            // }


            //id in sessionStorage zetten
            window.sessionStorage.setItem("loggedinUser", user.data.username.toString())
            // window.sessionStorage.setItem("userStatus", "Online")

            setStatusMessages([{message:"User naam van database: " + user.data.username, type:"error"}]);

            await new Promise(f => setTimeout(f, 5000));

            setStatusMessages([{message: "User is ingelogd", type: 'success'}])
            
            window.location.reload();
            //rederict naar messages??
        } catch (any) {
            //hier moeten we eigenlijk gewoon een fout melding kunnen geven
            setStatusMessages([...statusMessages, {message: "Naam niet gevonden", type: "error"} ])
            setNameInput('');
        }
    }

    //wat te doen als je op submit duwt
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
        <section className="row justify-content-center">
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
        <div className="col-4 mb-3">
        <form onSubmit={handleSubmit}>
                      <label>
                          Name:
                          <input
                              className="m-sm-2"
                              type="text"
                              value={nameInput}
                              onChange={(event) => setNameInput(event.target.value)}
                          />
                      </label>
                      <input type="submit" value="Submit" />
                  </form>
                  </div>
                  </section>
               
     
      );
    };
export default Login;
