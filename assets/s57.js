$(document).ready(function(){

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBhMmVcY2EB_nVT0ZRTZ5Xq8QkGVdSY4rw",
    authDomain: "hola-57.firebaseapp.com",
    projectId: "hola-57",
    storageBucket: "hola-57.appspot.com",
    messagingSenderId: "291447097328",
    appId: "1:291447097328:web:b1de508e733af1a108ff35",
    measurementId: "G-VLQQCSG8E9"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Inicializar Auth de Firebase
  const auth = firebase.auth();

  //Inicializar Auth de Google
  var provider = new firebase.auth.GoogleAuthProvider();

  //inicializar firestore (base de datos)
  const db = firebase.firestore();

  // Rergistrar los usuarios
  // Si no esta registrado, debe hacer click en boton registrar
  $("#btnRegistro").click(function (e) {
    e.preventDefault();
    // Esto hará que el login desaparezca
    $("#login").hide();
    // Esto hara que el formulario de registro aparezca
    $(".registro-usuario").show();
  })
  // Si se completa el formulario de registro y se envia, registra al nuevo usuario y se guarda la sesion
  $("#btnRegistrar").click(function (e) {
    e.preventDefault();
    // Capturamos los datos enviados por el formulario de registro
    // Campo email
    var email = $("#registroEmail").val();
    //Campo Password
    var password = $("#registroPassword").val();

    // Metodo de firebase que permite registro de usarios con email
    auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
        // ocultar formulario de registro
        $(".registro-usuario").hide();
        // limpiar formulario de registro
        $("#registroUsuario").trigger("reset");
      })
      .catch((error) => { // Esto permite capturar el error, se puede trabajar este catch con los codigos de error
        var errorCode = error.code;
        var errorMessage = error.message;
        // Muestro en la consola el codigo de error y el mensaje de error
        console.log(errorCode, errorMessage);
      });
  })

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var Credential = result.Credential;
      var token = Credential.accessToken;
      var user = result.user;
    }).catch((error) => {

    })
  // Acceso de usuarios
  // Ingresar por email
  $("#btnIngresoEmail").click(function (e) {
    e.preventDefault();
    // Mostramos formulario de ingreso por email
    $("#IngresoEmail").show();
    // Ocultamos boton de ingreso por email
    $("#btnIngresoEmail").hide();
  })

  // Si ingresamos por correo y password mostramos formulario de ingreso 
  $("#btnIngresoConEmail").click(function (e) {
    e.preventDefault();
    // Capturamos los datos enviados por el formulario de ingreso
    // Campo email
    var email = $("#ingresoEmail").val();
    // Campo Password
    var password = $("#ingresoPassword").val();

    // Metodo que permite ingreso de usarios con email
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {        
        // limpiar formualrio de ingreso
        $("#IngresoEmail").trigger("reset");
      })
      .catch((error) => {// Esto permite capturar el error, se puede trabajar este catch con los codigos de error
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  })
  //ingresar con google
  $("#btnIngresoGmail").click(function(e){
    e.preventDefault();
    auth.signInWithPopup(provider)
      .then(result => {
        console.log("Ingreso con Google");
      })
      .catch(err => {
        console.log(err);
      })
  })
  // Desconexion de Usuarios
  // Boton LogOut
  $("#logout").click(function (e) {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("Log Out");
    })
  })

  // Ver si sesion esta activa
  auth.onAuthStateChanged((user) => {
    if (user) {
      // Si usuario esta conectado
      // ocultamos el login
      $("#login").hide();
      // ocultamos el formulariod e registro
      $(".registro-usuario").hide();
      // mostramos el contenido
      $("#contenidoWeb").show();
    } else {
      // Si usuario esta desconectado
      // Se oculta formulario de registro
      $(".registro-usuario").hide();
      // Se oculta formulario de ingreso
      $("#IngresoEmail").hide();
      // Se muestra el boton de ingreso por email
      $("#btnIngresoEmail").show();
      // Se oculta contenido de la página
      $("#contenidoWeb").hide();
      // Se muestra el login
      $("#login").show()
    }
  });

  //boton enviar  formulario pais 
  $("#btnAddCountry").click(function (e) {
    e.preventDefault();
    // Capturo los datos enviados desde el formulario con id "registroPaises"
    var nombre = $("#nameCountry").val();
    var capital = $("#capitalCountry").val();
    var poblacion = $("#populationCountry").val();
    var idioma = $("#languagueCountry").val();
    if (nombre.length > 0 && capital.length > 0 && poblacion.length > 0 && idioma.length > 0) {
      // Metodo de escritura para añadir elementos a la coleccion "paises", 
      // si la coleccion no existe, la crea implicitamente
      db.collection("paises").add({
        nombre: nombre,
        capital: capital,
        poblacion: poblacion,
        idioma: idioma,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          // Reseteo el formulario de registro de paises
          $("#registroPaises").trigger("reset");
          // Invoco al metodo obtienePaises()
          obtienePaises();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
    else {
      alert('Favor completar todos los campos');
    }
  });

  // Metodo que sirve para mostrar los países en la tabla
  function setupPaises(data) {
    $("#dataPaises").empty();
    if (data.length > 0) {
      let html = '';
      data.forEach(doc => {
        const country = doc.data();
        const tr = `
          <tr>
            <td>${country.nombre}</td>
            <td>${country.capital}</td>
            <td>${country.poblacion}</td>
            <td>${country.idioma}</td>
          <tr>
        `;
        html += tr;
      });
      $("#dataPaises").append(html);
    } else {
      let html = '';
      let tr = `
        <tr>
          <td class="text-center"colspan="4">No existen datos, favor ingresar datos.</td>
        <tr>
      `;
      html += tr;
      $("#dataPaises").append(html);
    }
  };

  //metodo que permite obtener los datos de la BD
  function obtienePaises(){
    db.collection("paises").get().then((snapshot) => {
      setupPaises(snapshot.docs);
    })
  }
});