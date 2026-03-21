import PlayListStyle from "./PlayList.module.css";

function PlayList() {
  return (
    <>
      <section>
        <div className={PlayListStyle.playList_container}>
          <div className={PlayListStyle.playlist_form}>
            <form action="">
              <div className={PlayListStyle.form_Control}>
                <label htmlFor="Name" id="Name">
                  Name
                </label>
                <input
                  type="text"
                  name="Name"
                  id="Name"
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
                  className={PlayListStyle.form_input}
                />
              </div>
              <div className={PlayListStyle.btn_container}>
                <button className={PlayListStyle.btn_create}>Create</button>
              </div>
            </form>
          </div>
          <div className={PlayListStyle.myPlayList}>
            <div className={PlayListStyle.noPlayList}>
              <p>No PlayList Available...</p>
            </div>
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
