// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4KabgOJDAysjjae50YWz2wq73x1qXuoY",
    authDomain: "thread-app-9283d.firebaseapp.com",
    databaseURL: "https://thread-app-9283d-default-rtdb.firebaseio.com",
    projectId: "thread-app-9283d",
    storageBucket: "thread-app-9283d.appspot.com",
    messagingSenderId: "1088213115429",
    appId: "1:1088213115429:web:71ca33175d6cae5379d5cc",
    measurementId: "G-N0HFZW1L6K"
  };
  // Initialize Firebase with your config
firebase.initializeApp(firebaseConfig);

// Sign Up function
function signup() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User creation successful, redirect to a new page
      
      console.log("User signed up successfully!");
      window.location.href = "post.html"; // Change to the actual welcome page URL
    })
   
    .catch((error) => {
      console.error(error.message);
    });
}
