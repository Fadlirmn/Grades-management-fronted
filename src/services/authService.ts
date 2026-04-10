import apiClient,{TokenManager} from "./api";

export interface LoginCredentials{
    username:string,
    password:string,
}
export interface RegisterData{
    username:string,
    name:string,
    password:string,
    role:'admin'|'teacher'|'student'|'parent',
}
export interface AuthResponse{
    access_token: string,
    refresh_token: string,
    user:{
        id:string,
        name:string,
        username:string,
        password:string,
        role:string
    }
}

class AuthService{
    async login(credentials: LoginCredentials) : Promise<AuthResponse>{
        try{
            const response = await apiClient.post('/auth/login',credentials)
            const {access_token,refresh_token}=response.data
            TokenManager.setTokens(access_token,refresh_token)
            return response.data
        }catch(error){
            throw this.handleError(error);
        }
    }
    async register(data: RegisterData) : Promise<AuthResponse>{
        try{
            const response = await apiClient.post('/auth/register',data)
            return response.data
        }catch(error){
            throw this.handleError(error);
        }
    }
    async logout() : Promise<void>{
        TokenManager.clearTokens()
        window.location.href='/login'
    }

    isAuthenticated():boolean{
        return !!TokenManager.getAccessToken()
    }

    private handleError(error:any):Error{
        if (error.response) {
            return new Error(error.response.data.messege||'an error Occured')
        }
        return new Error('network error')
    }

   
}

export default new AuthService();