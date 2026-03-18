import ArtistStyle from "./Artists.module.css";
import myImage from "./assets/hero.png";
function Artist() {
  return (
    <>
      <section>
        <div className={ArtistStyle.artist_group}>
          <div className={ArtistStyle.artist_container}>
            <div className={ArtistStyle.artist_image}>
              <img
                src={myImage}
                className={ArtistStyle.artist_image_photo}
                alt="Artist Photo"
              />
            </div>
            <div className={ArtistStyle.artist_information}>
              <span className={ArtistStyle.artist_name}>Artist Name</span>
              <span className={ArtistStyle.artist_popularity}>
                50 Popularity
              </span>
            </div>
          </div>
          <div className={ArtistStyle.artist_container}>
            <div className={ArtistStyle.artist_image}>
              <img
                src={myImage}
                className={ArtistStyle.artist_image_photo}
                alt="Artist Photo"
              />
            </div>
            <div className={ArtistStyle.artist_information}>
              <span className={ArtistStyle.artist_name}>Artist Name</span>
              <span className={ArtistStyle.artist_popularity}>
                50 Popularity
              </span>
            </div>
          </div>
          <div className={ArtistStyle.artist_container}>
            <div className={ArtistStyle.artist_image}>
              <img
                src={myImage}
                className={ArtistStyle.artist_image_photo}
                alt="Artist Photo"
              />
            </div>
            <div className={ArtistStyle.artist_information}>
              <span className={ArtistStyle.artist_name}>Artist Name</span>
              <span className={ArtistStyle.artist_popularity}>
                50 Popularity
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Artist;
