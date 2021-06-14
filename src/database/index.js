import firebase from 'firebase';

try{
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBU8vLiyj9qJTgwF7WgxHi7DM6UXKMESfA",
    authDomain: "image-rwanda-ca308.firebaseapp.com",
    databaseURL: "https://image-rwanda-ca308-default-rtdb.firebaseio.com",
    projectId: "image-rwanda-ca308",
    storageBucket: "image-rwanda-ca308.appspot.com",
    messagingSenderId: "329384204179",
    appId: "1:329384204179:web:2041d03142b56bb4b6ba66",
    measurementId: "G-1GKHEY20J0",
  };
  firebase.initializeApp(firebaseConfig);
}  catch (error) {
    // console.log(error);
    console.log({error: "Failed To Connect To Database!"})

}

const firestore = firebase.firestore();
export var firebaseRef = firebase.database().ref();
export default firebase;
export const User = firestore.collection('Users');
export const Subscribes = firestore.collection("Subscribes");
export const Images = firestore.collection('Images')