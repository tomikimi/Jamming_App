import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import SearchArtist from "./SearchArtist";
import Artist from "./Artists";
import ArtistPage from "./ArtistPage";
import "./App.css";
import PlayList from "./PlaysList";
import { generateAccessToken } from "./util/utility";
import PlayListView from "./PlayListView";

const Artists = [
  {
    id: 1,
    artistName: "Felix Mehndelson",
    popularity: "700",
  },
  {
    id: 2,
    artistName: "G.F Handel",
    popularity: "1,000,000",
  },
  {
    id: 3,
    artistName: "Chandler Moore",
    popularity: "2,000,000",
  },
  {
    id: 4,
    artistName: "Nathaniel Bassey",
    popularity: "10,000,000",
  },
];

const { VITE_API_TOKEN, VITE_CLIENT_ID, VITE_CLIENT_SECRET } = import.meta.env;

function App() {
  const [token, setToken] = useState("");
  const [artist, setArtist] = useState(null);
  const [addPlaylistForm, setAddPlayListForm] = useState(false);
  const [showPlayListView, setShowPlayListView] = useState(false);
  const [playListSongs, setPlayListSongs] = useState(null);
  const [selectedPlayList, setSelectedPlayList] = useState(null);
  const [tokenTimer, setTokenTimer] = useState(0);
  const targetSection = useRef(null);

  // Encode credentials to Base64
  useEffect(
    function () {
      const data = setTimeout(async function () {
        if (tokenTimer === 0) {
          const token = await generateAccessToken();
          console.log(token);
          setTokenTimer(token.expires_in);
          setToken(token.access_token);
        } else {
          setTokenTimer((currState) => (currState = currState - 1));
          console.log(tokenTimer);
        }
      }, 2000);

      return function () {
        clearTimeout(data);
      };
    },
    [tokenTimer],
  );

  // let timer = setInterval(() => {
  //   setTokenTimer((currState) => currState--);
  //   console.log(tokenTimer);
  //   if (tokenTimer < 0) {
  //     return;
  //   }
  //   clearInterval(timer);
  // }, 1000);

  function selectArtist(id) {
    setArtist(Artists.find((artist) => artist.id === id));
  }

  function handleAddPlayListForm() {
    setAddPlayListForm((currState) => !currState);
    targetSection.current?.scrollIntoView({ behaviour: "smooth" });
  }

  function handleShowPlayListView(id) {
    setShowPlayListView((currState) => !currState);
    const playListData = localStorage.getItem("PlayList");
    const jsonData = JSON.parse(playListData);
    // setPlayListSongs(jsonData.find((playList) => playList.id === id));
    setPlayListSongs(jsonData);
    setSelectedPlayList(id);
  }

  return (
    <>
      <Header></Header>
      {token ? (
        <>
          {artist === null ? (
            <>
              <SearchArtist token={token}></SearchArtist>
              <Artist
                artists={Artists}
                handleSelectArtist={selectArtist}
              ></Artist>
            </>
          ) : (
            <>
              {showPlayListView ? (
                <PlayListView
                  playListSongs={playListSongs}
                  selectedPlayList={selectedPlayList}
                ></PlayListView>
              ) : (
                <>
                  <ArtistPage
                    artist={artist}
                    handleAddPlayListForm={handleAddPlayListForm}
                  ></ArtistPage>

                  {addPlaylistForm ? (
                    <PlayList
                      artist={artist}
                      target={targetSection}
                      handleShowPlayListView={handleShowPlayListView}
                    ></PlayList>
                  ) : (
                    ""
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}

      {/* <ArtistPage></ArtistPage> */}
      {/* <PlayList></PlayList> */}
    </>
  );
}

export default App;
