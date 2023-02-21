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
const bodyTabla = document.getElementById("bodyTabla");

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
    muestraPresupuesto.innerHTML = ""; //reiniciamos este div cada vez que tocamos el boton
    const nuevoH2 = document.createElement("h2"); //creamos un elemento h2 desde js
    nuevoH2.innerHTML = "PRESUPUESTO:"; //Asignamos el tecto
    nuevoH2.className = "h2Presupuesto";
    muestraPresupuesto.append(nuevoH2); //agrego el h2 nuevo dentro del div muestra presupuesto
    //agregamos datos del titular del presupuesto
    escribirDentroDePresupuesto("TITULAR DEL PRESUPUESTO: " + inputNombre.value);
    escribirDentroDePresupuesto("DNI: " + inputDni.value);
    //let pres = redactarPresupuesto();
    generarYalmacenarPresupuesto();
    renderizarPresupuestos(presupuestos);

    console.log(muestraPresupuesto.innerHTML);
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
  verificarExistenciaDeCliente(inputDni.value);
  textoPresupuesto = redactarPresupuesto();
  let clientePresupueto = clientes.find((c) => c.dni === inputDni.value); //obtengo el cliente con ese dni

  //Creamos un objeto presupuesto y guardamos en el arreglo

  let presupuestoNuevo = new presupuesto(nroPresupuesto, textoPresupuesto, clientePresupueto);

  presupuestos.push(presupuestoNuevo);
  console.log("Se cargo un nuevo presupuesto en la base de datos");
}

function cargarCliente() {
  let clienteNuevo = new cliente(inputDni.value, inputNombre.value);
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

  for (i = 0; i < inputDisponeLogo.length; i++) {
    if (inputDisponeLogo[i].checked) {
      disponeLogo = inputDisponeLogo[i].id;
    }
  }

  if (disponeLogo == "2") {
    costoLogo = 10000;
    total += costoLogo;
  }

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

  for (i = 0; i < inputDisponeHosting.length; i++) {
    if (inputDisponeHosting[i].checked) {
      disponeHosting = inputDisponeHosting[i].id;
    }
  }

  if (disponeHosting == "2") {
    costoHosting = 25000;
    total += costoHosting;
  }

  for (i = 0; i < inputDisponeDominio.length; i++) {
    if (inputDisponeDominio[i].checked) {
      disponeDominio = inputDisponeDominio[i].id;
    }
  }
  if (disponeDominio == "2") {
    costoDominio = 950;
    total += costoDominio;
  }

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
  escribirDentroDePresupuesto("N° DE PRESUPUESTO: " + nroPresupuesto);

  textoPresupuesto = escribirDentroDePresupuesto("- Costo por tipo de pagina elegida: $ " + valorPorTipoDePag);

  if (disponeLogo == "2") {
    escribirDentroDePresupuesto("- Diseño de logo: $ " + costoLogo);
  }

  if (disponeDiseño == "2") {
    escribirDentroDePresupuesto("- Diseño de la página: $ " + costoDiseño);
  }

  if (disponeHosting == "2") {
    escribirDentroDePresupuesto("- Contratación del hosting: $ " + costoHosting);
  }

  if (disponeDominio == "2") {
    escribirDentroDePresupuesto("- Compra de dominio (este valor se debe abonar anualmente): $ " + costoDominio);
  }

  if (formaDePago == "1") {
    escribirDentroDePresupuesto("- Descuento por pago al contado(10%) - $ " + importePorFormaDePago);
  } else {
    escribirDentroDePresupuesto("- Recargo por pago con tarjeta (15%)  $ " + importePorFormaDePago);
  }

  escribirTotalDelPresupuesto("TOTAL PRESUPUESTO $ " + total);

  //alert(textoPresupuesto);

  //incrementa en 1 el nro de presupuesto
  nroPresupuesto++;

  return muestraPresupuesto.innerHTML;
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

function renderizarPresupuestos(presupuestos) {
  bodyTabla.innerHTML = ""; //limpiamos la tabla antes de cada renderización

  presupuestos.forEach((presupuesto) => {
    //recorremos array de presupuestos
    //creamos fila
    const tr = document.createElement("tr");

    //creamos cada uno de las columnas para esa fila y le pasamos los valores
    const tdNroPresupuesto = document.createElement("td");
    //pasamos valor al td
    tdNroPresupuesto.innerHTML = presupuesto.nroPresupuesto;

    const tdDni = document.createElement("td");
    tdDni.innerHTML = presupuesto.cliente.dni;

    const tdNombreApellido = document.createElement("td");
    tdNombreApellido.innerHTML = presupuesto.cliente.apellidoNombre;

    //agregos los td creados al tr creado
    tr.append(tdNroPresupuesto);
    tr.append(tdDni);
    tr.append(tdNombreApellido);

    //Creamos botones de acciones y agregamos al tr
    const tdMostrar = document.createElement("td");
    const botonMostrarPresupuesto = document.createElement("button");
    botonMostrarPresupuesto.innerText = "Mostrar";

    //Agregamos evento al boton creado
    botonMostrarPresupuesto.addEventListener("click", () => {
      //Obtengo indice de donde esta este presupuesto
      const inidiceElementoAmostrar = presupuestos.findIndex((presupuestoAmostrar) => {
        return presupuestoAmostrar.nroPresupuesto === presupuesto.nroPresupuesto;
      });

      //mostramos el resultado

      muestraPresupuesto.innerHTML = presupuestos[inidiceElementoAmostrar].presupuesto;
    });

    //Agregamos el boton a la fila
    tdMostrar.append(botonMostrarPresupuesto);
    tr.append(tdMostrar);

    //HACEMOS LOS MISMO PARA EL BONTON ELIMINAR

    const tdEliminar = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.innerText = "Eliminar";

    //Agregamos evento al boton creado
    botonEliminar.addEventListener("click", () => {
      //Obtengo indice de donde esta este presupuesto
      const inidiceElementoAeliminar = presupuestos.findIndex((presupuestoAeliminar) => {
        return presupuestoAeliminar.nroPresupuesto === presupuesto.nroPresupuesto;
      });

      //borramos el presuesto del arreglo
      presupuestos.splice(inidiceElementoAeliminar, 1);
      renderizarPresupuestos(presupuestos);
    });

    tdEliminar.append(botonEliminar);
    tr.append(tdEliminar);

    //agregamos tr al tbody

    bodyTabla.append(tr);
  });
}
