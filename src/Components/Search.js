import { useRef } from "react";
import { useState } from "react/cjs/react.development";
import styles from "./Search.module.css";
import SearchResult from "./SearchResult";

function Search() {
  const participantsInputRef = useRef();
  const tagsInputRef = useRef();
  const contentInputRef = useRef();
  const titleInputRef = useRef();

  const [showResult, setShowResult] = useState(false);
  const [numberOfResults, setNumberOfResults] = useState(undefined);
  const [searchResults, setSearchResults] = useState([]);
  const [showDocument, setShowDocument] = useState(false);
  const [docSelected, setDocSelected] = useState({});

  function onDocumentClick(id) {
    setDocSelected(
      searchResults.filter(function checkId(doc) {
        return doc._id === id;
      })
    );

    setShowResult(false);
    setShowDocument(true);
  }

  function onClickNewSearch() {
    setShowResult(false);
    setShowDocument(false);
  }

  function onClickSubmitHandler(e) {
    e.preventDefault();
    let authToken = localStorage.getItem(
      "CognitoIdentityServiceProvider.5mn7h62f4knvejrosfk6jbieua.ro.idToken"
    );

    fetch(
      "https://75kar4sd29.execute-api.us-east-1.amazonaws.com/prod/listdocs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({
          participants: participantsInputRef.current.value
            .toLowerCase()
            .split(","),
          tags: tagsInputRef.current.value.toLowerCase().split(","),
          title: titleInputRef.current.value,
          content: contentInputRef.current.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setNumberOfResults(data.hits.total.value);
        setSearchResults(data.hits.hits);
        setShowResult(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (showResult) {
    return (
      <div>
        <h3>Number of search results:{numberOfResults}</h3>

        {searchResults.map((item) => (
          <SearchResult
            result={item}
            key={item._id}
            onDocumentClick={onDocumentClick}
          ></SearchResult>
        ))}
        <button className={styles.button} onClick={onClickNewSearch}>
          New search
        </button>
      </div>
    );
  }

  if (showDocument) {
    let date = new Date(Date.parse(docSelected[0]._source.date));
    let formattedmonth = date.toLocaleString("en-us", {
      month: "long",
      timeZone: "UTC",
    });
    let formattedday = date.toLocaleString("en-us", {
      day: "numeric",
      timeZone: "UTC",
    });
    let formattedyear = date.toLocaleString("en-us", {
      year: "numeric",
      timeZone: "UTC",
    });

    return (
      <div className={styles.mainDisplay}>
        <div className={styles.dateDisplay}>
          <div
            className={styles.month}
          >{`${formattedmonth} ${formattedday} ${formattedyear}`}</div>
        </div>
        <div className={styles.titleDisplay}>
          Title: {docSelected[0]._source.title}
        </div>
        <div className={styles.participantsDisplay}>
          Participants: {docSelected[0]._source.participants}
        </div>
        <div className={styles.participantsDisplay}>
          Tags: {docSelected[0]._source.tags}
        </div>
        <div className={styles.contentDisplay}>
          {docSelected[0]._source.content}
        </div>
        <button className={styles.button} onClick={onClickNewSearch}>
          New Search
        </button>
      </div>
    );
  }

  return (
    <form className={styles.main} onSubmit={onClickSubmitHandler}>
      <div>
        <div>
          <label htmlFor="title">
            <b>Title: </b>
          </label>
        </div>
        <div>
          <input
            ref={titleInputRef}
            type="text"
            placeholder="Enter title to search"
            name="title"
            className={styles.textInput}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="participants">
            <b>Participant: </b>
          </label>
        </div>
        <div>
          <input
            ref={participantsInputRef}
            type="text"
            placeholder="Enter participant to search"
            name="participants"
            className={styles.textInput}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="Tags">
            <b>Tag: </b>
          </label>
        </div>
        <div>
          <input
            ref={tagsInputRef}
            type="text"
            placeholder="Enter tag to search"
            name="tags"
            className={styles.textInput}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="Content">
            <b>Content phrase: </b>
          </label>
        </div>
        <div>
          <input
            ref={contentInputRef}
            type="text"
            placeholder="Enter content phrase to search"
            name="content"
            className={styles.contentInput}
          ></input>
        </div>
      </div>

      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;
