import { Provider } from "react-redux";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { AppFooter } from "./cmps/app-footer";
import { AppHeader } from "./cmps/app-header";
import { About } from "./views/about";
import { Home } from "./views/home-page";
import { ToyIndex } from "./views/toy-index";
import { store } from "./store/store";


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
                        </Routes>
                    </main>
                    <AppFooter/>
                </section>
            </Router>
        </Provider>
    )

}