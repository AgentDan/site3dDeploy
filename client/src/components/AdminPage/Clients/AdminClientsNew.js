import React, {usedEffect, useState} from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import shortid from "shortid"

const AdminClientsNew = () => {
    const [posts, setPosts] = useState([])
    const [postsDuble, setPostsDuble] = useState([])
    const [articleWhile, setArticleWhile] = useState("")

    const deleteComp = (id, titleName) => {
        axios.delete(`/admin/${id}`, id)
            .then(() => {
                alert(`Проект ${titleName} удален`)
                getTodo()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getTodo = () => {
        axios
            .get("/admin")
            .then((res) => {
                setPosts(res.data)
                setPostsDuble(res.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getTodo()
    }, [articleWhile])

    return (
        <div>
            <span className="font-bold">ПРОЕКТЫ</span>

            <div className="flex">
                <div className="px-4">
                    <span className="h-8 w-8 text-green-500 ">
                    <Link to="/admin/add">
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                    >
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <rect x="4" y="4" width="6" height="6" rx="1"/>
                            <rect x="4" y="14" width="6" height="6" rx="1"/>
                            <rect x="14" y="14" width="6" height="6" rx="1"/>
                            <line x1="14" y1="7" x2="20" y2="7"/>
                            <line x1="17" y1="4" x2="17" y2="10"/>
                    </svg>
                    </Link>
                    </span>
                </div>
                <div>
                    <button className="relative flex justify-center items-center bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group">
                        <p className="px-4 w-64 text-right">
                            {articleWhile ? `${articleWhile}` : `Сортировка по дизайнеру`}
                        </p>
                        <span className="border-l p-2 hover:bg-gray-100">
                            <svg className="w-5 h-5 stroke-2"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </span>
                        <div className=" absolute hidden group-hover:block top-full min-w-full w-max bg-white shadow-md rounded overflow-y-auto ">
                            <ul className="text-right border rounded ">
                                <li key={shortid.generate()}
                                    onClick={() => setArticleWhile("")}
                                    className="px-4 py-1 hover:bg-gray-100 border-b">
                                    Все дизайнеры
                                </li>
                                {posts.map((article) => (
                                    <li key={shortid.generate()}
                                        onClick={() => setArticleWhile(article.title)}
                                        className="px-4 py-1 hover:bg-gray-100 border-b">{article.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </button>

                </div>
            </div>

            {
                postsDuble.map((article, index) => {
                        if (article.title === articleWhile || !articleWhile) {

                            return (
                                <div key={shortid.generate()}
                                     className=" h-1/3 mx-auto items-center w-96  bg-gray-300 rounded-lg shadow my-4 py-2 mx-8 px-2">
                                    <div>
                                        <Link to={`/admin/singleclient/${article._id}`}>
                                            <span className="text-blue-500 font-bold hover:underline">{index + 1}</span>
                                        </Link>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-sm text-gray-500">
                                            Дизайнер :&nbsp;&nbsp;
                                        </div>
                                        <div className="text-sm ">
                                            {article.title}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-sm text-gray-500">
                                            Проект :&nbsp;&nbsp;
                                        </div>
                                        <div className="text-sm">
                                            {article.article}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-sm text-gray-500">
                                            Описание :&nbsp;&nbsp;
                                        </div>
                                        <div className="text-sm">
                                            {article.authorname}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-sm text-gray-500">
                                            Фаил проекта :&nbsp;&nbsp;
                                        </div>
                                        <div className="text-sm">
                                            {article.articleImage}
                                        </div>
                                    </div>
                                    <div className="mx-80 -mt-12 cursor-pointer">
                                        <i onClick={() => deleteComp(article._id, article.title)}>
                                            <svg className="h-10 w-10 text-red-600"
                                                 viewBox="0 0 24 24"
                                                 fill="none"
                                                 stroke="currentColor"
                                            >
                                                <circle cx="12" cy="12" r="10"/>
                                                <line x1="15" y1="9" x2="9" y2="15"/>
                                                <line x1="9" y1="9" x2="15" y2="15"/>
                                            </svg>
                                        </i>
                                    </div>
                                </div>
                            )
                        }
                    }
                )
            }

        </div>
    )
}

export default AdminClientsNew