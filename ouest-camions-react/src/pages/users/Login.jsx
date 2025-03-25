import React from 'react';
import LoginForm from "../../components/auth/LoginForm";
import { Link } from "react-router-dom";
//import axios from "axios";
const Login = () => {
    return (
        <div>
            <h1 className="h1-login">Vous avez déjà un compte ?</h1>
            <LoginForm />
            <p className="question-login">Nouveau sur ouestcamions? 
                <Link to="/register/" className="register-link"> Créez un compte</Link>
            </p>

        </div>
    );
};
export default Login;