import styles from './TopNavButton.module.css';

function TopNavButton(props) {
 return(
     <button className={styles.button} onClick={props.loggedInStatus? props.onLogoutButtonClickHandler: props.onLoginButtonClickHandler}>
         {props.loggedInStatus? <p>Log out</p> : <p>Log in</p>}
     </button>
 );
}

export default TopNavButton;