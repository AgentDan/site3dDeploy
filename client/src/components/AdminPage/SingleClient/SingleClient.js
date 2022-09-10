import React, {useState, useEffect, useCallback} from 'react'
import {SingleclientElement} from "./singleclient.element"
import axios from "axios"
import {Link, useParams} from "react-router-dom"
import Render3DPre from "../../Render3d/Render3dPre";

const SingleClient = () => {
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
            <SingleclientElement>
                <h2>Изменить задачу</h2>
                <form onSubmit={changeOnClick} encType="multipart/form-data">
                    <table>
                        <thead>
                        <tr>
                            <th scope="col">Название проекта</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Дизайнер</th>
                            <th scope="col">Фаил проекта</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>
                                <div>
                                    <input
                                        type="text"
                                        id="text1"
                                        // className="validate"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                            </th>
                            <th>
                                <div>
                                    <input
                                        type="text"
                                        id="text2"
                                        // className="validate"
                                        value={article}
                                        onChange={e => setArticle(e.target.value)}
                                    />
                                </div>
                            </th>
                            <th>
                                <div>
                                    <input
                                        type="text"
                                        id="text3"
                                        // className="validate"
                                        value={authorname}
                                        onChange={e => setAuthorname(e.target.value)}
                                    />
                                </div>
                            </th>
                            <th>
                                <div>
                                    <input
                                        type="file"
                                        filename="articleImage"
                                        className="form-control-file"
                                        onChange={onChangeFile}
                                    />
                                </div>
                            </th>
                        </tr>
                        </tbody>
                    </table>

                    <div className="row">
                        <button
                            className="waves-effect waves-light btn blue"
                        >
                            Добавить
                        </button>
                    </div>
                </form>
            </SingleclientElement>
            <div>
                <Render3DPre props={idParams}/>
            </div>
        </div>
    )
}

export default SingleClient