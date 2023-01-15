import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/actions/user.action";
import { SET_USER } from "../store/reducers/user.reducer";
import { LoginSignup } from "./login-signup";

export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))

    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }


    return (
        <header className="app-header full">
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
            {user && <section className="user-info">
                <p>{user.fullname} <span></span></p>
                <button onClick={onLogout}>Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup setUser={setUser} />
            </section>}

        </header>
    )
}