import spotify_log from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Icon } from "@iconify/react";
import { useContext, useState, useLayoutEffect, useRef} from "react";
import {Howl, Howler} from "howler";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const LoggedInContainer = ({children, curActiveScreen}) =>{
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    
    const navigate = useNavigate();

    const cookiedelete= () =>{
        removeCookie("token");

        window.location.reload(false);
        navigate("/home");
    };


    const {currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused} = useContext(songContext);

    const firstUpdate = useRef(true);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;

        const payload = {playlistId, songId};
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/add/song",
            payload
        );
        if(response._id){
            setAddToPlaylistModalOpen(false)
        }
    };

    useLayoutEffect(()=>{
        // the following if statement will prevent the useEffect from running during the first render
        if (firstUpdate.current){
            firstUpdate.current=false;
            return;
        }

        if (!currentSong){
            return;
        }
        changeSong(currentSong.track);
    }, [currentSong && currentSong.track]);

    const playSound = () =>{
        if (!soundPlayed){
            return;
        }
        soundPlayed.play();
    }

    const changeSong = (songSrc) =>{ {/* function used to play sound , howler is the package which is used*/}
        if (soundPlayed){
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true
          });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound= () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () =>{
        if (isPaused){
            playSound(currentSong.track);
            setIsPaused(false);
        }
        else {
            pauseSound();
            setIsPaused(true);
        }
    };

    return (
        <div className="w-full h-full bg-app-black">
            {createPlaylistModalOpen && <CreatePlaylistModal closeModal={()=> {setCreatePlaylistModalOpen(false);}}/>}
            {addToPlaylistModalOpen && (
                <AddToPlaylistModal
                    closeModal={() => {
                        setAddToPlaylistModalOpen(false);
                    }}
                    addSongToPlaylist={addSongToPlaylist}
                />
            )}
            <div className={`${currentSong ? "h-9/10":"h-full"} w-full flex`}>
                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10"> {/* this div will be the left panel*/}
                    <div>
                        <div className="logoDiv p-6"> {/*this div is for logo*/}
                            <img src={spotify_log} alt="spotify_logo" width={125}/>
                        </div>
                        <div className="py-5">
                            <IconText iconName={"material-symbols:home"} displayText={"Home"}  active={curActiveScreen==="home"} targetLink="/home"/>
                            <IconText iconName={"mingcute:search-line"} displayText={"Search"} active={curActiveScreen==="search"} targetLink="/search" />
                            <IconText iconName={"codicon:library"} displayText={"Library"} active={curActiveScreen==="library"} targetLink="/library"/>
                            <IconText iconName={"solar:bag-music-2-bold"} displayText={"My Music"} active={curActiveScreen==="myMusic"} targetLink="/myMusic"/>
                        </div>
                        <div className="pt-4">
                            <IconText iconName={"icon-park-solid:add"} displayText={"Create Playlist"} onClick={()=>{ setCreatePlaylistModalOpen(true);}} />
                            <IconText iconName={"mdi:heart-box"} displayText={"Liked Songs"} />
                        </div>
                    </div>
                    <div className="px-5 ">
                        <div className="border border-gray-200 text-white w-2/5 flex rounded-full px-2 py-1 items-center justify-center cursor-pointer hover:border-white">
                            <Icon icon="ph:globe" fontSize={20}/>
                            <div className="ml-2 text-sm text-semibold">English</div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-4/5 bg-app-black overflow-auto">{/* this div will be the right panel*/}
                    <div className="navbar w-full h-1/10 bg-black bg-opacity-40 flex items-center justify-end">
                        <div className="w-1/2 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Upload Song"} onClick={()=> navigate("/uploadSong")}/>
                                <div className="h-1/3 border-r border-white"></div>
                            </div>
                            <div className="w-1/3 flex justify-around h-full items-center">
                                <TextWithHover displayText={"Log out"} onClick={()=> cookiedelete()} />
                                <div className="bg-white h-1/2 py-2 px-6 flex items-center justify-center rounded-full font-semibold text-sm cursor-pointer">Hi!</div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-0">
                        {children}
                    </div>
                </div>
            </div>
            {
                currentSong && (
                <div className="w-full h-1/10 bg-black bg-opacity-40 text-white flex items-center px-4"> {/* this div is the current song player with all the controls */}
                    <div className="w-1/4 flex items-center" >
                        <img src={currentSong.thumbnail}
                            alt="currentSongThumbnail"
                            className="h-14 w-14 rounded"
                        />
                        <div className="pl-4">
                            <div className="text-sm cursor-pointer hover:underline"> {currentSong.name} </div>
                            <div className="text-xs text-gray-500 cursor-pointer hover:underline"> {currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex justify-center flex-col items-center ">
                        <div className="flex w-1/4 justify-between items-center"> {/*controls for the playing song go in this div */}
                            <Icon icon="ph:shuffle" fontSize={20}  className="cursor-pointer text-gray-500 hover:text-white"/>
                            <Icon icon="ic:outline-skip-previous" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>
                            <Icon icon={isPaused ? "ic:baseline-play-circle" : "ic:baseline-pause-circle"} fontSize={50} className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause}
                            />
                            <Icon icon="material-symbols:skip-next-outline" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>
                            <Icon icon="ic:twotone-repeat" fontSize={20} className="cursor-pointer text-gray-500 hover:text-white"/>
                        </div>
                        {/* <div> Progress Bar Here </div> */}
        
                    </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                        <Icon
                            icon="ic:round-playlist-add"
                            fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {
                                setAddToPlaylistModalOpen(true);
                            }}
                        />
                        <Icon
                            icon="ph:heart-bold"
                            fontSize={25}
                            className="cursor-pointer text-gray-500 hover:text-white"
                        />
                    </div>
                </div>
                )
            }
        </div>
    )
};

export default LoggedInContainer;