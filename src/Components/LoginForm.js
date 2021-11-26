import { useState } from "react";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import styles from "./LoginForm.module.css";

function LoginForm(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  

  function authenticate() {
    let authenticationData = {
      Username: userName,
      Password: password,
    };

    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );

    let poolData = {
      UserPoolId: "us-east-1_JJf0k4n61", // Your user pool id here
      ClientId: "5mn7h62f4knvejrosfk6jbieua", // Your client id here
    };

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    let userData = {
      Username: userName,
      Pool: userPool,
    };

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    props.updateCogUser(cognitoUser);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        let accessToken = result.getAccessToken().getJwtToken();
        localStorage.setItem("rosistant_token", accessToken);
        props.onlogIn();
      },
      onFailure: function (err) {
        console.log(err);
        alert(err);
        setPassword("");
      },
    });
  }

  function onUserNameChange(e) {
    setUserName(e.target.value);
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    authenticate();
  }

  return (
    <div className={styles.main}>
      <form onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="uname">
            <b>Username: </b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
            onChange={onUserNameChange}
            value={userName}
            className={styles.userInput}
          ></input>
        </div>
        <div>
          <label htmlFor="psw">
            <b>Password: </b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            onChange={onPasswordChange}
            value={password}
            className={styles.userInput}
          ></input>
        </div>

        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
