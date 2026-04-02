import { useEffect, useState } from "react";
import { generateRandomNumber } from "./util/utility";
import PlayListStyle from "./PlayList.module.css";

function PlayList({ target, artist }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [playList, setPlayList] = useState([]);

  useEffect(
    function () {
      function fetchPlayListData() {
        const playListData = localStorage.getItem("PlayList");
        const data = JSON.parse(playListData);
        if (name && description) {
          setPlayList(() => data);
        } else {
          setPlayList(() => data);
        }
      }
      fetchPlayListData();
    },
    [name, description],
  );

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleAddArtistToPlayList(id) {
    let copyPlayListData = [...playList];
    const index = copyPlayListData.findIndex((item) => item.id === id);
    const playListName = copyPlayListData[index].name;
    copyPlayListData[index].songs.push(artist.artistName);
    const confirm = window.confirm(
      `Do you want to add ${artist.artistName} to ${playListName}`,
    );
    if (confirm) {
      localStorage.setItem("PlayList", JSON.stringify(copyPlayListData));
    }
    // console.log(JSON.parse(localStorage.getItem("PlayList")));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !description) {
      alert("The Name or Description has not been entered");
      return;
    }

    const confirm = window.confirm(
      `Do you want to Create ${name} as a Playlist 🎧`,
    );

    if (confirm) {
      const data = {
        id: generateRandomNumber(),
        name: name,
        description: description,
        songs: [],
      };

      const playList = localStorage.getItem("PlayList");

      if (playList) {
        const prevData = JSON.parse(playList);
        localStorage.setItem("PlayList", JSON.stringify([...prevData, data]));
        alert(`${name} Playlist has been created successfully.`);
        setName("");
        setDescription("");
      } else {
        localStorage.setItem("PlayList", JSON.stringify([data]));
        alert(`${name} Playlist has been created successfully.`);
        setName("");
        setDescription("");
      }
      // setTimeout(() => {
      //   localStorage.setItem("PlayList", JSON.stringify(data));
      //   alert(`${name} Playlist has been created successfully.`);
      //   setName("");
      //   setDescription("");
      // }, 2000);
    }
  }
  return (
    <>
      <section ref={target}>
        <div className={PlayListStyle.playList_container}>
          <div className={PlayListStyle.playlist_form}>
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
                  {playList.map((item) => (
                    <div key={item.id} className={PlayListStyle.playList_item}>
                      <span>{item.name}</span>
                      <span onClick={() => handleAddArtistToPlayList(item.id)}>
                        ➕
                      </span>
                    </div>
                  ))}

                  {/* <div className={PlayListStyle.playList_item}>
                    <span>PlayList 2</span>
                    <span>➕</span>
                  </div>
                  <div className={PlayListStyle.playList_item}>
                    <span>PlayList 3</span>
                    <span>➕</span>
                  </div>
                  <div className={PlayListStyle.playList_item}>
                    <span>PlayList 4</span>
                    <span>➕</span>
                  </div> */}
                </div>
              </>
            ) : (
              <div className={PlayListStyle.noPlayList}>
                <p>No PlayList Available...</p>
              </div>
            )}

            {/* <h2>
              My PlayList <span>🎧</span>
            </h2>
            <div className={PlayListStyle.created_playList}>
              <div className={PlayListStyle.playList_item}>
                <span>PlayList 1</span>
                <span>➕</span>
              </div>
              <div className={PlayListStyle.playList_item}>
                <span>PlayList 2</span>
                <span>➕</span>
              </div>
              <div className={PlayListStyle.playList_item}>
                <span>PlayList 3</span>
                <span>➕</span>
              </div>
              <div className={PlayListStyle.playList_item}>
                <span>PlayList 4</span>
                <span>➕</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default PlayList;
