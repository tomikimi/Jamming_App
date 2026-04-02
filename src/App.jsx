import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import SearchArtist from "./SearchArtist";
import Artist from "./Artists";
import ArtistPage from "./ArtistPage";
import "./App.css";
import PlayList from "./PlaysList";
import { generateAccessToken } from "./util/utility";

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
  const targetSection = useRef(null);

  // Encode credentials to Base64
  useEffect(function () {
    const data = setTimeout(async function () {
      const token = await generateAccessToken();
      console.log(token);
      setToken(token);
    }, 2000);

    return function () {
      clearTimeout(data);
    };
  }, []);

  function selectArtist(id) {
    setArtist(Artists.find((artist) => artist.id === id));
  }

  function handleAddPlayListForm() {
    setAddPlayListForm((currState) => !currState);
    targetSection.current?.scrollIntoView({ behaviour: "smooth" });
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
              <ArtistPage
                artist={artist}
                handleAddPlayListForm={handleAddPlayListForm}
              ></ArtistPage>
              {addPlaylistForm ? (
                <PlayList artist={artist} target={targetSection}></PlayList>
              ) : (
                ""
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
