import ArtistPageStyle from "./ArtistPage.module.css";

function ArtistPage({ artist, handleAddPlayListForm }) {
  console.log(artist);
  return (
    <>
      <section>
        <div className={ArtistPageStyle.artist_container}>
          <div className={ArtistPageStyle.artistPage_image_cover}>
            <img
              src={artist?.images[0].url ?? "default"}
              alt="Artist Image Cover"
              className={ArtistPageStyle.artist_image}
            />
          </div>
          <div className={ArtistPageStyle.artist_page_details}>
            <p className={ArtistPageStyle.artist_name}>
              {artist?.name ?? "default"}
            </p>
            <p className={ArtistPageStyle.artist_follower}>
              {artist?.total_tracks ?? "default"} tracks
            </p>
            <div className={ArtistPageStyle.artist_genre}>
              <span>
                {(artist?.genres.length ?? "default")
                  ? (artist?.genres[0] ?? "default")
                  : `No Genre`}
              </span>
              <span>{artist?.type ?? "default"}</span>
              <span>{artist?.release_date ?? "default"}</span>
            </div>
          </div>
          <button
            className={ArtistPageStyle.btn_addPlaylist}
            onClick={handleAddPlayListForm}
          >
            Create New PlayList 🎧
          </button>
        </div>
      </section>
    </>
  );
}

export default ArtistPage;
