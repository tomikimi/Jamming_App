import { useState } from "react";
import { getLocalStorage } from "./util/utility";
import PlayListStyle from "./PlayList.module.css";
import playListViewCSS from "./PlayListView.module.css";

const {
  VITE_API_URL,
  VITE_REDIRECT_URI_2,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_API_TOKEN,
} = import.meta.env;

localStorage.setItem("PlayListDetail", JSON.stringify([1, 1, 1]));

const [id1, playlist1, snapshot_id] = getLocalStorage("PlayListDetail", {});

function PlayListView({ playListSongs, token, handleShowPlayListDetail }) {
  //   let copyPlayListData = [...playListSongs];
  //   const index = copyPlayListData.findIndex(
  //     (item) => item.id === selectedPlayList,
  //   );

  const [editPlayListName, setEditPlayListName] = useState(false);
  const [playListName, setPlayListName] = useState(playlist1);

  async function handleRemoveSong(uri) {
    // const copySongs = [...mySongs];
    // const confirm = window.confirm(
    //   `Are you sure you want to remove ${copySongs[i]} from ${playListName}`,
    // );
    // if (confirm) {
    //   copySongs.splice(i, 1);
    //   copyPlayListData[index].songs = copySongs;
    //   localStorage.setItem("PlayList", JSON.stringify(copyPlayListData));
    //   setMySongs(copySongs);
    // }
    try {
      const res = await fetch(`${VITE_API_URL}playlists/${id1}/items`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          items: [{ uri: uri }],
          snapshot_id: `${snapshot_id}`,
        }),
      });

      if (res.ok) {
        window.alert(`music removed from ${playListName}`);
      }
      setTimeout(() => {
        handleShowPlayListDetail(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  }

  function handleChangePlayListName(e) {
    setPlayListName(e.target.value);
  }

  async function handleEditPlayListName() {
    try {
      if (!playListName) {
        window.alert("Playlist Name is required");
        return;
      }
      const confirm = window.confirm(
        "Are you sure you want to edit the playlist name...",
      );

      if (confirm) {
        //   let data = JSON.parse(localStorage.getItem("PlayList"));
        //   data[index].name = playListName;
        //   localStorage.setItem("PlayList", JSON.stringify(data));
        //   setPlayListName(data[index].name);
        //   setEditPlayListName((currState) => !currState);

        const res = await fetch(`${VITE_API_URL}playlists/${id1}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name: playListName,
            description: `A Playlist for ${playListName}`,
            public: true,
          }),
        });

        if (res.ok && res.status !== 204) {
          setEditPlayListName((currState) => !currState);
        }
      } else {
        setEditPlayListName((currState) => !currState);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleEditPlayListNameView() {
    setEditPlayListName((currState) => !currState);
  }

  function handleReturnPage(e) {
    e.preventDefault();
    handleShowPlayListDetail(false);
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
        {playListSongs.length ? (
          <div className={playListViewCSS.playListView_Container}>
            {playListSongs.map((song) => (
              <div
                key={song.item.id}
                className={playListViewCSS.playListView_songs}
              >
                <span className={playListViewCSS.playListView_song}>
                  {song.item.name}
                </span>
                <span
                  onClick={() => handleRemoveSong(song.item.uri)}
                  className={playListViewCSS.playListView_button}
                  key={song.item.id}
                >
                  Remove
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className={PlayListStyle.noPlayList}>
            <p>No PlayList Available...</p>
          </div>
        )}
        <div className="btn-container float-bottom">
          <button className="btn" onClick={handleReturnPage}>
            &larr; Return
          </button>
        </div>
      </section>
    </>
  );
}

export default PlayListView;
