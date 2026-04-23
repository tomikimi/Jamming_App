import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import SearchArtist from "./SearchArtist";
import Artist from "./Artists";
import ArtistPage from "./ArtistPage";
import "./App.css";
import PlayList from "./PlaysList";
import { generateAccessToken, convertSecstoTime } from "./util/utility";
import PlayListView from "./PlayListView";
import PlayListStyle from "./PlayList.module.css";

const {
  VITE_API_URL,
  VITE_APP_ENV,
  VITE_CLIENT_ID,
  VITE_AUTHORIZE_URI,
  VITE_REDIRECT_URI_2,
} = import.meta.env;
// let tokenTimeStamp = null;
// let currentTimeStamp = new Date();
// https://accounts.spotify.com/authorize?client_id=&redirect_uri=&scope=&response_type=&state=
const SCOPES = [
  "playlist-read-collaborative",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
];
const SPACE_DELIMETER = "%20";
const SCOPE_URL_PARAM = SCOPES.join(SPACE_DELIMETER);

function getSpotifyCode(data) {
  const codeValue = data.split("?");
  const objectValue = codeValue.reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value;
    return acc;
  }, {});
  return objectValue;
}
function App() {
  const [token, setToken] = useState("");
  const [artist, setArtist] = useState(null);
  const [artistInfo, setArtistInfo] = useState([]);
  const [spotifyAccess, setSpotifyAccess] = useState(false);
  const [addPlaylistForm, setAddPlayListForm] = useState(false);
  const [showPlayList, setShowPlayList] = useState(false);
  const [showPlayListDetail, setShowPlayListDetail] = useState(false);
  const [playListSongs, setPlayListSongs] = useState(null);
  const [tokenTimer, setTokenTimer] = useState(0);
  const targetSection = useRef(null);

  console.log(VITE_APP_ENV);
  console.log(VITE_REDIRECT_URI_2);

  function handleLogin(e) {
    e.preventDefault();
    setSpotifyAccess(true);
    window.location = `${VITE_AUTHORIZE_URI}?client_id=${VITE_CLIENT_ID}&redirect_uri=${VITE_REDIRECT_URI_2}&scope=${SCOPE_URL_PARAM}&response_type=code&show_dialog=true`;
  }

  // Encode credentials to Base64
  useEffect(function () {
    async function test() {
      if (window.location.search) {
        const { code } = getSpotifyCode(window.location.search);

        const token = await generateAccessToken(code);
        setToken(token.access_token);
        const dataTime = convertSecstoTime(token.expires_in);
        localStorage.setItem("TokenExpirationTime", JSON.stringify(dataTime));

        // setTimeout(() => {
        //   console.log(dataTime);
        //   localStorage.setItem("TokenExpirationTime", JSON.stringify(dataTime));
        // }, 3000);

        // return function () {
        //   clearTimeout(timeOut);
        // };

        // setTokenTimer(token.expires_in);
      }
    }
    test();

    // const data = setTimeout(async function () {
    //   if (tokenTimeStamp === null) {
    //     const token = await generateAccessToken();
    //     // console.log(token);
    //     // setTokenTimer(token.expires_in);
    //     setToken(token.access_token);
    //     // }
    //     // else {
    //     //   setTokenTimer((currState) => (currState = currState - 1));
    //     //   console.log(tokenTimer);
    //     // }
    //     tokenTimeStamp = convertSecstoTime(token.expires_in);
    //     console.log(`New Time Stamp ${convertSecstoTime(token.expires_in)}`);
    //   } else if (currentTimeStamp > tokenTimeStamp) {
    //     const token = await generateAccessToken();
    //     // console.log(token);
    //     // setTokenTimer(token.expires_in);
    //     setToken(token.access_token);
    //     // }
    //     // else {
    //     //   setTokenTimer((currState) => (currState = currState - 1));
    //     //   console.log(tokenTimer);
    //     // }
    //     tokenTimeStamp = convertSecstoTime(token.expires_in);
    //     console.log(`Renewed TimeStamp ${convertSecstoTime(token.expires_in)}`);
    //   }
    // }, 2000);

    // return function () {
    //   clearTimeout(data);
    // };
  }, []);

  async function selectArtist(id) {
    // setArtist(Artists.find((artist) => artist.id === id));
    // setArtist(artist.find((artist) => artist.id === id));
    console.log(id);
    try {
      const res = await fetch(`${VITE_API_URL}albums/${id}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      if (data) {
        setShowPlayList((currState) => !currState);
        setArtistInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFetchPlayListItem(id, playListName, snapshot_id) {
    try {
      const res = await fetch(`${VITE_API_URL}playlists/${id}/items`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();
      setPlayListSongs(data.items);
      setTimeout(function () {
        setShowPlayListDetail((currState) => !currState);
        localStorage.setItem(
          "PlayListDetail",
          JSON.stringify([id, playListName, snapshot_id]),
        );
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleAddPlayListForm() {
    setAddPlayListForm((currState) => !currState);
    targetSection.current?.scrollIntoView({ behaviour: "smooth" });
  }

  function handleLoadArtist(data) {
    setArtist(data);
  }

  return (
    <>
      <Header></Header>
      {token ? (
        <>
          {!showPlayList ? (
            <>
              <SearchArtist
                token={token}
                handleToken={setToken}
                handleLoadArtist={handleLoadArtist}
              ></SearchArtist>
              {artist ? (
                <Artist
                  artists={artist}
                  handleSelectArtist={selectArtist}
                ></Artist>
              ) : (
                <div className={PlayListStyle.noPlayList}>
                  <p>No PlayList Available...</p>
                </div>
              )}
            </>
          ) : (
            <>
              {!showPlayListDetail ? (
                <>
                  <ArtistPage
                    artist={artistInfo}
                    handleAddPlayListForm={handleAddPlayListForm}
                  ></ArtistPage>
                  <PlayList
                    artistInfo={artistInfo}
                    target={targetSection}
                    token={token}
                    playListForm={addPlaylistForm}
                    handleFetchPlayListItem={handleFetchPlayListItem}
                    handleShowPlayListStatus={setShowPlayList}
                    handleArtistInfo={setArtist}
                  ></PlayList>
                </>
              ) : (
                <PlayListView
                  playListSongs={playListSongs}
                  token={token}
                  handleShowPlayListDetail={setShowPlayListDetail}
                ></PlayListView>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {spotifyAccess === false ? (
            <>
              <div className="btn-container">
                <button onClick={handleLogin} className="btn_login">
                  Login to Spotify
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={PlayListStyle.noPlayList}>
                <p>Loading...</p>
              </div>
            </>
          )}
        </>
      )}

      {/* {token ? (
        <>
          {artist === null ? (
            <>
              <SearchArtist
                token={token}
                handleLoadArtist={handleLoadArtist}
              ></SearchArtist>

              <Artist
                artists={artist}
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
      )} */}
    </>
  );
}

export default App;
