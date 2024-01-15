import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {makeUnauthenticatedPOSTRequest} from '../utils/serverHelpers';
import { useCookies } from 'react-cookie';



const LoginComponent = () => {
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies("token");
    const navigate = useNavigate();

    const login = async()=>{
        const data = {email, password};
        const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    
        if (response && !response.err){
            const token = response.token;
            const date= new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token , {path : "/" , expires : date});
            window.location.reload(false);
            navigate("/home");
        }else{
            alert("Failure");
        }
    };
    
    return (
        <div className="w-full h-full flex flex-col items-center bg-app-black">
            <div className="logo p-7 border-b border-solid border-gray-250 w-full flex justify-left pl-11">
                <Link to="/home"><Icon icon="logos:spotify" width="125" /></Link>
            </div>
            <div className="inputRegion w-1/4 py-6 flex items-center justify-center flex-col text-white">
                <div className="font-bold mb-4">To continue, login to Spotify.</div>
                <TextInput label="Email address of username" placeholder="Email address or username" className="my-6" value={email} setValue={setEmail}/>
                <PasswordInput label="Password" placeholder="Password" value={password} setValue={setPassword}/>
                <div className="w-full flex items-center justify-end my-12">
                    <button className="w-full font-semibold bg-green-400 p-3 px-10 rounded-full text-black" onClick={(e)=> {e.stopPropagation(); login();}}>Log In</button>
                </div>
                <div className="w-full border border-solid border-gray-300"></div> 
                <div className="font-bold mb-4 my-12 flex w-full justify-center items-center">
                    <div className="font-bold">Don't have an account?</div>
                    <Link className="font-bold mx-2 underline" to="/signup">Sign up for Spotify</Link> {/* link tage doesn't refresh the common tags between two pages hence increases the efficiency */}
                </div>
            </div>
        </div>
    )
};

export default LoginComponent;