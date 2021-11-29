import styles from "./SearchResult.module.css";

function SearchResult(props) {
  let date = new Date(Date.parse(props.result._source.date));
  let formattedmonth = date.toLocaleString("en-us", {
    month: "short",
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
    <div className={styles.main} onClick={()=>props.onDocumentClick(props.result._id)}>
      <div className={styles.leftbox}>
        <div className={styles.leftcontent}>
          <div>{formattedmonth}</div>
          <div>{formattedday}</div>
          <div>{formattedyear}</div>
        </div>
      </div>
      <div className={styles.rightbox}>
        <div className={styles.rightcontent}>
          <div>Title: {props.result._source.title}</div>
          <div>Participants: {props.result._source.participants}</div>
          <div>Tags: {props.result._source.tags}</div>
        </div>
      </div>
      <div className={styles.score}>score: {props.result._score}</div>
    </div>
  );
}

export default SearchResult;
