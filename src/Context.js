import React,{createContext} from 'react'

export const UserContext = createContext()

export const UserProvider = props =>{
    const [userInfo,setUserInfo] = React.useState({
        userName: "",
        userEmail:"",
        like: []
    })
   

    return(
        <UserContext.Provider  value={[userInfo,setUserInfo]}>
            {props.children}
        </UserContext.Provider>
    )
}