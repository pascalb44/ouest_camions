import React from 'react';
import LoginForm from "../../components/auth/LoginForm";
import { Link } from "react-router-dom";
//import axios from "axios";
const Login = () => {
    return (
        <div>
            <h1 className='h1-login'>S'identifier</h1>
            <LoginForm />
            <p>Nouveau sur Ouestcamions? 
                <Link to="/register/"> Créez un compte</Link>
            </p>

        </div>
    );
};
export default Login;