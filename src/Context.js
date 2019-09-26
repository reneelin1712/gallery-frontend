import React,{createContext} from 'react'

export const UserContext = createContext()

export const UserProvider = props =>{
    const [username,setUsername] = React.useState("renee")

    return(
        <UserContext.Provider  value={[username,setUsername]}>
            {props.children}
        </UserContext.Provider>
    )
}