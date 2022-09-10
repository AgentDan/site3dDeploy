import React from 'react'
import { Outlet } from "react-router-dom"
import AdminSidebarNew from "./SidebarAdmin/AdminSidebarNew"

const AdminPageNew = () => {
    return (
        <div className="flex">
            <h2>admin</h2>
            <div className="basis-1/12 mt-16">
                <AdminSidebarNew/>
            </div>
            <div className="basis-11/12 mt-16">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPageNew