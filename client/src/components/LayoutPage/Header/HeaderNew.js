import React, {useContext} from 'react'
import {Link} from "react-router-dom"
import {AuthContext} from "../../../context/AuthContext"

const HeaderNew = () => {
    const {logout, isLogin, userLog} = useContext(AuthContext)
    {
        if (isLogin) {
            return (
                <div>
                    <nav className="fixed top-0 left-0 bg-white w-full shadow">
                        <div className="container m-auto flex justify-between items-center text-gray-700">
                            <a href="/" className="pl-8 py-4 text-xl font-bold">DOORlux</a>
                            <ul className="hidden md:flex justify-center pr-10 text-base font-semibold cursor-pointer">
                                <Link to="/">
                                    <li className="hover:bg-gray-200 py-4 px-6">Каталог</li>
                                </Link>
                                <Link to="/personal">
                                    <li className="hover:bg-gray-200 py-4 px-6">Личный кабинет</li>
                                </Link>
                                {userLog==="admin" &&
                                    <Link to="/admin">
                                        <li className="hover:bg-gray-200 py-4 px-6">Админка</li>
                                    </Link>
                                }
                                <Link to="/">
                                    <li className="hover:bg-gray-200 py-4 px-6" onClick={logout}>Выйти</li>
                                </Link>
                                    <span className="text-blue-400 py-4 px-6 cursor-default">Вы вошли как: {userLog}</span>
                            </ul>
                        </div>
                    </nav>
                </div>
            )
        }

        return (
            <div>
                <nav className="fixed top-0 left-0 bg-white w-full shadow">
                    <div className="container m-auto flex justify-between items-center text-gray-700">
                        <a href="/" className="pl-8 py-4 text-xl font-bold">DOORlux</a>
                        <ul className="hidden md:flex justify-center pr-10 text-base font-semibold cursor-pointer">
                            <Link to="/">
                                <li className="hover:bg-gray-200 py-4 px-6">Каталог</li>
                            </Link>
                            <Link to="/login">
                                <li className="hover:bg-gray-200 py-4 px-6">Войти</li>
                            </Link>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default HeaderNew