import jwtDecode from "jwt-decode";

function getToken() {
    return localStorage.getItem('access_token');
}

let getDecodedToken = () => {
    const token = getToken();
    if (token) {
        return jwtDecode(token);
    } else {
        return null;
    }
}

let getExpiryTime = () => {
    const decodedToken = getDecodedToken();
    if (decodedToken && decodedToken.exp * 1000 >= Date.now()) {
        return true;
    } else {
        // Le token a expiré ou est absent, on le supprime
        localStorage.removeItem('access_token');
        return false;
    }
}

let getRoles = () => {
    const decodedToken = getDecodedToken();
    if (getExpiryTime() && decodedToken) {
        try {
            return JSON.parse(decodedToken.roles).toString(); // s'assurer que `roles` est bien un tableau
        } catch (e) {
            return false; // En cas de problème avec le format des rôles
        }
    }
    return false;
}

let getEmail = () => {
    const decodedToken = getDecodedToken();
    if (getExpiryTime() && decodedToken) {
        return decodedToken.email;
    }
    return false;
}

let loggedAndAdmin = () => {
    return getExpiryTime() && getRoles() === 'ROLE_ADMIN';
}

// Assigner l'objet à une variable avant l'export
const authService = {
    getToken,
    getDecodedToken,
    getRoles,
    getEmail,
    loggedAndAdmin,
    getExpiryTime,
};

export default authService;
