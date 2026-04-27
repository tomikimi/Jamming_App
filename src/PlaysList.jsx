import { useEffect, useState } from "react";
import { getLocalStorage, getCurrentTimeStamp } from "./util/utility";
import PlayListStyle from "./PlayList.module.css";

const {
  VITE_API_URL,
  VITE_REDIRECT_URI_2,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_API_TOKEN,
} = import.meta.env;

function PlayList({
  artistInfo,
  target,
  token,
  playListForm,
  handleFetchPlayListItem,
  handleShowPlayListStatus,
  handleArtistInfo,
  handleToken,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [playList, setPlayList] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(
    function () {
      try {
        async function fetchPlayList() {
          const currentTimeStamp = getCurrentTimeStamp();
          const tokenExpiryTime = new Date(
            getLocalStorage("TokenExpirationTime", {}),
          );
          if (tokenExpiryTime > currentTimeStamp) {
            const res = await fetch(`${VITE_API_URL}me/playlists`, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + token,
              },
            });
            const data = await res.json();
            setPlayList(data.items);
          } else {
            const confirm = window.confirm(
              "Your Token has expired, login to Spotify",
            );
            if (confirm) {
              handleToken("");
            }
          }
        }
        fetchPlayList();
      } catch (error) {
        console.log(error);
      }
    },
    [token, refresh, handleToken],
  );

  // useEffect(
  //   function () {
  //     function fetchPlayListData() {
  //       const playListData = localStorage.getItem("PlayList");
  //       const data = JSON.parse(playListData);
  //       if (name && description) {
  //         setPlayList(() => data);
  //       } else {
  //         setPlayList(() => data);
  //       }
  //     }
  //     fetchPlayListData();
  //   },
  //   [name, description],
  // );

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  async function handleAddArtistToPlayList(id, selectedSong, playlistName) {
    // let copyPlayListData = [...playList];
    // const index = copyPlayListData.findIndex((item) => item.id === id);
    // const playListName = copyPlayListData[index].name;
    // copyPlayListData[index].songs.push(artist.artistName);
    // const confirm = window.confirm(
    //   `Do you want to add ${artist.artistName} to ${playListName}`,
    // );
    // if (confirm) {
    //   localStorage.setItem("PlayList", JSON.stringify(copyPlayListData));
    //   handleShowPlayListView(id);
    // }
    try {
      const currentTimeStamp = getCurrentTimeStamp();
      const tokenExpiryTime = new Date(
        getLocalStorage("TokenExpirationTime", {}),
      );
      if (tokenExpiryTime > currentTimeStamp) {
        const confirmSave = window.confirm(
          `Do you want to add ${artistInfo.name} to ${playlistName}`,
        );
        if (confirmSave) {
          const res = await fetch(`${VITE_API_URL}playlists/${id}/items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ uris: [selectedSong] }),
          });
          const data = await res.json();
          if (data.snapshot_id) {
            window.alert("Track Successfully added to Playlist");
          }
        }
      } else {
        const confirm = window.confirm(
          "Your Token has expired, login to Spotify",
        );
        if (confirm) {
          handleToken("");
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const currentTimeStamp = getCurrentTimeStamp();
    const tokenExpiryTime = new Date(
      getLocalStorage("TokenExpirationTime", {}),
    );
    try {
      if (tokenExpiryTime > currentTimeStamp) {
        if (!name || !description) {
          alert("The Name or Description has not been entered");
          return;
        }

        const confirm = window.confirm(
          `Do you want to Create ${name} as a Playlist 🎧`,
        );

        if (confirm) {
          const res = await fetch(`${VITE_API_URL}me/playlists`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              name,
              description,
              public: true,
            }),
          });

          const data = await res.json();
          setRefresh((currState) => !currState);
          setName("");
          setDescription("");
        }
      } else {
        const confirm = window.confirm(
          "Your Token has expired, login to Spotify",
        );
        if (confirm) {
          handleToken("");
        }
      }
    } catch (error) {
      console.log(error);
    }

    // if (confirm) {
    //   const data = {
    //     id: generateRandomNumber(),
    //     name: name,
    //     description: description,
    //     songs: [],
    //   };

    // const playList = localStorage.getItem("PlayList");

    // if (playList) {
    //   const prevData = JSON.parse(playList);
    //   localStorage.setItem("PlayList", JSON.stringify([...prevData, data]));
    //   alert(`${name} Playlist has been created successfully.`);
    //   setName("");
    //   setDescription("");
    // } else {
    //   localStorage.setItem("PlayList", JSON.stringify([data]));
    //   alert(`${name} Playlist has been created successfully.`);
    //   setName("");
    //   setDescription("");
    // }
    // setTimeout(() => {
    //   localStorage.setItem("PlayList", JSON.stringify(data));
    //   alert(`${name} Playlist has been created successfully.`);
    //   setName("");
    //   setDescription("");
    // }, 2000);
    // }
  }

  function handleReturnPage(e) {
    e.preventDefault();
    handleArtistInfo(null);
    setTimeout(() => {
      handleShowPlayListStatus(false);
    }, 3000);
  }

  return (
    <>
      <section ref={target}>
        <div className={PlayListStyle.playList_container}>
          <div
            className={`${playListForm ? PlayListStyle.playlist_form : PlayListStyle.form_hide}`}
          >
            <form action="" onSubmit={handleSubmit}>
              <div className={PlayListStyle.form_Control}>
                <label htmlFor="Name" id="Name">
                  Name
                </label>
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  value={name}
                  onChange={handleNameChange}
                  className={PlayListStyle.form_input}
                />
              </div>
              <div className={PlayListStyle.form_Control}>
                <label htmlFor="Description" id="Description">
                  Description
                </label>
                <input
                  type="text"
                  name="Description"
                  id="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className={PlayListStyle.form_input}
                />
              </div>
              <div className={PlayListStyle.btn_container}>
                <button className={PlayListStyle.btn_create}>Create</button>
              </div>
            </form>
          </div>

          <div className={PlayListStyle.myPlayList}>
            {playList ? (
              <>
                <h2>
                  My PlayList <span>🎧</span>
                </h2>
                <div className={PlayListStyle.created_playList}>
                  {playList.map((data) => (
                    <div key={data.id} className={PlayListStyle.playList_item}>
                      <span
                        onClick={() =>
                          handleFetchPlayListItem(
                            data.id,
                            data.name,
                            data.snapshot_id,
                          )
                        }
                      >
                        {data.name}
                      </span>
                      <span
                        id={artistInfo.tracks.items[0].uri}
                        onClick={() =>
                          handleAddArtistToPlayList(
                            data.id,
                            artistInfo.tracks.items[0].uri,
                            data.name,
                          )
                        }
                      >
                        ➕
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className={PlayListStyle.noPlayList}>
                <p>No PlayList Available...</p>
              </div>
            )}
          </div>
        </div>
        <div className="btn-container float-bottom">
          <button className="btn" onClick={handleReturnPage}>
            &larr; Return
          </button>
        </div>
      </section>
    </>
  );
}

export default PlayList;
