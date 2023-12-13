function promptPersonaje() {
  const respuesta = window.prompt(
    "¿Quién se presenta hoy? (Mario, Luigi, Bowser, Peach, Yoshi, Toad, Toadette, Daisy)"
  );
  console.log(`El usuario eligió que hoy se presente ${respuesta}`);
  return getNombrePersonaje(respuesta);
}

function getNombrePersonaje(valor) {
  //Obtener el nombre completo del personaje
  let nombre;
  switch (valor.toLocaleLowerCase()) {
    case "mario":
      nombre = "Mario";
      break;
    case "luigi":
      nombre = "Luigi";
      break;
    case "bowser":
      nombre = "Bowser Morton Koopa";
      break;
    case "peach":
      nombre = "Princesa Peach Toadstool";
      break;
    case "yoshi":
      nombre = "T. Yoshisaur Munchakoopas";
      break;
    case "toad":
      nombre = "Toad";
      break;
    case "toadette":
      nombre = "Toadette";
      break;
    case "daisy":
      nombre = "Princesa Daisy";
      break;
    default:
      return { esValido: false, nombre: "", nombreCompleto: "(desconocido)" };
  }
  return { esValido: true, nombre: valor, nombreCompleto: nombre };
}

function setSpanText(nombre) {
  //2) Rellenar el <span> (inicialmente vacío) que está ubicado dentro del <h1> de la página con el nombre completo del personaje.
  const span = document.getElementsByTagName("span").item(0);
  span.innerText = nombre;
}

function presentarPersonaje(nombre, visible) {
  const divPersonaje = document.getElementById(nombre.toLocaleLowerCase());
  if (divPersonaje) {
    if (visible) {
      //Mostrar el personaje
      divPersonaje.setAttribute("title", "Presentado");
    } else {
      //Ocultar el personaje
      divPersonaje.removeAttribute("title");
    }
  } else {
    console.log(`No se encontró un elemento DIV con el id ${nombre}`);
  }
}

function ocultarTodos() {
  const ventanitas = document.getElementById("cajas").children;
  for (const ventanita of ventanitas) {
    ventanita.removeAttribute("title");
  }
}

function doPersonajes(ocultarBoton, boton) {
  const { esValido, nombre, nombreCompleto } = promptPersonaje();

  //Se podrá cambiar de personaje, siempre y cuando el usuario haya ingresado un nombre válido, en caso contrario, se mantendrá visible el personaje visible actualmente, si es que hay uno.
  //Para ello, comentar una de las dos líneas siguientes y descomentar la otra
  //setSpanText(nombreCompleto);
  if (esValido) setSpanText(nombreCompleto);

  //3) Solo si anteriormente se eligió un personaje válido de la lista, utilizar el texto ingresado por el usuario...
  if (esValido) {
    ocultarTodos();
    presentarPersonaje(nombre, true);

    if (ocultarBoton) {
      boton.style.visibility = "hidden";
      boton.removeEventListener("click");
    }
  }
}

//Al cargar la página, mostrar el prompt para perdir el nombre de un personaje
//Descomentar para el punto 1
//1) Al iniciar la página pedir con un prompt al usuario que escriba el nombre de un personaje del mundo de Mario Bros.
//doPersonajes(false, undefined);

//4) Verificar por qué solo Mario, Luigi y Bowser se presentan y realizar las correcciones necesarias para que todos lo hagan.
//Las correcciones están realizadas en los respectivos lugares

//6) Programar este botón para que el comportamiento que se definió en el punto 1 del ejercicio se ejecute solo cuando el botón sea presionado.
const botonPresentar = document.getElementById("botonPresentar");
botonPresentar.addEventListener("click", () =>
  //Una vez que se haya presionado y se haya abierto y cerrado el prompt, el botón debe desaparecer.
  //doPersonajes(true, botonPresentar)

  //BONUS 1) Quitar el comportamiento de que el botón creado se oculte luego de ser presionado,
  //ocultando el último personaje que se mostró
  doPersonajes(false, undefined)
);

//BONUS 2) Programar cada recuadro para que al ser presioniado se muestre u oculte el personaje que hay allí, de manera alternada.
const ventanitas = document.getElementById("cajas").children;
for (const ventanita of ventanitas) {
  ventanita.addEventListener("click", () => {
    ocultarTodos();
    const { nombreCompleto } = getNombrePersonaje(ventanita.id);
    setSpanText(nombreCompleto);
    presentarPersonaje(ventanita.id, true);
  });
}
