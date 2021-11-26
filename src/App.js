import { React, useState } from "react";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

import LeftNav from "./Components/LeftNav";
import RightNav from "./Components/RightNav";
import styles from "./App.module.css";
import Nav from "./Components/Nav";
import LoginForm from "./Components/LoginForm";
import PleaseLogIn from "./Components/PleaseLogIn";
import Meetings from "./Components/Meetings";
import Success from "./Components/Success";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPleaseLogin, setShowPleaseLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cogUser, setCogUser] = useState(undefined);
  const [rightNavContent, setRightNavContent] = useState(undefined);

  function cancelPleaseLogIn() {
    setShowPleaseLogin(false);
  }
 
  function cancelShowSuccess() {
   
    setShowSuccess(false);
    setRightNavContent(undefined);
  }

  function updateCogUser(u) {
    setCogUser(u);
  }

  function onLoginButtonClickHandler() {
    setShowLogin(true);
  }

  function onCancelLogin() {
    setShowLogin(false);
  }

  function onLogin() {
    setLoggedIn(true);
    setShowLogin(false);
  }

  function ShowSuccess(){
    setShowSuccess(true);
  }

  function onLogoutButtonClickHandler() {
    let poolData = {
      UserPoolId: "us-east-1_JJf0k4n61", // Your user pool id here
      ClientId: "5mn7h62f4knvejrosfk6jbieua", // Your client id here
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    let userName = cogUser.username;
    let userData = {
      Username: userName,
      Pool: userPool,
    };
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.signOut();
    setLoggedIn(false);
    setShowLogin(false);
    setRightNavContent(undefined);
  }

  return (
    <div>
      {showLogin ? (
        <div>
          <div className={styles.backdrop} onClick={onCancelLogin} />
          <LoginForm onlogIn={onLogin} updateCogUser={updateCogUser} />
        </div>
      ) : null}

      {showPleaseLogin ? (
        <div>
          <div className={styles.backdrop} onClick={cancelPleaseLogIn} />
          <PleaseLogIn
            onlogIn={onLogin}
            updateCogUser={updateCogUser}
            cancelPleaseLogIn={cancelPleaseLogIn}
          />
        </div>
      ) : null}

      {showSuccess ? (
        <div>
          <div className={styles.backdrop} onClick={cancelShowSuccess} />
          <Success
            cancelShowSuccess={cancelShowSuccess}
          />
        </div>
      ) : null}

      <div className={styles}>
        <Nav
          onLogoutButtonClickHandler={onLogoutButtonClickHandler}
          loggedInStatus={loggedIn}
          onLoginButtonClickHandler={onLoginButtonClickHandler}
          cogUser={cogUser}
        />
        <div className={styles.main}>
          <LeftNav
            loggedIn={loggedIn}
            setShowPleaseLogin={setShowPleaseLogin}
            cancelPleaseLogIn={cancelPleaseLogIn}
            setRightNavContent={setRightNavContent}
  
          />

          {(() => {
            switch (rightNavContent) {
              case undefined:
                return <RightNav />;
              case "Meetings":
                return <Meetings ShowSuccess={ShowSuccess}/>;
              case "Interviews":
                return "ITW";
              default:
                return <RightNav />;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default App;
