import { useState } from "react";
import playListViewCSS from "./PlayListView.module.css";

function PlayListView({ playListSongs, selectedPlayList }) {
  let copyPlayListData = [...playListSongs];
  const index = copyPlayListData.findIndex(
    (item) => item.id === selectedPlayList,
  );
  const [mySongs, setMySongs] = useState(copyPlayListData[index].songs);
  const [editPlayListName, setEditPlayListName] = useState(false);
  const [playListName, setPlayListName] = useState(
    copyPlayListData[index].name,
  );

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

  function handleChangePlayListName(e) {
    setPlayListName(e.target.value);
  }

  function handleEditPlayListName() {
    const confirm = window.confirm(
      "Are you sure you want to edit the playlist name...",
    );
    if (confirm) {
      let data = JSON.parse(localStorage.getItem("PlayList"));
      data[index].name = playListName;
      localStorage.setItem("PlayList", JSON.stringify(data));

      setPlayListName(data[index].name);
      setEditPlayListName((currState) => !currState);
    } else {
      setEditPlayListName((currState) => !currState);
    }
  }

  function handleEditPlayListNameView() {
    setEditPlayListName((currState) => !currState);
  }

  return (
    <>
      <section>
        {editPlayListName ? (
          <>
            <div className={playListViewCSS.playListView_control}>
              <input
                type="text"
                className={playListViewCSS.form_input}
                onChange={handleChangePlayListName}
                value={playListName}
              />
              <span
                onClick={handleEditPlayListName}
                className={playListViewCSS.playListView_button}
              >
                Update
              </span>
            </div>
          </>
        ) : (
          <h2 className={playListViewCSS.playListView_control}>
            {playListName}
            <span
              onClick={handleEditPlayListNameView}
              className={playListViewCSS.playListView_button}
            >
              Edit
            </span>
          </h2>
        )}

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
