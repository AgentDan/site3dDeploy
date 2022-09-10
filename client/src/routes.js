import React from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import SignIn from "./components/AuthPage/SignIn"
import HomePage from "./components/HomePage/HomePage"
import PersonalPage from "./components/PersonalPage/PersonalPage"
import AdminPageNew from "./components/AdminPage/AdminPageNew"
import AdminClientsNew from "./components/AdminPage/Clients/AdminClientsNew"
import AdminUsers from "./components/AdminPage/User/AdminUsers"
import AdminAddUser from "./components/AdminPage/User/AdminAddUser"
import AdminAddNew from "./components/AdminPage/Add/AdminAddNew"
import SingleClientNew from "./components/AdminPage/SingleClient/SingleClientNew"
import SignUp from "./components/AuthPage/SignUp";

export const useRoutes = (isLogin, userLog) => {
    if (isLogin) {
        return (
            <>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/personal" element={<PersonalPage/>}/>
                    <Route path="/registration" element={<SignIn/>}/>
                        <Route path="/admin" element={<AdminPageNew/>}>
                            <Route path="clients" element={<AdminClientsNew/>}/>
                            <Route path="users" element={<AdminUsers/>}/>
                            <Route path="adduser" element={<AdminAddUser/>}/>
                            <Route path="add" element={<AdminAddNew/>}/>
                            <Route path="singleclient/:id" element={<SingleClientNew/>}/>
                        </Route>
                    <Route path="/login" element={<Navigate replace to="/"/>}/>
                </Routes>
            </>
        )

    }
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<SignUp/>}/>
                <Route path="*" element={<HomePage/>}/>
            </Routes>
        </>
    )
}
