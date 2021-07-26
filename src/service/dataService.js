import firebase from "../firebase";
import store from "../store";
import "firebase/database";
import "firebase/auth";

// const getData = (ref) => {
//   return new Promise((resolve, reject) => {
//     const onError = (error) => reject(error);
//     const onData = (snap) => resolve(snap.val());
//     ref.on("value", onData, onError);
//     console.log("ref.on");
//   });
// };
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
    // getData(this.userdb)
    //   .then((data) => {
    //     console.log("getData ref.val()", data);
    //     const savings = data
    //       ? data
    //       : this.setSavings(store.state.defaultSavings);
    //     store.commit("updateStoreSavings", savings);
    //   })
    //   .catch((error) => {
    //     console.error("getData", error);
    //   });
  }

  setSavings(saving) {
    return this.userdb.set(saving);
  }

  delete(key) {
    return this.db.child(key).remove();
  }
}

export default new DataService();
