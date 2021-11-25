import styles from "./PleaseLogIn.module.css";

function PleaseLogIn(props) {


  return (
    <div className={styles.main}>
      <div>Please log in</div>
      <button className={styles.button} onClick={props.cancelPleaseLogIn}>Ok</button>
    </div>
  );
}

export default PleaseLogIn;
