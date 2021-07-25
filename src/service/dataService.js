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
  async getSavings() {
    if (store && !this.uid && !this.db) {
      this.uid = firebase.auth().currentUser.uid;
      this.db = firebase
        .database()
        .ref()
        .child("savings");
      this.userdb = this.db.child(this.uid);
    }

    return await this.userdb
      .get()
      .then((data) => {
        const savings = data.val()
          ? data.val()
          : this.setSavings(defaultSavings);

        store.commit("updateStoreSavings", savings);
        return savings;
      })
      .then((result) => {
        return result;
      });
  }

  setSavings(saving) {
    return this.userdb.set(saving);
  }

  delete(key) {
    return this.db.child(key).remove();
  }
}

export default new DataService();
