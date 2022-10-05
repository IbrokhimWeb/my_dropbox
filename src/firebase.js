// Import Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";



const app = firebase.initializeApp({
    apiKey: "AIzaSyBM-rNRhGVBNUAp7m6u_98JegiE7TsqjGE",
    authDomain: "dropbox-61b28.firebaseapp.com",
    projectId: "dropbox-61b28",
    storageBucket: "dropbox-61b28.appspot.com",
    messagingSenderId: "875570119941",
    appId: "1:875570119941:web:c4f1c848eedaaa0133636c"
})


const firestore = app.firestore()


export const database = {
    folders: firestore.collection("folders"),
    files: firestore.collection("files"),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data() }
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}
export const storage = app.storage()
export const auth = app.auth()
export default app
