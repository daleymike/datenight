import { useEffect } from 'react';
import {Navigate} from 'react-router-dom';

const Protected = ({isLoggedIn, children, setProtectedError}) => {

    useEffect(() => {
        if(!isLoggedIn){
            setProtectedError("Please login to view that page")
        }
    },[])

    if(!isLoggedIn) {
        return <Navigate to="/" replace />
    }; 
    return children;
};

export default Protected;