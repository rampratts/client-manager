import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

//Reducers
//@todo

const firebaseConfig = {
    apiKey: "AIzaSyA1VI6TpkNvIgHYFaDwea9l_FwbvdDeiv0",
    authDomain: "client-manager-55cbb.firebaseapp.com",
    databaseURL: "https://client-manager-55cbb.firebaseio.com",
    projectId: "client-manager-55cbb",
    storageBucket: "client-manager-55cbb.appspot.com",
    messagingSenderId: "470108169599"
}

//react-redux-firebase config
const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true
}

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);


const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore)

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

//Create initial state
const initialState = {};

//Create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;