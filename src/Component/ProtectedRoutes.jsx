
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {

    const getLoggedin = localStorage.getItem('token')

    return (
        getLoggedin ? <Outlet /> : <Navigate to="/sign-in" />
    )
}

export default ProtectedRoutes