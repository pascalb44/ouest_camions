import jwtDecode from "jwt-decode";

function getToken() {
    return localStorage.getItem('access_token');
}

let getDecodedToken = () => {
    const token = getToken();
    return token ? jwtDecode(token) : null;
}

let getExpiryTime = () => {
    const decodedToken = getDecodedToken();
    if (decodedToken && decodedToken.exp) {
        if (decodedToken.exp * 1000 >= Date.now()) {
            return true;
        } else {
            localStorage.removeItem('access_token');
            return false;
        }
    }
    return false; 
}

let getRoles = () => {
    const decodedToken = getDecodedToken();
    if (getExpiryTime() && decodedToken) {
        return decodedToken?.roles?.toString() || false;
    }
    return false;
}

let getEmail = () => {
    const decodedToken = getDecodedToken();
    if (getExpiryTime() && decodedToken) {
        return decodedToken?.email || false;
    }
    return false;
}

let loggedAndAdmin = () => {
    return getExpiryTime() && getRoles() === 'ROLE_ADMIN';
}

const authService = {
    getToken,
    getDecodedToken,
    getRoles,
    getEmail,
    loggedAndAdmin,
    getExpiryTime,
};

export default authService;
