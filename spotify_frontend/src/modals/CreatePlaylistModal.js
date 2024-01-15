import TextInput from "../components/shared/TextInput";
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const CreatePlaylistModal = ({closeModal}) =>{
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    const createPlaylist= async () =>{
        const response = await makeAuthenticatedPOSTRequest("/playlist/create", 
        {name : playlistName, thumbnail : playlistThumbnail, songs: []});

        
        closeModal();

    }

    return (
        <div className="absolute text-white bg-black bg-opacity-70 w-screen h-screen flex justify-center items-center" onClick={closeModal}>
            <div className="bg-app-black w-1/3 rounded-md p-4 text-white" onClick={(e) => {e.stopPropagation();}}>
                <div className="text-white mb-5 font-semibold text-lg">Create Playlist</div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <TextInput label="Playlist Name" placeholder="Name your playlist" labelClassName={"text-white text-sm"} value={playlistName} setValue={setPlaylistName}/>
                    <TextInput label="Thumbnail" placeholder="Thumbnail" labelClassName={"text-white text-sm"} value={playlistThumbnail} setValue={setPlaylistThumbnail}/>
                    <div className="bg-white w-1/3 rounded flex justify-center items-center font-semibold py-2 mt-4 cursor-pointer text-black" onClick={createPlaylist}>
                        Create
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CreatePlaylistModal;