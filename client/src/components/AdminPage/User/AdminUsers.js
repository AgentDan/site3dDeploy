import React, {useState, useEffect} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import shortid from "shortid";

const AdminUsers = () => {
    const [posts, setPosts] = useState([])
    const [postsDuble, setPostsDuble] = useState([])
    const [articleWhile, setArticleWhile] = useState("")
    const [list, setList] = useState("")

    const getTodoId = (section) => {
        setArticleWhile(section)
    }

    const deleteComp = (id, titleName) => {
        axios.delete(`http://localhost:5000/auth/users/${id}`, id)
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
            .get("http://localhost:5000/auth/users")
            .then((res) => {
                setPostsDuble(res.data)
            })
            .catch(error => console.log("My error",error))
    }

    useEffect(() => {
        getTodo()
    }, [])

    return (
        <div>
            <div>
                <span className="font-bold">ДИЗАЙНЕРЫ</span>

                <div className="flex">
                    <div className="px-4">
                    <span className="h-8 w-8 text-green-500 ">
                    <Link to="/admin/adduser">
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
                </div>

                {
                    postsDuble.map((article, index) => {
                            return (
                                <div key={shortid.generate()}
                                     className=" h-1/3 mx-auto items-center w-96  bg-gray-300 rounded-lg shadow my-4 py-2 mx-8 px-2">
                                    <div>
                                        {/*<Link to={`/admin/singleuser/${article._id}`}>*/}
                                            <span className="text-blue-500 font-bold hover:underline">{index + 1}</span>
                                        {/*</Link>*/}
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-sm text-gray-500">
                                            Email :&nbsp;&nbsp;
                                        </div>
                                        <div className="text-sm ">
                                            {article.email}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-sm text-gray-500">
                                            Login :&nbsp;&nbsp;
                                        </div>
                                        <div className="text-sm">
                                            {article.login}
                                        </div>
                                    </div>
                                    <div className="mx-80 -mt-12 cursor-pointer">
                                        <i onClick={() => deleteComp(article._id, article.email)}>
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
                    )
                }

            </div>
        </div>
    )
}

export default AdminUsers