import ArtistPageStyle from "./ArtistPage.module.css";
import myImage from "./assets/hero.png";

function ArtistPage({ artist, handleAddPlayListForm }) {
  return (
    <>
      <section>
        <div className={ArtistPageStyle.artist_container}>
          <div className={ArtistPageStyle.artistPage_image_cover}>
            <img
              src={myImage}
              alt="Artist Image Cover"
              className={ArtistPageStyle.artist_image}
            />
          </div>
          <div className={ArtistPageStyle.artist_page_details}>
            <p className={ArtistPageStyle.artist_name}>{artist.artistName}</p>
            <p className={ArtistPageStyle.artist_follower}>
              {artist.popularity} listeners
            </p>
            <div className={ArtistPageStyle.artist_genre}>
              <span>Choral Music</span>
              <span>Gospel</span> <span>Classic</span> <span>Hymns</span>
            </div>
          </div>
          <button
            className={ArtistPageStyle.btn_addPlaylist}
            onClick={handleAddPlayListForm}
          >
            Add to PlayList 🎧
          </button>
        </div>
      </section>
    </>
  );
}

export default ArtistPage;
