var firebaseConfig = {
    apiKey: "AIzaSyAnUIYLwnQ-vpLzB3bv2x1F_H9N4VfHSLw",
    authDomain: "ecosistemas-c2891.firebaseapp.com",
    databaseURL: "https://ecosistemas-c2891.firebaseio.com",
    projectId: "ecosistemas-c2891",
    storageBucket: "ecosistemas-c2891.appspot.com",
    messagingSenderId: "1006540324412",
    appId: "1:1006540324412:web:878fc0f97f5a999a77cd39",
    measurementId: "G-QWB5VK7W3V"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const estudiantenombre = document.getElementById("estudiantenombre");
const nombreIT = document.getElementById("nombreIT");
const profesorIT = document.getElementById("profesorIT");
const registrarBtn = document.getElementById("registrarBtn");
const materiasContainer = document.getElementById("materiasContainer");
const database = firebase.database();
const storage = window.localStorage;

//RECUPERACIÓN DE DATOS
const idEst= storage.getItem("id");

//LEER EL OBJETO
database.ref().child("estudiantes").child(idEst).on("value",function(snapshot){

    var estObj = snapshot.val();
    console.log(estObj.nombre); 
 
    estudiantenombre.innerHTML= "Perfil de "+estObj.nombre +" "+ estObj.apellido;
 
 });



 registrarBtn.addEventListener("click",function(){

  //cuál rama va a contener las materias
  var id= database.ref().child("estudiantes").child(idEst).child("materias").push().key;
  var nombre= nombreIT.value;
  var profesor= profesorIT.value;

  var materia = new Materia(id,nombre,profesor);
  database.ref().child("estudiantes").child(idEst).child("materias").child(id).set(materia);

 });

 //LEER LISTA DE LAS MATERIAS DEL ESTUDIANTE
 database.ref().child("estudiantes").child(idEst).child("materias").on("child_added",function(snapshot){

  var materia = snapshot.val();
  var item= document.createElement("p");
  item.innerHTML = materia.nombre+"("+materia.profesor+")";


  materiasContainer.appendChild(item);

 });

