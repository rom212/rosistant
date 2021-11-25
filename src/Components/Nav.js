import TopNavButton from '../UI/TopNavButton';
import styles from './Nav.module.css'

function Nav(props) {
  return (
    <nav className={styles.main}>
      <TopNavButton onLoginButtonClickHandler={props.onLoginButtonClickHandler} onLogoutButtonClickHandler={props.onLogoutButtonClickHandler} loggedInStatus={props.loggedInStatus}/>
    </nav>
  );
}

export default Nav;
