let clientes = [];
let presupuestos = [];
let dni;
let textoPresupuesto;
var nroPresupuesto = 0;

//declaramos elementos del html
const formularioPresupuesto = document.getElementById("formularioPresupuesto");
const inputNombre = document.getElementById("nombre");
const inputDni = document.getElementById("dni");
const inputTipoPagina = document.getElementsByName("tipoPagina");
const inputDisponeLogo = document.getElementsByName("disponeLogo");
const inputDisponeDiseño = document.getElementsByName("disponeDiseño");
const inputDisponeHosting = document.getElementsByName("disponeHosting");
const inputDisponeDominio = document.getElementsByName("disponeDominio");
const inputDisponeFormaPago = document.getElementsByName("formaPago");
const parrafoPresupuesto = document.getElementById("parrafoPresupuesto");
const muestraPresupuesto = document.getElementById("muestraPresupuesto");

class cliente {
  constructor(dni, apellidoNombre) {
    this.dni = dni;
    this.apellidoNombre = apellidoNombre;
  }
}

class presupuesto {
  constructor(nroPresupuesto, presupuesto, cliente) {
    this.nroPresupuesto = nroPresupuesto;
    this.presupuesto = presupuesto;
    this.cliente = cliente;
  }
}

//menuInicial();

formularioPresupuesto.addEventListener("submit", (event) => {
  //Evento de generar presupuesto
  //Validamos los campos
  if (inputNombre.value == "" || inputDni.value == "") {
    console.log("entre");
    alert("debe completar todos los campos!");
  } else {
    event.preventDefault();
    muestraPresupuesto.innerHTML = "";
    const nuevoH2 = document.createElement("h2"); //creamos un elemento h2 desde js
    nuevoH2.innerHTML = "PRESUPUESTO:"; //Asignamos el tecto
    nuevoH2.className = "h2Presupuesto";
    muestraPresupuesto.append(nuevoH2); //agrego el h2 nuevo dentro del div muestra presupuesto
    //agregamos datos del titular del presupuesto
    escribirDentroDePresupuesto("TITULAR DEL PRESUPUESTO: " + inputNombre.value);
    escribirDentroDePresupuesto("DNI: " + inputDni.value);
    let pres = redactarPresupuesto();
  }
});

function menuInicial() {
  //Consulta que desea realizar si generar un presupuesto o buscar uno ya generado
  let opcion;
  do {
    opcion = prompt(
      "¿Que desea realizar?\n \n 1 - Generar un presupuesto\n 2 - Buscar un presupuesto generado anteriormente por dni\n 3 - Listar todo los presupuestos de la base de datos \n 4 - SALIR \n \n - INGRESE EL NUMERO DE LA OPCION DESEADA: "
    );

    if (opcion == "1") {
      dni = prompt("Ingrese su dni sin puntos ni espacios");
      //si no hay ningun cliente cargado no verifica nada
      if (clientes.length == 0) {
        console.log("Como no hay ningun cliente en el arreglo se procede a cargar cliente");
        cargarCliente();
      } else {
        verificarExistenciaDeCliente(dni);
      }
      generarYalmacenarPresupuesto();
    }

    if (opcion == "2") {
      dni = prompt("Ingrese su dni sin puntos ni espacios");

      const resultado = presupuestos.filter((pres) => pres.cliente.dni === dni);
      console.log(resultado);

      if (resultado.length == 0) {
        alert("no hay presupuestos coincidentes para el dni indicado");
        menuInicial();
      } else {
        alert(
          "por consola se imprimiran los presupuestos elaborados a dicho dni correspondiente al cliente " +
            resultado[0].cliente.apellidoNombre
        );
        console.log(resultado);
        menuInicial();
      }
    }

    if (opcion == "3") {
      if (presupuestos.length == 0) {
        alert("no hay presupuestos en la base de datos");
        menuInicial();
      } else {
        alert("por consola se imprimiran los presupuestos elaborados");
        console.log(presupuestos);
        menuInicial();
      }
    }

    if (opcion == "4") {
      break;
    }

    if (opcion != "1" && opcion != "2" && opcion != "3" && opcion != "4") {
      alert("opcion invalida intente de nuevo");
    }
  } while (opcion != "1" && opcion != "2" && opcion != "3" && opcion != "4");
}

function generarYalmacenarPresupuesto() {
  //Se redacta presupuesto y se obtiene el mismo
  textoPresupuesto = redactarPresupuesto();
  let clientePresupueto = clientes.find((c) => c.dni === dni); //obtengo el cliente con ese dni

  //Creamos un objeto presupuesto y guardamos en el arreglo

  let presupuestoNuevo = new presupuesto(nroPresupuesto, textoPresupuesto, clientePresupueto);

  presupuestos.push(presupuestoNuevo);
  console.log("Se cargo un nuevo presupuesto en la base de datos");
  alert("El presupuesto se ha cargado correctamente, sera dirigido al menu principal");
  menuInicial();
}

function cargarCliente() {
  let nombreYapellido = prompt("Ingrese su nombre y apellido");
  let clienteNuevo = new cliente(dni, nombreYapellido);
  clientes.push(clienteNuevo);
  alert("Ha sido agregado como cliente");
}

function verificarExistenciaDeCliente(dni) {
  var existeCliente = clientes.findIndex((c) => c.dni === dni);
  if (existeCliente == -1) {
    console.log("El cliente no existe en la base de datos");
    cargarCliente();
  } else {
    alert("El cliente ya existe en la base de datos, se procede a realizar presupuesto para dicho cliente");
  }
}

function redactarPresupuesto() {
  let textoPresupuesto = "";
  let total = 0;
  let tipoDePagina;
  let valorPorTipoDePag;
  let disponeLogo = "0";
  let costoLogo = 0;
  let disponeDiseño = "0";
  let costoDiseño = 0;
  let disponeHosting = "0";
  let costoHosting = 0;
  let disponeDominio = "0";
  let costoDominio = 0;
  let formaDePago = "0";
  let importePorFormaDePago = 0;

  // LO COMENTADO ARMA EL PRESUPUESTO CON PROMPT Y ALERT
  //Selecciona tipo de pagina

  /** 
  do {
    tipoDePagina = prompt(
      "¿Que tipo de página desea? \n \n 1 - Landing (1 sola página) \n 2 - Emprendedor Simple (hasta 4 páginas)\n 3 - Ecommerce \n \n - INGRESE EL NUMERO DE LA OPCION DESEADA: "
    );

    if (tipoDePagina != "1" && tipoDePagina != "2" && tipoDePagina != "3") {
      alert("opcion invalida intente de nuevo");
    }
  } while (tipoDePagina != "1" && tipoDePagina != "2" && tipoDePagina != "3");
  */

  //Costo segun tipo de página
  tipoDePagina = inputTipoPagina.value;

  console.log(inputTipoPagina);
  for (i = 0; i < inputTipoPagina.length; i++) {
    if (inputTipoPagina[i].checked) {
      tipoDePagina = inputTipoPagina[i].id;
    }
  }

  switch (tipoDePagina) {
    case "1": //landing
      valorPorTipoDePag = 15000;
      total += valorPorTipoDePag;
      break;

    case "2": //emprendedor simple
      valorPorTipoDePag = 30000;
      total += valorPorTipoDePag;
      break;

    case "3": //ecommerce
      valorPorTipoDePag = 55000;
      total += valorPorTipoDePag;
      break;
  }

  //Consulta si tiene logo y adiciona costo en caso de no tenerlo
  /*
  do {
    disponeLogo = prompt(
      "¿Dispone de un logo? de no tener, se lo incluiremos en la cotización \n \n 1 - Si, tengo logo \n 2 - No, no tengo logo  \n \n - INGRESE EL NUMERO DE LA OPCION DESEADA: "
    );

      if (disponeLogo != "1" && disponeLogo != "2") {
    alert("opcion invalida intente de nuevo");
  }

  } while (disponeLogo != "1" && disponeLogo != "2");*/

  for (i = 0; i < inputDisponeLogo.length; i++) {
    if (inputDisponeLogo[i].checked) {
      disponeLogo = inputDisponeLogo[i].id;
    }
  }

  if (disponeLogo == "2") {
    costoLogo = 10000;
    total += costoLogo;
  }

  // Consulta diseño de la pagina
  /*do {
    disponeDiseño = prompt(
      "¿Dispone de un diseño para la página? de no tener, se lo incluiremos en la cotización \n \n 1 - Si, tengo un diseño \n 2 - No, no tengo un diseño  \n \n - INGRESE EL NUMERO DE LA OPCION DESEADA: "
    );

    
    if (disponeDiseño != "1" && disponeDiseño != "2") {
      alert("opcion invalida intente de nuevo");
    }
  } while (disponeDiseño != "1" && disponeDiseño != "2");*/

  console.log(inputDisponeDiseño);
  for (i = 0; i < inputDisponeDiseño.length; i++) {
    if (inputDisponeDiseño[i].checked) {
      disponeDiseño = inputDisponeDiseño[i].id;
    }
  }

  if (disponeDiseño == "2") {
    costoDiseño = 15000;
    total += costoDiseño;
  }

  //Consulta por hosting

  /*do {
    disponeHosting = prompt(
      "¿Dispone de un hosting para la página? de no tener, se lo incluiremos en la cotización por el periodo de un año\n \n 1 - Si, tengo un Hosting contratado \n 2 - No, no tengo un hosting contratado  \n \n - INGRESE EL NUMERO DE LA OPCION DESEADA: "
    );

   

    if (disponeHosting != "1" && disponeHosting != "2") {
      alert("opcion invalida intente de nuevo");
    }
  } while (disponeHosting != "1" && disponeHosting != "2");*/

  for (i = 0; i < inputDisponeHosting.length; i++) {
    if (inputDisponeHosting[i].checked) {
      disponeHosting = inputDisponeHosting[i].id;
    }
  }

  if (disponeHosting == "2") {
    costoHosting = 25000;
    total += costoHosting;
  }

  //Consulta por dominio

  /*do {
    disponeDominio = prompt(
      "¿Dispone de un dominio para la página? de no tener, se lo incluiremos en la cotización \n \n 1 - Si, tengo un dominio \n 2 - No, no tengo un dominio  \n \n - INGRESE EL NUMERO DE LA OPCION DESEADA: "
    );


    if (disponeDominio != "1" && disponeDominio != "2") {
      alert("opcion invalida intente de nuevo");
    }
  } while (disponeDominio != "1" && disponeDominio != "2");*/

  for (i = 0; i < inputDisponeDominio.length; i++) {
    if (inputDisponeDominio[i].checked) {
      disponeDominio = inputDisponeDominio[i].id;
    }
  }
  if (disponeDominio == "2") {
    costoDominio = 950;
    total += costoDominio;
  }

  //Forma de pago

  /*do {
    formaDePago = prompt(
      "Indique la forma de pago \n \n 1 - Efectivo, (10% de descuento)  \n 2 - Tarjeta,(15% de recargo)  \n \n - INGRESE EL NUMERO DE LA OPCION DESEADA: "
    );

   
    if (formaDePago != "1" && formaDePago != "2") {
      alert("opcion invalida intente de nuevo");
    }
  } while (formaDePago != "1" && formaDePago != "2");*/

  for (i = 0; i < inputDisponeFormaPago.length; i++) {
    if (inputDisponeFormaPago[i].checked) {
      formaDePago = inputDisponeFormaPago[i].id;
    }
  }

  if (formaDePago == "2" || formaDePago == "1") {
    switch (formaDePago) {
      case "1":
        importePorFormaDePago = 0.1 * total;
        total -= importePorFormaDePago;
        break;

      case "2":
        importePorFormaDePago = 0.15 * total;
        total += importePorFormaDePago;
        break;
    }
  }

  // Muestra lo presupestado
  textoPresupuesto =
    "PRESUPUESTO POR DESARROLLO DE PÁGINA WEB:  \n \n - Valor por tipo de página: $ " + valorPorTipoDePag;
  escribirDentroDePresupuesto("- Costo por tipo de pagina elegida: $ " + valorPorTipoDePag);

  if (disponeLogo == "2") {
    textoPresupuesto += "\n - Logo $ " + costoLogo;
    escribirDentroDePresupuesto("- Diseño de logo: $ " + costoLogo);
  }

  if (disponeDiseño == "2") {
    textoPresupuesto += "\n - Diseño de la página $ " + costoDiseño;
    escribirDentroDePresupuesto("- Diseño de la página: $ " + costoDiseño);
  }

  if (disponeHosting == "2") {
    textoPresupuesto += "\n - Hosting (Anual) $ " + costoHosting;
    escribirDentroDePresupuesto("- Contratación del hosting: $ " + costoHosting);
  }

  if (disponeDominio == "2") {
    textoPresupuesto += "\n - Dominio (Anual) $ " + costoDominio;
    escribirDentroDePresupuesto("- Compra de dominio (este valor se debe abonar anualmente): $ " + costoDominio);
  }

  if (formaDePago == "1") {
    textoPresupuesto += "\n - Descuento por pago al contado(10%) - $ " + importePorFormaDePago;
    escribirDentroDePresupuesto("- Descuento por pago al contado(10%) - $ " + importePorFormaDePago);
  } else {
    textoPresupuesto += "\n - Recargo por pago con tarjeta (15%)  $ " + importePorFormaDePago;
    escribirDentroDePresupuesto("- Recargo por pago con tarjeta (15%)  $ " + importePorFormaDePago);
  }

  textoPresupuesto += "\n \n TOTAL PRESUPUESTO: $ " + total;
  escribirTotalDelPresupuesto("TOTAL PRESUPUESTO $ " + total);

  //alert(textoPresupuesto);

  //incrementa en 1 el nro de presupuesto
  nroPresupuesto++;

  return textoPresupuesto;
}

function escribirDentroDePresupuesto(texto) {
  const nuevoParrafo = document.createElement("p"); //creamos un elemento parrafo desde js
  nuevoParrafo.innerHTML = texto; //Asignamos el tecto
  nuevoParrafo.className = "textoPresupuesto";
  muestraPresupuesto.append(nuevoParrafo); //agrego el parrafo nuevo dentro del div muestra presupuesto
}

function escribirTotalDelPresupuesto(texto) {
  const nuevoParrafo = document.createElement("p"); //creamos un elemento parrafo desde js
  nuevoParrafo.innerHTML = texto; //Asignamos el tecto
  nuevoParrafo.className = "totalPresupuesto";
  muestraPresupuesto.append(nuevoParrafo); //agrego el parrafo nuevo dentro del div muestra presupuesto
}
