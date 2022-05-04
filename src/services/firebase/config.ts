import { initializeApp } from "firebase/app";

export const firebaseConfig = {
    apiKey: "AIzaSyCX_jHBaZpXFjpkE2-QUuc1r2IeI4FzsvQ",
    authDomain: "chat-react-websocket.firebaseapp.com",
    projectId: "chat-react-websocket",
    storageBucket: "chat-react-websocket.appspot.com",
    messagingSenderId: "604127653170",
    databaseURL: "https://chat-react-websocket-default-rtdb.europe-west1.firebasedatabase.app/",
    appId: "1:604127653170:web:79af491c37b45b53527b2b"
};

const initFirebase = () => initializeApp(firebaseConfig)

export default initFirebase;
