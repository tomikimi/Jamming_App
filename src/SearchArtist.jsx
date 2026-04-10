import { useState, useEffect } from "react";
// import { generateAccessToken } from "./util/utility";
import SearchArtistStyle from "./SearchArtist.module.css";

const { VITE_API_URL, VITE_CLIENT_ID, VITE_CLIENT_SECRET } = import.meta.env;

// setTimeout(async function () {
//   const token = await generateAccessToken();
//   console.log(token);
// }, 2000);

function SearchArtist({ token, handleLoadArtist }) {
  const [searchArtist, setSearchArtist] = useState("");

  // console.log(token);

  function handleSearchArtist(e) {
    setSearchArtist(e.target.value);
  }

  async function handleSearchSubmit(e) {
    try {
      e.preventDefault();
      const res = await fetch(
        `${VITE_API_URL}search?q=${searchArtist}&type=track&limit=5`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token,
          },
        },
      );
      const data = await res.json();
      handleLoadArtist(data.tracks);
      console.log(data.tracks);
    } catch (error) {
      console.log(error.message);
    }
  }

  // useEffect(
  //   function () {
  //     const controller = new AbortController();
  //     async function fetchArtist() {
  //       try {
  //         const res = await fetch(
  //           `${VITE_API_URL}search?q=${searchArtist}&type=track&limit=5`,
  //           {
  //             headers: {
  //               "Content-Type": "application/x-www-form-urlencoded",
  //               Authorization: "Bearer " + token,
  //             },
  //             signal: controller.signal,
  //           },
  //         );
  //         const data = await res.json();
  //         handleLoadArtist(data.artists);
  //         console.log(data.artists);
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }

  //     if (searchArtist !== "" && searchArtist.length >= 3) {
  //       fetchArtist();
  //     }

  //     return function () {
  //       controller.abort();
  //     };
  //   },
  //   [searchArtist, token, handleLoadArtist],
  // );

  return (
    <>
      {/* {token ? ( */}
      <section className={SearchArtistStyle.search_container}>
        <form action="" onSubmit={handleSearchSubmit}>
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
        </form>
      </section>
      {/* // ) : (
      //   <p>fetching</p>
      // )} */}
    </>
  );
}

export default SearchArtist;
