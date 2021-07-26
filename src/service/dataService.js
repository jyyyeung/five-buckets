import firebase from "../firebase";
import store from "../store";
import "firebase/database";
import "firebase/auth";

class DataService {
  getSavings() {
    if (store && !this.uid && !this.db) {
      this.uid = firebase.auth().currentUser.uid;
      this.db = firebase
        .database()
        .ref()
        .child("savings");
      this.userdb = this.db.child(this.uid);
    }
  }

  setSavings(saving) {
    return this.userdb.set(saving);
  }

  delete(key) {
    return this.db.child(key).remove();
  }
}

export default new DataService();
