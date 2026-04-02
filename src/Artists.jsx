import ArtistStyle from "./Artists.module.css";
import myImage from "./assets/hero.png";
function Artist({ artists, handleSelectArtist }) {
  return (
    <>
      <section>
        <div className={ArtistStyle.artist_group}>
          {artists.map((artist) => (
            <div
              key={artist.id}
              className={ArtistStyle.artist_container}
              onClick={() => handleSelectArtist(artist.id)}
            >
              <div className={ArtistStyle.artist_image}>
                <img
                  src={myImage}
                  className={ArtistStyle.artist_image_photo}
                  alt="Artist Photo"
                />
              </div>
              <div className={ArtistStyle.artist_information}>
                <span className={ArtistStyle.artist_name}>
                  {artist.artistName}
                </span>
                <span className={ArtistStyle.artist_popularity}>
                  {artist.popularity} Popularity
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Artist;
