import { Provider } from "react-redux";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { AppFooter } from "./cmps/app-footer";
import { AppHeader } from "./cmps/app-header";
import { About } from "./views/about";
import { Home } from "./views/home-page";
import { ToyIndex } from "./views/toy-index";
import { store } from "./store/store";
import { ToyDetails } from "./views/toy-details";
import { ToyEdit } from "./views/toy-edit";
import { UserMsg } from "./cmps/user-msg";

import './assets/style/style.scss';
import { ToyDashboard } from "./views/toy-dashboard";


export function App(){
    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route element={<Home/>} path="/"/>
                            <Route element={<About/>} path="/about"/>
                            <Route element={<ToyIndex/>} path="/toy"/>
                            <Route element={<ToyDetails/>} path="/toy/:toyId"/>
                            <Route element={<ToyEdit/>} path="/toy/edit"/>
                            <Route element={<ToyEdit/>} path="/toy/edit/:toyId"/>
                            <Route element={<ToyDashboard/>} path="/dashboard"/>
                            
                        </Routes>
                    </main>
                    <UserMsg/>
                    <AppFooter/>
                </section>
            </Router>
        </Provider>
    )

}