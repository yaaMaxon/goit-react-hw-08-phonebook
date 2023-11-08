import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { selectAuthenticated } from 'redux/authSelectors'

const PrivateRoute = ({ children, redirectTo = '/login' }) => {
    const authenticated = useSelector(selectAuthenticated);

    return authenticated ? children : <Navigate to={redirectTo} replace />;
}

export default PrivateRoute;