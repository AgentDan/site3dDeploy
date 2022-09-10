import './App.css'
import React from "react"
import HeaderNew from "./components/LayoutPage/Header/HeaderNew";
import FooterNew from "./components/LayoutPage/Footer/FooterNew";
import {useRoutes} from "./routes"
import {AuthContext} from "./context/AuthContext"
import {useAuth} from "./hooks/auth.hook"

function App() {
    const {login, logout, token, userId, isReady, userLog} = useAuth()
    const isLogin = !!token
    const routes = useRoutes(isLogin)

    return (
        <>
            <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin, userLog}}>
                {routes}
                <HeaderNew/>
                <FooterNew/>
            </AuthContext.Provider>
        </>
    )
}

export default App
