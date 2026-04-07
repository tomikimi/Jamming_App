import { useState } from "react";
import playListViewCSS from "./PlayListView.module.css";

function PlayListView({ playListSongs, selectedPlayList }) {
  //   const { name, songs } = playListSongs;

  let copyPlayListData = [...playListSongs];
  const index = copyPlayListData.findIndex(
    (item) => item.id === selectedPlayList,
  );
  console.log(index);
  console.log(copyPlayListData);
  const playListName = copyPlayListData[index].name;
  const [mySongs, setMySongs] = useState(copyPlayListData[index].songs);

  function handleRemoveSong(i) {
    const copySongs = [...mySongs];
    const confirm = window.confirm(
      `Are you sure you want to remove ${copySongs[i]} from ${playListName}`,
    );

    if (confirm) {
      copySongs.splice(i, 1);
      copyPlayListData[index].songs = copySongs;
      localStorage.setItem("PlayList", JSON.stringify(copyPlayListData));
      setMySongs(copySongs);
    }
  }
  return (
    <>
      <section>
        <h2>{playListName}</h2>
        <div className={playListViewCSS.playListView_Container}>
          {mySongs.map((song, i) => (
            <div key={i} className={playListViewCSS.playListView_songs}>
              <span className={playListViewCSS.playListView_song}>{song}</span>
              <span
                onClick={() => handleRemoveSong(i)}
                className={playListViewCSS.playListView_button}
                key={i}
              >
                Remove
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default PlayListView;
