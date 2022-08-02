
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
            // await UserService.logout();
            window.sessionStorage.removeItem("loggedinUser");
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


