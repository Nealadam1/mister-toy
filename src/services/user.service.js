import { showSuccessMsg } from "./event-bus.service"
import { httpService } from "./http.service"
// import { store } from "../store/store"


const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'


export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getUsers,
    remove,
    update,
    saveLocalUser,
   

    // updateScore
}

function getUsers(){
    return httpService.get('user')
}
// function onUserUpdate(user) {
//     showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
//     store.dispatch({ type: 'SET_WATCHED_USER', user })
// }

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId){
    return httpService.delete(`user/${userId}`)
}

async function update({_id, score}){
    const user=await httpService.put(`user/${_id}` ,{_id,score})
    if(getLoggedinUser()._id===user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}