import React, {useEffect, useState} from 'react'
import axios from "axios"

const AdminAddUser = () => {

    const [message, setMessage] = useState("")
    const [form, setForm] = useState({
        email: '',
        password: '',
        login: ''
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
                .then(response => setMessage(response.data.message))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

    }, [{message}])

    return (
        <>
            <div>
                <h2>Add</h2>
                {message && (
                    <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                         role="alert">
                        <div className="flex">
                            <div className="py-1">
                                <svg className="fill-current h-6 w-6 text-teal-500 mr-4"
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold">{message}</p>
                                {/*<p className="text-sm">Make sure you know how these changes affect you.</p>*/}
                            </div>
                        </div>
                    </div>
                )}
                <form onSubmit={e => e.preventDefault()}>
                    <div className="grid md:grid-cols-4 md:gap-6 mx-4 mt-4">
                        <div className="relative z-0 mb-6 w-full group">

                            <input type="email"
                                   name="email"
                                   id="floating_first_name"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" "
                                   onChange={changeHandler}
                            />
                            <label htmlFor="floating_first_name"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email
                            </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text"
                                   name="login"
                                   onChange={changeHandler}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   id="floating_last_name"
                                   placeholder=" "
                            />
                            <label htmlFor="floating_last_name"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Login
                            </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="password"
                                   name="password"
                                   onChange={changeHandler}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   id="floating_last_name"
                                   placeholder=" "
                            />
                            <label htmlFor="floating_last_name"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Password
                            </label>
                        </div>
                    </div>

                    <button type="submit"
                            onClick={registerHandler}
                            className="-mt-12 text-white bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    </button>
                </form>

            </div>
        </>
    )
}

export default AdminAddUser