import styles from "./Success.module.css";

function Success(props) {


  return (
    <div className={styles.main}>
      <div>Success</div>
      <button className={styles.button} onClick={props.cancelShowSuccess}>Ok</button>
    </div>
  );
}

export default Success;
