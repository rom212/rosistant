import styles from "./Meetings.module.css";

function Meetings() {
  return (
    <form className={styles.main}>
      <div>
        <div>
          <label htmlFor="date">
            <b>Date: </b>
          </label>
        </div>
        <div>
          <input
            className={styles.dateInput}
            type="date"
            placeholder="Enter Date"
            name="date"
            required
          ></input>
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="participants">
            <b>Participants: </b>
          </label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter comma separated participants"
            name="participants"
            required
            className={styles.textInput}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="Tags">
            <b>Tags: </b>
          </label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter comma separated tags"
            name="participants"
            required
            className={styles.textInput}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="Content">
            <b>Content: </b>
          </label>
        </div>
        <div>
          <textarea
            type="text"
            placeholder=""
            name="content"
            required
            className={styles.contentInput}
          ></textarea>
        </div>
      </div>

      <button className={styles.button} type="submit">
        Index
      </button>
    </form>
  );
}

export default Meetings;
