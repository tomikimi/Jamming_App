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
          <div></div>
        </div>
      </section>
    </>
  );
}

export default PlayList;
