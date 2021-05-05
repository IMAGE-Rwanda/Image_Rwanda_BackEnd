import firebase from 'firebase';

try{
    var firebaseConfig = {
        apiKey: "AIzaSyDWvNVJSgIwCuqeNIebCcf3KcZRPIxMESM",
        authDomain: "image-rwanda-platform.firebaseapp.com",
        projectId: "image-rwanda-platform",
        storageBucket: "image-rwanda-platform.appspot.com",
        messagingSenderId: "715065686737",
        appId: "1:715065686737:web:ed6d9ac1b01385c13ea3f0",
        measurementId: "G-NKKPT1JVYM"
      };
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
}  catch (error) {
    console.log({error: "Failed To Connect To Database!"})

}

const firestore = firebase.firestore();
export var firebaseRef = firebase.database().ref();
export default firebase;


export const User = firestore.collection('Users');