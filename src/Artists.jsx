import { useEffect, useState } from "react";
import ArtistStyle from "./Artists.module.css";
import PlayListStyle from "./PlayList.module.css";
// import myImage from "./assets/hero.png";
function Artist({ artists, handleSelectArtist }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(
    function () {
      function loadArtists() {
        try {
          setIsLoading(true);
          const data = setTimeout(function () {
            setIsLoading((currState) => !currState);
            setData(artists);
          }, 2000);

          return function () {
            clearTimeout(data);
          };
        } catch (error) {
          console.log(error);
        }
      }
      loadArtists();
    },
    [artists],
  );

  return (
    <>
      <section>
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            {data.length === 0 ? (
              <div className={PlayListStyle.noPlayList}>
                <p>An Error Occured while fetching Data...</p>
              </div>
            ) : (
              <div className={ArtistStyle.artist_group}>
                {data.map((artist) => (
                  <div
                    key={artist.album.id}
                    className={ArtistStyle.artist_container}
                    onClick={() => handleSelectArtist(artist.album.id)}
                  >
                    <div className={ArtistStyle.artist_image}>
                      <img
                        src={artist.album.images[0].url}
                        className={ArtistStyle.artist_image_photo}
                        alt="Artist Photo"
                      />
                    </div>
                    <div className={ArtistStyle.artist_information}>
                      <span className={ArtistStyle.artist_name}>
                        {artist.name}
                      </span>
                      <span className={ArtistStyle.artist_popularity}>
                        Album:{artist.album.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default Artist;
