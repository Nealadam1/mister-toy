import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { login, logout, signup } from "../store/actions/user.action";
import { SET_USER } from "../store/reducers/user.reducer";
import { LoginSignup } from "./login-signup";

export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch(err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch(err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch(err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header full">
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/review">Review</NavLink>
                <NavLink to="/admin">Admin</NavLink>
                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }
            </nav>
        </header>
    )
}