import { httpService } from "./http.service"

const SESSION_KEY = 'loggedinUser'
const BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getUserById,
    getLoggedinUser
    // updateScore
}

function getUserById(userId) {
    return httpService.get('user/' + userId)
}

async function login(credentials) {
    try {
        const response = await httpService.post(BASE_URL + 'login', credentials);
        return _setLoggedinUser(response);
    } catch (err) {
        console.log('err:', err);
        throw new Error('Invalid login');
    }
}

async function signup({ username, password, fullname }) {
    try {
        const user = { username, password, fullname }
        const response = httpService.post(BASE_URL + 'signup', user)
        return _setLoggedinUser(response)

    } catch (err) {
        console.log('err:', err);
        throw new Error('Invalid login');
    }
}

async function logout() {
    try {
        httpService.post(BASE_URL + 'logout')
        return sessionStorage.removeItem(SESSION_KEY)

    } catch (err) {

    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY))
}


function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userToSave))
    return userToSave
}
