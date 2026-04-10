import {useState,useEffect, createContext, useContext,ReactNode} from "react";
import authService,{AuthResponse} from "@/services/authService";

interface User{
    id:string,
    name:string,
    username:string,
    role:string;
}

interface AuthContextType{
    user: User|null
    loading: boolean
    login:(username:string,password:string)=>Promise<void>
    logout:()=>Promise<void>
    isAuthenticated: boolean
}
const AuthContext = createContext<AuthContextType|undefined>(undefined)

export const AuthProvider = ({ children }:{children:ReactNode})=>{
    const [user,setUser]= useState<User|null> (null)
    const [loading,setloading]= useState(true)

    useEffect(()=>{
        const checkAuth = async () =>{
            if (authService.isAuthenticated()) {
                //fetch user data
                setloading(false)
            }else{
                setloading(false)
            }
        }
        checkAuth();
    },[])

    const login = async(username:string,password:string)=>{
        const response: AuthResponse = await authService.login({username,password})
        setUser(response.user)
    }
    const logout = async()=>{
        await authService.logout()
        setUser(null)
    }

    return(
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: authService.isAuthenticated(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () =>{
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error(`useAuth must be used within AuthProvider`)
    }
    return context
}
