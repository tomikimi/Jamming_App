import ArtistStyle from "./Artists.module.css";
import myImage from "./assets/hero.png";
function Artist({ artists, handleSelectArtist }) {
  console.log(artists);
  const { items } = { ...artists };

  return (
    <>
      <section>
        <div className={ArtistStyle.artist_group}>
          {items.map((artist) => (
            <div
              key={artist.id}
              className={ArtistStyle.artist_container}
              onClick={() => handleSelectArtist(artist.id)}
            >
              <div className={ArtistStyle.artist_image}>
                <img
                  src={artist.album.images[0].url}
                  className={ArtistStyle.artist_image_photo}
                  alt="Artist Photo"
                />
              </div>
              <div className={ArtistStyle.artist_information}>
                <span className={ArtistStyle.artist_name}>{artist.name}</span>
                <span className={ArtistStyle.artist_popularity}>
                  Album:{artist.album.name}
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
