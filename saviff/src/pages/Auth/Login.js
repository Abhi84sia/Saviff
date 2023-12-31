import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import axios from "axios"
import{useNavigate, useLocation} from "react-router-dom"
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css"
import { useAuth } from '../../context/auth';



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate= useNavigate()
    const [auth,setAuth] = useAuth()
    const location = useLocation()
    




const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
        {

            email,
            password,
 
        }
        );
        if(res && res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
                ...auth,
                user : res.data.user,
                token: res.data.token,
            })
            localStorage.setItem("auth",JSON.stringify(res.data))
            navigate(location.state||"/")
        }else{
            toast.error(res.data.message)
        }



    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with a non-2xx status code
            console.log(error.response.data);
            console.log(error.response.status);
        } else if (error.request) {
            // The request was made, but no response was received
            console.log(error.request);
        } else {
            // Something else happened while setting up the request
            console.log("Error", error.message);
        }
        toast.error("Network error. Please try again later.");
    }
    
}


    return (
        <Layout title="Login- Saviff">
            <div className='form-container'>
 
                <form onSubmit={handleSubmit}>
                <h4 className="title">Login</h4>

                   

                    <div className="mb-3">
                        <input type="email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder='Enter Your Email'
                        required  
                        />
                    </div>

                    <div className="mb-3">
                        <input type="password" 
                         value={password}
                          onChange={(e)=>setPassword(e.target.value)}
                           className="form-control" 
                           id="exampleInputPassword1"
                            placeholder='Enter Password' 
                            required
                            />
                    </div>

                    <div className='mb-3'>

                    <button type="button"
                     className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
                        Forgot Password
                        </button>

                    </div>
                    <button type="submit"
                     className="btn btn-primary">
                        Login
                        </button>
                </form>

            </div>
        </Layout>
    )
}

export default Login