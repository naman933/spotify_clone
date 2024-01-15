import { useEffect, useState } from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";


const MyMusic=()=>{
    const [songData, setSongData] =useState([]);

    useEffect(()=>{
    const getData = async () =>{
            const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
            console.log(response.data);
            setSongData(response.data);
        };
        getData();
    }, []);
    return (
        <LoggedInContainer curActiveScreen={"myMusic"}>
            <div className="text-white text-xl font-semibold pb-4 pt-8">My Songs</div>
             <div className="space-y-3 overflow-auto">
                    {songData.map((item)=>{
                        return <SingleSongCard info={item} playSound={() => {}}/>
                    })}
             </div>
        </LoggedInContainer>
    );
};

// const MyMusic = () =>{
    
//     const [songData, setSongData] =useState([]);
//     const [soundPlayed, setSoundPlayed] = useState(null);

//     const playSound = (songSrc) =>{ {/* function used to play sound , howler is the package which is used*/}
//         if (soundPlayed){
//             soundPlayed.stop();
//         }
//         let sound = new Howl({
//             src: [songSrc],
//             html5: true
//           });
//         setSoundPlayed(sound);
//         sound.play();
//     };

//     useEffect(()=>{
//         const getData = async () =>{
//             const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
//             console.log(response.data);
//             setSongData(response.data);
//         };
//         getData();
//     }, []);

//     return (
//         <div className="w-full h-full flex">
//             <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10"> {/* this div will be the left panel*/}
//                 <div>
//                     <div className="logoDiv p-6"> {/*this div is for logo*/}
//                         <img src={spotify_log} alt="spotify_logo" width={125}/>
//                     </div>
//                     <div className="py-5">
//                         <IconText iconName={"material-symbols:home"} displayText={"Home"}/>
//                         <IconText iconName={"mingcute:search-line"} displayText={"Search"} />
//                         <IconText iconName={"codicon:library"} displayText={"Library"} />
//                         <IconText iconName={"solar:bag-music-2-bold"} displayText={"My Music"} active/>
//                     </div>
//                     <div className="pt-4">
//                         <IconText iconName={"icon-park-solid:add"} displayText={"Create Playlist"} />
//                         <IconText iconName={"mdi:heart-box"} displayText={"Liked Songs"} />
//                     </div>
//                 </div>
//                 <div className="px-5 ">
//                     <div className="border border-gray-200 text-white w-2/5 flex rounded-full px-2 py-1 items-center justify-center cursor-pointer hover:border-white">
//                         <Icon icon="ph:globe" fontSize={20}/>
//                         <div className="ml-2 text-sm text-semibold">English</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="h-full w-4/5 bg-app-black overflow-auto">{/* this div will be the right panel*/}
//                 <div className="navbar w-full h-1/10 bg-black bg-opacity-40 flex items-center justify-end">
//                     <div className="w-1/2 flex h-full">
//                         <div className="w-2/3 flex justify-around items-center">
//                             <TextWithHover displayText={"Premium"} />
//                             <TextWithHover displayText={"Support"} />
//                             <TextWithHover displayText={"Download"} />
//                             <div className="h-1/3 border-r border-white"></div>
//                         </div>
//                         <div className="w-1/3 flex justify-around h-full items-center">
//                             <TextWithHover displayText={"Upload Song"} />
//                             <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">NS</div>
//                         </div>  
//                     </div>
//                 </div>
//                 <div className=" content p-8 overflow-auto">
//                     <div className="text-white text-xl font-semibold pb-4">My Songs</div>
//                     <div className="space-y-3 overflow-auto">
//                         {songData.map((item)=>{
//                             return <SingleSongCard info={item} playSound={playSound}/>
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };


export default MyMusic;