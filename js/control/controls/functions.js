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

//INSTANCIAR 
const firstnameIT = document.getElementById("firstnameIT");
const secondnameIT = document.getElementById("secondnameIT");
const codeIT = document.getElementById("codeIT");
const registerBtn = document.getElementById("registerBtn");
//const crearhtmlBtn= document.getElementById("crearhtmlBtn");
const contenedorBase=document.getElementById("contenedorBase");
const database = firebase.database();
const storage = window.localStorage; //almacena info temporal 

var imagenSeleccionada="";


//LIESTENER DEL CLICK CON LA FUNCIÓN DIRECTAMENTE ADENTRO
/*crearhtmlBtn.addEventListener("click",function(){

  //CREANDO UN PÁRRAFO <p></p>
  //var parrafo = document.createElement("p");
  //CREAR BOTÓN EN TIEMPO DE EJECUCIÓN 
 // var botonnuevo = document.createElement("button");  //ES LO MISMO QUE ESTO <Button></Button>
  //INNER SE REFIERE AL CONTENIDO DEL BOTÓN <BUTTON> a esto </BUTTON>
  //botonnuevo.innerHTML = "Soy un botón nuevo";
  //LO ANTERIOR SE REFIERE A ESTO <Button> Soy un botón nuevo </Button>
  //botonnuevo.id = "botonnuevo";
  //LO ANTERIOR SE REFIERE A ESTO <Button id="botonnuevo"> Soy un botón nuevo </Button>
 
  //SE REFIERE A ESTO <p><Button id="botonnuevo"> Soy un botón nuevo </Button></p>
  //parrafo.appendChild(botonnuevo);
  //SE METE EL PÁRRAFO EN EL CONTENEDOR BASE
  //contenedorBase.appendChild(parrafo);


  //CREAR UN ITEM DE LA LISTA <li> </li>
  var listitem = document.createElement("li");
  listitem.innerHTML = "Soy un item nuevo";
  listitem.id = "itemnuevo";
  contenedorBase.appendChild(listitem);


});*/

//LIESTENER DEL CLICK CON REFERENCIA A UN MÉTODO
registerBtn.addEventListener("click", registrar);




//MÉTODO
function registrar(){

    let nombre = firstnameIT.value;
    let apellido = secondnameIT.value;
    let code = codeIT.value;
    //para que el id de este sea igual que el de firebase
    let id =database.ref().child("estudiantes").push().key;



    let estudiante = new Estudiante(id, nombre, apellido, code, imagenSeleccionada);
    //let info= firstnameIT.value+ ","+ secondnameIT.value+","+codeIT.value; 
    //alert(info);   
    console.log(estudiante);


    //REGISTRAR ESTUDIANTES EN UNA RAMA 
    database.ref().child("estudiantes").child(id).set(estudiante);
}

//PARA BAJAR LOS DATOS DE FIREBASE
//snapshot es una captura 
/* ESTO TRAÍA TODOS LOS ELEMENTOS DE LA LISTA PERO AL RECARGAR SE LLENABA DE NUEVO TODO
database.ref().child("estudiantes").on("value",function(snapshot){
 snapshot.forEach(estudiante => {
   var estObj = estudiante.val();
   console.log(estObj.nombre); 


   var itemlist = document.createElement("li");
   itemlist.innerHTML = estObj.nombre+" "+ estObj.apellido;
   contenedorBase.appendChild(itemlist);

 });

});*/
 //PARA LEER UN OBJETO
 /*  
database.ref().child("estudiantes").child("-M5j-mAB-5W468sUEHiG").on("value",function(snapshot){

   var estObj = snapshot.val();
   console.log(estObj.nombre); 


   var itemlist = document.createElement("li");
   itemlist.innerHTML = estObj.nombre+" "+ estObj.apellido;
   contenedorBase.appendChild(itemlist);



});*/
//LEER LAS LISTAS OPTIMAMENTE
database.ref().child("estudiantes").on("child_added", function(snapshot){
 
  var estObj = snapshot.val();

  var item = document.createElement("li");
  var img = document.createElement("img");
  img.src = estObj.url;
  img.width=36;
  
  //<a href="" id="id firebase">Enlace</a>
  var enlace = document.createElement("a");
  enlace.innerHTML = estObj.nombre + " "+ estObj.apellido;
  enlace.href= "#";
  enlace.id = estObj.id;

  item.appendChild(img);
  item.appendChild(enlace);
  //item.innerHTML = estObj.nombre;
  contenedorBase.appendChild(item);

  //CREAR EL LISTENER PARA EL ELEMENTO 
  document.getElementById(estObj.id).addEventListener("click", function(event){
    event.preventDefault();//prevenir una acción que está por defecto

    storage.setItem("id", estObj.id);

    //para irnos a una página diferente
     window.location.href="agregarmaterias.html";

  });


});

document.querySelectorAll(".avatar").forEach(
  item =>{
    item.addEventListener("click", function(){
      //console.log(item.src);
      restoreButtons();
      item.width =128;
      imagenSeleccionada= item.src; //para que la variable tome el valor de la url
      console.log(imagenSeleccionada);
    });
  }
);


function restoreButtons(){
  document.querySelectorAll(".avatar").forEach(

    item =>{
      item.width =96;
    }

  );
}