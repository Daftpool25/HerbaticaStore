import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

    //Firebase Config
    const firebaseConfig = {
        apiKey: "AIzaSyBxQrBuZ7WbqlMdIBmkKZthpk4Tqeoo8XI",
        authDomain: "herbatica-e9977.firebaseapp.com",
        projectId: "herbatica-e9977",
        storageBucket: "herbatica-e9977.appspot.com",
        messagingSenderId: "804069880226",
        appId: "1:804069880226:web:f14f067bbd3811e2d2c2fb"
    };

  //Initialize
    export const app = initializeApp(firebaseConfig);
    export const storage = getStorage(app);
