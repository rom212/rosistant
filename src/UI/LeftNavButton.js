import styles from './LeftNavButton.module.css';

function LeftNavButton(props) {

 function onButtonClick(){
    if(props.loggedIn===false){
     
        props.setShowPleaseLogin(true);
    } else {
        props.setRightNavContent(props.children);
    }
 }

 return(
     <button className={styles.button} onClick={onButtonClick}>
         {props.children}
     </button>
 );
}

export default LeftNavButton;