import React, {useState, useEffect} from 'react'
import {SingleclientElement} from "../SingleClient/singleclient.element"
import axios from "axios"

const AdminAdd = () => {
    const [title, setTitle] = useState("")
    const [article, setArticle] = useState("")
    const [authorname, setAuthorname] = useState("")
    const [fileName, setFileName] = useState("")
    const [par, setPar] = useState('0')

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
            .post(`http://localhost:5000/admin/add/`, formData)
            .then((res) => {
                    const ttt = (res.data.title);
                }
            )
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
            console.log(par)
        }
        , [setPar]
    )
    const getState = () => {

        // axios
        //     .get(`/admin/${par}`)
        //     .then((res) =>
        //         [
        //             setTitle(res.data.title),
        //             setArticle(res.data.article),
        //             setAuthorname(res.data.authorname),
        //             setFileName(res.data.articleImage)
        //         ])
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }

    return (
        <div>
            <SingleclientElement>
                <h4>Создать проект: </h4>
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
                                        // value={title}
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
                                        // value={article}
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
                                        // value={authorname}
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
                {/*<Render3DPre props={idParams}/>*/}
                {/*<Render3d props={`amongusDraco.gltf`}/>*/}
            </div>
        </div>
    )
};

export default AdminAdd;