import styles from "./LeftNav.module.css";
import LeftNavButton from "../UI/LeftNavButton";

function LeftNav(props) {
  return (
    <div className={styles.main}>
      <div>
        <LeftNavButton
          loggedIn={props.loggedIn}
          cancelPleaseLogIn={props.cancelPleaseLogIn}
          setShowPleaseLogin={props.setShowPleaseLogin}
          setRightNavContent={props.setRightNavContent}
        >
          Meetings
        </LeftNavButton>
      </div>
      <div>
        <LeftNavButton
          loggedIn={props.loggedIn}
          cancelPleaseLogIn={props.cancelPleaseLogIn}
          setShowPleaseLogin={props.setShowPleaseLogin}
          setRightNavContent={props.setRightNavContent}
        >
          Interviews
        </LeftNavButton>
        <hr></hr>
        <LeftNavButton
          loggedIn={props.loggedIn}
          cancelPleaseLogIn={props.cancelPleaseLogIn}
          setShowPleaseLogin={props.setShowPleaseLogin}
          setRightNavContent={props.setRightNavContent}
        >
          Search
        </LeftNavButton>
      </div>
    </div>
  );
}

export default LeftNav;
