import {useState, useEffect, useCallback} from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userLog, setUserLog] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const login = useCallback((jwtToken, id, log) => {
        setToken(jwtToken)
        setUserId(id)
        setUserLog(log)
        console.log ('JWT2 :', token)
        console.log ('id2 :', userId)
        console.log ('Логин2 :', userLog)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken,
            userLogin: log
        }))
    }, [])

    const logout = () => {
        setToken(null)
        setUserId(null)
        setUserLog(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if(data && data.token) {
            login(data.token, data.userId, data.userLogin)
        }
        setIsReady(true)
    }, [login])

    return {login, logout, token, userId, isReady, userLog}
}