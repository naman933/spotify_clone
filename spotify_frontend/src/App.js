import './output.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import LoggedInHomeComponent from './routes/LoggedInHome';
import UploadSong from './routes/UploadSong';
import MyMusic from './routes/MyMusic';
import SearchPage from './routes/SearchPage';
import { useCookies } from 'react-cookie';
import songContext from './contexts/songContext';
import {useState} from "react";
import Library from './routes/Library';
import SinglePlaylistView from "./routes/SinglePlaylistView";


function App() {
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [cookie, setCookie] = useCookies("token");

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
          {cookie.token ? (
            <songContext.Provider value={{currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused}}>
              <Routes> {/* Logged in routes*/}
                {/* adding routes components here indicates the package (react-router-dom) that we are starting to define our routes inside this */}
                  <Route path="/" element={<HelloComponent />} />
                  <Route path="/home" element={<LoggedInHomeComponent/>} />
                  <Route path="/uploadSong" element={<UploadSong/>} />
                  <Route path="/myMusic" element={<MyMusic/>} />
                  <Route path="/search" element={<SearchPage/>} />
                  <Route path="/library" element={<Library/>} />
                  <Route path="/playlist/:playlistId" element={<SinglePlaylistView />}/>
                  <Route path="*" element = { <Navigate to="/home"/>}/>
                </Routes>
            </songContext.Provider>
          ): (
            <Routes> {/* Logged out routes */}
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent />} />
              <Route path="*" element = { <Navigate to="/home"/>} />
            </Routes>
          )}
      </BrowserRouter>
    </div>
    
  );
}

const HelloComponent=()=> {
  return <div> This is the hello component</div>;
};

export default App;
