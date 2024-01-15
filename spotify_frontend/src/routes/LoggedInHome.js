import spotify_log from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {Howl, Howler} from "howler";
import LoggedInContainer from "../containers/LoggedInContainer";

const focusCardsData=[{
    title : "Peaceful Piano",
    description : "Relax and indulge with beautiful piano pieces",
    imgUrl : "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80"
}, {
    title : "Deep Focus",
    description : "Keep calm and focus with music",
    imgUrl : "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80"
}, {
    title : "Instrumental Study",
    description : "Focus with soft study music in the background",
    imgUrl : "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"

}, {
    title : "Focus flow",
    description : "Up tempo instrumental hip hop beats",
    imgUrl : "https://images.unsplash.com/photo-1528922087877-3f44f53a8f7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2273&q=80"

}, {
    title : "Beats to think to",
    description : "Focus with deep techno and tech house",
    imgUrl : "https://images.unsplash.com/photo-1571512379797-4613cb587cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80"
}];

const spotifyPlaylistsCardData = [
    {
        title: "This is one",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const LoggedInHomeComponent = () => {
    return (
        <LoggedInContainer curActiveScreen={"home"}>
            <PlaylistView titleText="Focus" cardsData={focusCardsData}/>
            <PlaylistView titleText="Spotify Playlists" cardsData={spotifyPlaylistsCardData}/>
            <PlaylistView titleText="Sound of India" cardsData={focusCardsData}/>
        </LoggedInContainer>
    );
};


// const LoggedInHomeComponent = () =>{
//     const [soundPlayed, setSoundPlayed] = useState(null);
//     const [isPaused, setIsPaused] = useState(true);

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

//     const pauseSound= () => {
//         soundPlayed.pause();
//     };

//     const togglePlayPause = () =>{
//         if (isPaused){
//             playSound("https://res.cloudinary.com/dbw5xpycw/video/upload/v1697225847/vor6t7x6mgwmyavb756t.mp3");
//             setIsPaused(false);
//         }
//         else {
//             pauseSound();
//             setIsPaused(true);
//         }
//     };

//     return (
//         <div className="w-full h-full bg-app-black">
//             <div className="w-full h-9/10 flex">
//                 <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10"> {/* this div will be the left panel*/}
//                     <div>
//                         <div className="logoDiv p-6"> {/*this div is for logo*/}
//                             <img src={spotify_log} alt="spotify_logo" width={125}/>
//                         </div>
//                         <div className="py-5">
//                             <IconText iconName={"material-symbols:home"} displayText={"Home"}  active/>
//                             <IconText iconName={"mingcute:search-line"} displayText={"Search"} />
//                             <IconText iconName={"codicon:library"} displayText={"Library"} />
//                             <IconText iconName={"solar:bag-music-2-bold"} displayText={"My Music"} />
//                         </div>
//                         <div className="pt-4">
//                             <IconText iconName={"icon-park-solid:add"} displayText={"Create Playlist"} />
//                             <IconText iconName={"mdi:heart-box"} displayText={"Liked Songs"} />
//                         </div>
//                     </div>
//                     <div className="px-5 ">
//                         <div className="border border-gray-200 text-white w-2/5 flex rounded-full px-2 py-1 items-center justify-center cursor-pointer hover:border-white">
//                             <Icon icon="ph:globe" fontSize={20}/>
//                             <div className="ml-2 text-sm text-semibold">English</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="h-full w-4/5 bg-app-black overflow-auto">{/* this div will be the right panel*/}
//                     <div className="navbar w-full h-1/10 bg-black bg-opacity-40 flex items-center justify-end">
//                         <div className="w-1/2 flex h-full">
//                             <div className="w-2/3 flex justify-around items-center">
//                                 <TextWithHover displayText={"Premium"} />
//                                 <TextWithHover displayText={"Support"} />
//                                 <TextWithHover displayText={"Download"} />
//                                 <div className="h-1/3 border-r border-white"></div>
//                             </div>
//                             <div className="w-1/3 flex justify-around h-full items-center">
//                                 <TextWithHover displayText={"Upload Song"} />
//                                 <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">NS</div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="content p-8 pt-0">
//                         <PlaylistView titleText="Focus" cardsData={focusCardsData}/>
//                         <PlaylistView titleText="Spotify Playlists" cardsData={spotifyPlaylistsCardData}/>
//                         <PlaylistView titleText="Sound of India" cardsData={focusCardsData}/>
//                     </div>
//                 </div>
//             </div>
//             <div className="w-full h-1/10 bg-black bg-opacity-40 text-white flex items-center px-4"> {/* this div is the current song player with all the controls */}
//                 <div className="w-1/4 flex items-center" >
//                     <img src="https://plus.unsplash.com/premium_photo-1664302427357-40eb7c8fd3c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
//                         alt="currentSongThumbnail"
//                         className="h-14 w-14 rounded"
//                     />
//                     <div className="pl-4">
//                         <div className="text-sm cursor-pointer hover:underline"> Curtains </div>
//                         <div className="text-xs text-gray-500 cursor-pointer hover:underline"> Ed Sheeran </div>
//                     </div>
//                 </div>
//                 <div className="w-1/2 h-full flex justify-center flex-col items-center ">
//                     <div className="flex w-1/4 justify-between items-center"> {/*controls for the playing song go in this div */}
//                         <Icon icon="ph:shuffle" fontSize={20}  className="cursor-pointer text-gray-500 hover:text-white"/>
//                         <Icon icon="ic:outline-skip-previous" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>
//                         <Icon icon={isPaused ? "ic:baseline-play-circle" : "ic:baseline-pause-circle"} fontSize={50} className="cursor-pointer text-gray-500 hover:text-white"
//                             onClick={togglePlayPause}
//                         />
//                         <Icon icon="material-symbols:skip-next-outline" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>
//                         <Icon icon="ic:twotone-repeat" fontSize={20} className="cursor-pointer text-gray-500 hover:text-white"/>
//                     </div>
//                     {/* <div> Progress Bar Here </div> */}
    
//                 </div>
//                 <div className="w-1/4 flex justify-end">
//                 Hello
//                 </div>
//             </div>
//         </div>
//     )
// };

const PlaylistView= ({titleText, cardsData}) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5"> {titleText} </div>
            <div className="w-full flex justify-between space-x-4">
                {
                    cardsData.map((item)=>{
                        return (<Card title={item.title} description={item.description} imgUrl={item.imgUrl}/>)
                    })
                }
            </div>
        </div>
    )
};

const Card = ({title, description, imgUrl}) => {
    return (
        <div className="bg-black bg-opacity-30 w-1/5 p-4 rounded-lg">
            <div className=" pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl}
                alt="label"/>
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    )
};

export default LoggedInHomeComponent;