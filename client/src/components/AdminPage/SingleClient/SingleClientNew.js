import React,{useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios"
import Render3DPre from "../../Render3d/Render3dPre"

const SingleClientNew = () => {

    const [title, setTitle] = useState("")
    const [article, setArticle] = useState("")
    const [message, setMessage] = useState("")
    const [authorname, setAuthorname] = useState("")
    const [fileName, setFileName] = useState("")
    const idParams = useParams()

    const onChangeFile = (e) => {
        setFileName(e.target.files[0])
    }

    const changeOnClick = e => {

        e.preventDefault()

        const formData = new FormData()

        formData.append("title", title)
        formData.append("article", article)
        formData.append("authorname", authorname)
        formData.append("articleImage", fileName)

        axios
            .put(`http://localhost:5000/admin/update/${idParams.id}`, formData)
            .then((res) => setMessage(res.data))
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios
            .get(`/admin/${idParams.id}`)
            .then((res) =>
                [
                    setTitle(res.data.title),
                    setArticle(res.data.article),
                    setAuthorname(res.data.authorname),
                    setFileName(res.data.articleImage)
                ])
            .catch((err) => {
                console.log(err)
            })
    }, [`${idParams.id}`])

    return (
        <div>
            <h2>Update user</h2>

            <form onSubmit={changeOnClick} encType="multipart/form-data">
                <div className="grid md:grid-cols-4 md:gap-6 mx-4 mt-4">
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text"
                               value={title}
                               name="floating_first_name"
                               id="floating_first_name"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "
                               onChange={e => setTitle(e.target.value)}
                               required=""
                        />
                        <label htmlFor="floating_first_name"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Name project
                        </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text"
                               value={authorname}
                               name="floating_last_name"
                               onChange={e => setAuthorname(e.target.value)}
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               id="floating_last_name"
                               placeholder=" "
                               required=""
                        />
                        <label htmlFor="floating_last_name"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            User
                        </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text"
                               value={article}
                               name="floating_last_name"
                               id="floating_last_name"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "
                               onChange={e => setArticle(e.target.value)}
                               required=""/>
                        <label htmlFor="floating_last_name"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Project description
                        </label>
                    </div>

                    <div className="relative z-0 mb-6 w-full group">
                        <div className="flex justify-center">
                            <div className="mb-3 w-96">
                                <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">
                                    File project</label>
                                <input
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    type="file"
                                    // filename="articleImage"
                                    onChange={onChangeFile}
                                    id="formFile"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit"
                        className="-mt-12 text-white bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                </button>
            </form>

            <div>
                <Render3DPre props={idParams}/>
            </div>
        </div>
    )
}

export default SingleClientNew