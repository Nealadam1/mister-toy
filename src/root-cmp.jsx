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
import { UserDetails } from "./views/user-details";
import { ReviewApp } from "./views/review-app";
import { AdminApp } from "./views/admin-app";


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
                            <Route element={<UserDetails/>} path="/user/:id"/>
                            <Route element={<ReviewApp/>} path="/review"/>
                            <Route element={<AdminApp/>} path="/admin"/> 
                        </Routes>
                    </main>
                    <UserMsg/>
                    <AppFooter/>
                </section>
            </Router>
        </Provider>
    )

}