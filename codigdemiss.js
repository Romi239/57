/*$(document).ready(function(){
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const auth = firebase.auth();

// Authentication
test
var email = prompt("Correo electrónico: ");
var password = prompt("Contraseña: ");

// Correo electrónico / Contraseña
// Registro
function signUp(email, password) {
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}

// Ingreso
function signIn(email, password) {
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    
    console.log("Ingreso exitoso");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

// Cierre de sesión
function signOut() {
firebase.auth().signOut().then(() => {
  console.log("Sesión cerrada");
  // Sign-out successful.
}).catch((error) => {
});
}

// Revisa si usuario inició sesión
function sessionActive() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Sesión activa");
  } else {
    console.log("No se ha iniciado sesión");
  }
});
}
});*/