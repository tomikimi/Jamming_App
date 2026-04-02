import { useState, useEffect } from "react";
// import { generateAccessToken } from "./util/utility";
import SearchArtistStyle from "./SearchArtist.module.css";

const { VITE_API_URL, VITE_CLIENT_ID, VITE_CLIENT_SECRET } = import.meta.env;

// setTimeout(async function () {
//   const token = await generateAccessToken();
//   console.log(token);
// }, 2000);

function SearchArtist({ token }) {
  const [searchArtist, setSearchArtist] = useState("All");

  console.log(token);

  function handleSearchArtist(e) {
    setSearchArtist(e.target.value);
  }

  useEffect(
    function () {
      async function fetchArtist() {
        const res = await fetch(
          `${VITE_API_URL}search?q=${searchArtist}&type=artist&limit=5`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Bearer " + token,
            },
          },
        );
        const data = await res.json();
        console.log(data);
      }
      fetchArtist();
    },
    [searchArtist, token],
  );

  return (
    <>
      {token ? (
        <section className={SearchArtistStyle.search_container}>
          <div className={SearchArtistStyle.search_information}>
            <h1>Hi 👋🏽 Music Lover</h1>
            <p>What will you like to Jamm 🎧 to ... </p>
          </div>
          <div className={SearchArtistStyle.search_control}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search Here"
              value={searchArtist}
              onChange={handleSearchArtist}
              className={SearchArtistStyle.search_input}
            />
          </div>
        </section>
      ) : (
        <p>fetching</p>
      )}
    </>
  );
}

export default SearchArtist;
