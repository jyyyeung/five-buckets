import firebase from "../firebase";
import store from "../store";
import "firebase/database";
import "firebase/auth";

const defaultSavings = {
  necessity: 0,
  emergency: 0,
  fun: 0,
  learning: 0,
  investment: 0,
};

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
    let savings = this.userdb.get().then((data) => {
      let savingsData = data.val();
      if (!data.val()) {
        savingsData = this.setSavings(defaultSavings);
      }
      return savingsData;
    });
    console.log(savings);
    return savings;
  }

  setSavings(saving) {
    return this.userdb.set(saving);
  }

  delete(key) {
    return this.db.child(key).remove();
  }
}

export default new DataService();
