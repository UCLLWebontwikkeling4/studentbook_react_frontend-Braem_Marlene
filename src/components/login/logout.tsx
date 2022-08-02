
import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { User, StatusMessage } from '../../types';
import { useNavigate } from "react-router-dom";


//logout functie voor de user met de sessionStorage van de user op null zetten 
const Logout: React.FC = () => {
    const navigate = useNavigate();
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const logout = async () => {
        try {

            //user ofline zetten in database
            const username = window.sessionStorage.getItem("loggedinUser");
            await UserService.changeStatus('{"username": "'+username+'","status": "Offline"}');

            //user uit sessionStorage halen
            window.sessionStorage.removeItem("loggedinUser");
            window.sessionStorage.removeItem("loggedinUserStatus");

            navigate("/");
            window.location.reload();
        } catch (any) {
            setStatusMessages([...statusMessages, { message: 'Something went wrong.', type: 'error' }]);
        }
    }

    return (
        <section className="login login_box">
                <h2 className='title_login'>Logout</h2>
                <button className='login_button' onClick={logout}>Logout</button>
        </section>
    );
}

export default Logout;


