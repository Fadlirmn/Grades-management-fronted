import axios,{AxiosInstance, AxiosError, InternalAxiosRequestConfig} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://localhost:8080/api`;

class TokenManager{
    private static ACCESS_TOKEN_KEY = 'access_token'
    private static REFRESH_TOKEN_KEY = 'refresh_token'
 
    static getAccessToken(): string|null{
        return localStorage.getItem(this.ACCESS_TOKEN_KEY)
    }
    static getRefreshToken(): string|null{
        return localStorage.getItem(this.REFRESH_TOKEN_KEY)
    }
    static setTokens(accessToken:string,refreshToken:string):void{
        localStorage.setItem(this.ACCESS_TOKEN_KEY,accessToken)
        localStorage.setItem(this.REFRESH_TOKEN_KEY,refreshToken)
    }
    static clearTokens():void{
        localStorage.removeItem(this.ACCESS_TOKEN_KEY)
        localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    }
}

//create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers:{
        'Content-Type':'applications/json',
    }
});

//request interceptors - add auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) =>{
        const token = TokenManager.getAccessToken();
        if (token&&config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => Promise.reject(error)
);

//response interceptors -handle token refresh
let isRefreshing = false;
let failedQueue : Array<{
    resolve: (values?:unknown) => void
    reject: (reason?:unknown) => void
}> =[];

const processQueue = (error:Error|null,token:string| null = null)=>{
    failedQueue.forEach((prom)=>{
        if (error) {
            prom.reject(error)
        }else{
            prom.resolve(token)
        }
    })
    failedQueue = [];
}
apiClient.interceptors.response.use(
    (response)=>response,
    async(error:AxiosError)=>{
        const originalRequest = error.config as InternalAxiosRequestConfig &{
            _retry?:boolean;
        }

        if (error.response?.status == 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve,reject)=>{
                    failedQueue.push({resolve,reject})
                })
                .then((token)=>{
                    if(originalRequest.headers){
                        originalRequest.headers.Authorization = `Bearer ${token}`
                    }
                    return apiClient(originalRequest)
                })
                .catch((err)=> Promise.reject(err))
            }
            originalRequest._retry = true
            isRefreshing =  true

            const refreshToken = TokenManager.getRefreshToken();
            if (!refreshToken) {
                TokenManager.clearTokens()
                window.location.href = `/login`
                return Promise.reject(error)
            }
            try{
                const response = await axios.post(`${API_BASE_URL}/../auth/refresh`,{
                    refreshToken:refreshToken
                })
                const {access_token,refresh_token} = response.data
                TokenManager.setTokens(access_token,refresh_token)

                processQueue(null,access_token)
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${access_token}`
                }
                return apiClient(originalRequest)
            }catch(refreshError){
                processQueue(refreshError as Error, null)
                TokenManager.clearTokens()
                window.location.href ='/login'
                return Promise.reject(refreshError)
            }finally{
                isRefreshing = false
            }
        }
        return Promise.reject(error)
    }
)
export {apiClient,TokenManager}
export default apiClient