import { useState } from "react";
import spotify_log from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import {makeAuthenticatedPOSTRequest} from '../utils/serverHelpers';
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from 'react-cookie';
import LoggedInContainer from "../containers/LoggedInContainer";


const UploadSong = () =>{
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail]= useState("");
    const [playlistURL, setPlaylistURL] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState();
    const navigate = useNavigate();

    const submitSong=async ()=>{
        const data = {name, thumbnail, track: playlistURL};
        const response = await makeAuthenticatedPOSTRequest("/song/create", data);
        if (response.err){
            alert("Could not create song");
            return;
        }
        alert("Success");
        navigate("/home");
    }

    return (

        <LoggedInContainer>
            <div className="text-2xl font-semibold mb-5 text-white mt-8"> Upload Your Music </div>
                    <div className="w-2/3 flex space-x-3">
                        <div className="w-1/3">
                            <TextInput label="Label" placeholder="Label" labelClassName={"text-white"} value={name} setValue={setName}/>
                        </div>
                        <div className="w-1/3">
                            <TextInput label="Thumbnail" placeholder="Thumbnail" labelClassName={"text-white"} value={thumbnail} setValue={setThumbnail}/>
                        </div>
                    </div>
                    <div className="py-5">
                        {uploadedSongFileName ? (
                            <div className="bg-white rounded-full p-3 w-1/3">
                                {uploadedSongFileName.substring(0,35)}...
                            </div>
                        ) : (
                            <CloudinaryUpload setUrl={setPlaylistURL} setName={setUploadedSongFileName}/>
                        )}
                    </div>
                    <div className="bg-white w-40 flex justify-center items-center p-4 rounded-full cursor-pointer" onClick={submitSong}>
                            Submit Song
                    </div>
        </LoggedInContainer>




        // <div className="w-full h-full flex">
        //     <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10"> {/* this div will be the left panel*/}
        //         <div>
        //             <div className="logoDiv p-6"> {/*this div is for logo*/}
        //                 <img src={spotify_log} alt="spotify_logo" width={125}/>
        //             </div>
        //             <div className="py-5">
        //                 <IconText iconName={"material-symbols:home"} displayText={"Home"}  active/>
        //                 <IconText iconName={"mingcute:search-line"} displayText={"Search"} />
        //                 <IconText iconName={"codicon:library"} displayText={"Library"} />
        //                 <IconText iconName={"solar:bag-music-2-bold"} displayText={"My Music"} />
        //             </div>
        //             <div className="pt-4">
        //                 <IconText iconName={"icon-park-solid:add"} displayText={"Create Playlist"} />
        //                 <IconText iconName={"mdi:heart-box"} displayText={"Liked Songs"} />
        //             </div>
        //         </div>
        //         <div className="px-5 ">
        //             <div className="border border-gray-200 text-white w-2/5 flex rounded-full px-2 py-1 items-center justify-center cursor-pointer hover:border-white">
        //                 <Icon icon="ph:globe" fontSize={20}/>
        //                 <div className="ml-2 text-sm text-semibold">English</div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="h-full w-4/5 bg-app-black overflow-auto">{/* this div will be the right panel*/}
        //         <div className="navbar w-full h-1/10 bg-black bg-opacity-40 flex items-center justify-end">
        //             <div className="w-1/2 flex h-full">
        //                 <div className="w-2/3 flex justify-around items-center">
        //                     <TextWithHover displayText={"Premium"} />
        //                     <TextWithHover displayText={"Support"} />
        //                     <TextWithHover displayText={"Upload Song"}/>
        //                     <div className="h-1/3 border-r border-white"></div>
        //                 </div>
        //                 <div className="w-1/3 flex justify-around h-full items-center">
        //                     <TextWithHover displayText={"Log out"} onClick={()=> cookiedelete()}/>
        //                     <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">Hi!</div>
        //                 </div>
                        
        //             </div>
        //         </div>
        //         <div className="content p-8 pt-0 overflow-auto">
        //             <div className="text-2xl font-semibold mb-5 text-white mt-8"> Upload Your Music </div>
        //             <div className="w-2/3 flex space-x-3">
        //                 <div className="w-1/3">
        //                     <TextInput label="Label" placeholder="Label" labelClassName={"text-white"} value={name} setValue={setName}/>
        //                 </div>
        //                 <div className="w-1/3">
        //                     <TextInput label="Thumbnail" placeholder="Thumbnail" labelClassName={"text-white"} value={thumbnail} setValue={setThumbnail}/>
        //                 </div>
        //             </div>
        //             <div className="py-5">
        //                 {uploadedSongFileName ? (
        //                     <div className="bg-white rounded-full p-3 w-1/3">
        //                         {uploadedSongFileName.substring(0,35)}...
        //                     </div>
        //                 ) : (
        //                     <CloudinaryUpload setUrl={setPlaylistURL} setName={setUploadedSongFileName}/>
        //                 )}
        //             </div>
        //             <div className="bg-white w-40 flex justify-center items-center p-4 rounded-full cursor-pointer" onClick={submitSong}>
        //                     Submit Song
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
};


export default UploadSong;