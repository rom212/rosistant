import { useRef } from "react";
import styles from "./Meetings.module.css";

function Meetings(props) {
  const dateInputRef = useRef();
  const participantsInputRef = useRef();
  const tagsInputRef = useRef();
  const contentInputRef = useRef();

  function onClickSubmitHandler(e) {
    e.preventDefault();
    let authToken = localStorage.getItem(
      "CognitoIdentityServiceProvider.5mn7h62f4knvejrosfk6jbieua.ro.idToken"
    );
 

    fetch(
      "https://75kar4sd29.execute-api.us-east-1.amazonaws.com/prod/newdoc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authToken
        },
        body: JSON.stringify({
          date: dateInputRef.current.value,
          participants: participantsInputRef.current.value.toLowerCase().split(","),
          tags: tagsInputRef.current.value.toLowerCase().split(","),
          content: contentInputRef.current.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        props.ShowSuccess();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <form className={styles.main} onSubmit={onClickSubmitHandler}>
      <div>
        <div>
          <label htmlFor="date">
            <b>Date: </b>
          </label>
        </div>
        <div>
          <input
            ref={dateInputRef}
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
            ref={participantsInputRef}
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
            ref={tagsInputRef}
            type="text"
            placeholder="Enter comma separated tags"
            name="tags"
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
            ref={contentInputRef}
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
