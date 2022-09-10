import React, {useEffect, useState} from 'react'
import axios from "axios"
import Render3d from "./Render3d"

const Render3DPre = (props) => {
    const [fileName, setFileName] = useState()
    const idParam = props.props.id

    useEffect(() => {
        axios
            .get(`/admin/${idParam}`)
            .then((res) =>
                [
                    setFileName(res.data.articleImage)
                ])
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (fileName) {
        return (
            <div>
                <Render3d props={fileName}/>
            </div>
        )
    }
}

export default Render3DPre;