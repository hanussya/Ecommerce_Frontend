import React, { useContext, useState } from 'react'
const AuthContext = React.createContext()
const AuthProvider = ({ children }) => {
    const [authenticatedUser, setAuthenticatedUser] =
        useState({})
    return (
        <AuthContext.Provider value={{
            authenticatedUser,
            setAuthenticatedUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
}
export default AuthProvider