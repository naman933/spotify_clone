import { Icon } from '@iconify/react';
import { useCookies } from 'react-cookie';
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {makeUnauthenticatedPOSTRequest} from '../utils/serverHelpers';


const SignupComponent = () => {
    const [email, setEmail] =useState("");
    const [confirmemail, setConfirmEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cookie, setCookie] = useCookies("token");
    const navigate = useNavigate();


    const signUp=async ()=>{
        if (email!==confirmemail){
            alert("Email and confirm email does not match. Please check again");
            return ;
        }
        const data = {email, password,firstName, lastName, userName};
        const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);

        if (response && !response.err){
            const token = response.token;
            const date= new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token , {path : "/" , expires : date});
            alert("Success");
            window.location.reload(false);
            navigate("/home");
        }else{
            alert("Failure");
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center bg-app-black text-white">
            <div className="logo p-7 border-b border-solid border-gray-250 w-full flex justify-left pl-11">
                <Link to="/home"><Icon icon="logos:spotify" width="125" /></Link>
            </div>
            <div className="inputRegion w-1/3 py-6 flex items-center justify-center flex-col">
                <div className="font-bold text-4xl mb-4">Sign up to start listening</div>
                <TextInput label="Email addresss" placeholder="name@domain.com" className="my-6" value={email} setValue={setEmail}/>
                <TextInput label="Confirm Email address" placeholder="name@domain.com" className="mb-6" value={confirmemail} setValue={setConfirmEmail}/>
                <TextInput label="Username" placeholder="Enter your username" className="mb-6" value={userName} setValue={setUsername}/>
                <PasswordInput label="Create Password" placeholder="Password" value={password} setValue={setPassword} />
                <div className="w-full flex justify-between items-center space-x-8">
                    <TextInput label="First Name" placeholder="Enter your first name" className="my-6" value={firstName} setValue={setFirstName}/>
                    <TextInput label="Last Name" placeholder="Enter your last name" className="my-6" value={lastName} setValue={setLastName}/>
                </div>
                <div className="w-full flex items-center justify-end my-12">
                    <button className="w-full font-semibold bg-green-400 p-3 px-10 rounded-full text-black" onClick={(e)=> {e.preventDefault(); signUp();}}>Sign Up</button>
                </div>
                <div className="w-full border border-solid border-gray-300"></div> 
                <div className="font-bold mb-4 my-12 flex  w-full items-center justify-center">
                    <div className="font-bold">Already have an account?</div>
                    <Link className="font-bold mx-2 underline" to="/login">Login in here</Link>
                </div>
                
            </div>
        </div>
    )
};

export default SignupComponent;