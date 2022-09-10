import React, {useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

const SignIn = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            await axios.post('/auth/registration', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => console.log(response))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-4/5 w-screen">
            <div className="block p-5 mx-auto mb-24 mt-24 rounded-lg shadow-lg max-w-sm bg-gray-200">
                <div className="text-xl font-bold text-center">
                    Регистрация
                </div>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group mb-6">
                        <label htmlFor="exampleInputEmail1"
                               className="form-label inline-block mb-2 text-gray-700"
                        >
                            Email address
                        </label>
                        <input type="email"
                               name="email"
                               onChange={changeHandler}
                               className="form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="exampleInputPassword1"
                               className="form-label inline-block mb-2 text-gray-700">
                            Password
                        </label>
                        <input type="password"
                               name="password"
                               onChange={changeHandler}
                               className="form-control block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="exampleInputPassword1"
                               placeholder="Password"
                        />
                    </div>
                    <button type="submit"
                            onClick={registerHandler}
                            className="
                                px-6
                                py-2.5
                                bg-blue-400
                                text-white
                                font-medium
                                text-xs
                                leading-tight
                                uppercase
                                rounded
                                shadow-md
                                hover:bg-blue-500 hover:shadow-lg
                                focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0
                                active:bg-blue-600 active:shadow-lg
                                transition
                                duration-150
                                ease-in-out"
                    >
                        Submit
                    </button>
                    <Link to="/login"
                          className="mx-12 text-green-600 hover:text-green-700">
                        Акаунт уже есть?
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignIn
