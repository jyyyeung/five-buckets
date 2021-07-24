import firebase from "../firebase";

const provider = new firebase.auth.GoogleAuthProvider();
import "firebase/auth";
// provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
import store from "../store";
export const login = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      store.commit("login", { token, user });
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      return errorCode, errorMessage, email, credential;
    });
};

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      store.commit("logout");
    })
    .catch((error) => {
      return error;
      // An error happened.
    });
};
