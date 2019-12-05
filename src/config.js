import Firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCNbMoaJ0j2jJjvBbYOm9wvli20XCzVpS8",
    authDomain: "firechat-46c34.firebaseapp.com",
    databaseURL: "https://firechat-46c34.firebaseio.com",
    projectId: "firechat-46c34",
    storageBucket: "firechat-46c34.appspot.com",
    messagingSenderId: "966664932646",
    appId: "1:966664932646:web:c8487254617133d58f45e7",
    measurementId: "G-CRFNEGBSK8"
  };

const app = Firebase.initializeApp(config);

export const db = app.database();