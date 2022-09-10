import React , {useState, useEffect} from 'react'
import {SingleclientElement} from "./singleclient.element"
import axios from "axios"
import {useParams} from "react-router-dom"

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
        <SingleclientElement>
            <h1>Single Client</h1>
            <h4>Добавить задачу: </h4>
            <form onSubmit={changeOnClick} encType="multipart/form-data">
                <div className="row">
                    <div className="input-field col s3">
                        <input
                            type="text"
                            id="text"
                            className="validate"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="input-field col s3">
                        <input
                            type="text"
                            id="text"
                            className="validate"
                            value={article}
                            onChange={e => setArticle(e.target.value)}
                        />
                    </div>
                    <div className="input-field col s3">
                        <input
                            type="text"
                            id="text"
                            className="validate"
                            value={authorname}
                            onChange={e => setAuthorname(e.target.value)}
                        />
                    </div>
                    <div className="form-group col s3">
                        <label htmlFor="file">Chose Article image</label>
                        <input
                            type="file"
                            filename="articleImage"
                            className="form-control-file"
                            onChange={onChangeFile}
                        />
                    </div>
                </div>

                <div className="row">
                    <button
                        className="waves-effect waves-light btn blue"
                    >
                        Добавить
                    </button>
                </div>
            </form>
        </SingleclientElement>
    );
};

export default SingleClient