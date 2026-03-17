import SearchArtistStyle from "./SearchArtist.module.css";

function SearchArtist() {
  return (
    <>
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
            className={SearchArtistStyle.search_input}
          />
        </div>
      </section>
    </>
  );
}

export default SearchArtist;
