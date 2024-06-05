"use strict"


// VARIABILI PER LA GESTIONE INFO.HTML -> NUOVETECNOLOGIE
let expanded_tecnologie = false;
let _tecno_campo1;
let _tecno_campo2;

// VARIABILI PER LE USERS OPTIONS
let userOptions; //CARICARE IN DINAMICO LE OPTIONS
let logged = false;

/* RIFERIMENTI */
let _btnAccedi;
let _btnRegistrati;
let _btnExit;
let _btnCloseProfile;
let _btnAcquista;
let _txtRobot;
//let _btnSIalPRO;
/* RIFERIMENTI */

let tempBuild;
let costoTotale = 0;
var computer = 0;

//VETTORE UTENTI
let utenti = new Array(1);

let nomeAcquisti = new Array(0);
let prezzoAcquisti = new Array(0);

//VETTORE COMPONENTI
var componenti;

var preAssemblati = new Array(0);

window.onload = function() {
  console.log("Pagina caricata");
  init();

  inizializzaComponenti();

  if (document.getElementsByTagName("title")[0].innerHTML == "TechBuilder:&gt;BUILDER") {
    //viewModal("EulaModal");
    caricaComponenti();
  }

  if (JSON.parse(sessionStorage.getItem("utenti")) != undefined)
    utenti = JSON.parse(sessionStorage.getItem("utenti"));
  if (sessionStorage.getItem("nAccount") != undefined) {
    removeUserOptions();
    addUserOptions(true, utenti[sessionStorage.getItem("nAccount")].nome);
    logged = true;
  }

  if (document.getElementsByTagName("title")[0].innerHTML == "TechBuilder:&gt;CARRELLO") {
    if (sessionStorage.length > 1) {
      _btnAcquista.disabled = false;
      nomeAcquisti = sessionStorage.getItem("nomeBuilds").split(",");
      prezzoAcquisti = sessionStorage.getItem("prezzoBuilds").split(",");
      visualizzaAcquisti();
    }
  }



}

function visualizzaAcquisti() {

  let dAcquisti = document.getElementById("acquisti");
  for (let i = 0; i < nomeAcquisti.length; i++) {
    let row = document.createElement("div");
    row.className = "row";
    row.id = "nAcquisto" + i;
    dAcquisti.appendChild(row);

    let col = document.createElement("div");
    col.className = "col-sm-8 text-center bg-white btn-close";
    col.onclick = () => {
      rimuovi(i);
    }
    col.style = "border: 1px solid white";
    row.appendChild(col);

    let col1 = document.createElement("div");
    col1.className = "col-sm-8 text-center";
    col1.innerHTML = nomeAcquisti[i];
    col1.style = "border: 1px solid white";
    row.appendChild(col1);

    let col2 = document.createElement("div");
    col2.className = "col-sm-3 text-center";
    col2.innerHTML = prezzoAcquisti[i] + ".00€";
    col2.style = "border: 1px solid white";
    row.appendChild(col2);
  }
}

function rimuovi(pos) {
  document.getElementById("nAcquisto" + pos).remove();
  for (let i = 0; i < nomeAcquisti.length - 1; i++) {
    nomeAcquisti[i] = nomeAcquisti[i + 1];
    prezzoAcquisti[i] = prezzoAcquisti[i + 1];
  }
  nomeAcquisti.pop();
  prezzoAcquisti.pop();

  if (nomeAcquisti.length != 0) {
    sessionStorage.setItem("nomeBuilds", nomeAcquisti);
    sessionStorage.setItem("prezzoBuilds", prezzoAcquisti);
  }
  else {
    sessionStorage.removeItem("nomeBuilds");
    sessionStorage.removeItem("prezzoBuilds");
    _btnAcquista.disabled = true;
  }
}

function inizializzaComponenti() {

  componenti = new Array(13);

  componenti[0] = {
    "tipo": "Processore",
    "nome": "Intel Core i7-10700K",
    "prezzo": "350",
    //"img":"https://www.notebookcheck.it/fileadmin/Notebooks/News/_nc3/Intel_Core_i7-10700K.jpg"
  }

  componenti[1] = {
    "tipo": "SchedaMadre",
    "nome": "ASUS ROG Strix Z490-E Gaming",
    "prezzo": "170",
  }

  componenti[2] = {
    "tipo": "RAM",
    "nome": "Corsair Vengeance RGB PRO 16GB (2x8GB) DDR4 3200MHz",
    "prezzo": "80",
  }

  componenti[3] = {
    "tipo": "ROM",
    "nome": "Samsung 970 EVO Plus 500GB",
    "prezzo": "80",
  }

  componenti[4] = {
    "tipo": "Alimentatore",
    "nome": "Corsair RM750x 750W 80+ Gold",
    "prezzo": "120",
  }

  componenti[5] = {
    "tipo": "CASE",
    "nome": "Corsair iCUE 220T RGB Airflow",
    "prezzo": "80",
  }

  componenti[6] = {
    "tipo": "Processore",
    "nome": "Intel Core i9-10900K",
    "prezzo": "500",
  }

  componenti[7] = {
    "tipo": "CASE",
    "nome": "Corsair iCUE 4000X RGB",
    "prezzo": "100",
  }

  componenti[8] = {
    "tipo": "RAM",
    "nome": "Corsair Vengeance RGB PRO 32GB (2x16GB) DDR4 3200MHz",
    "prezzo": "130",
  }

  componenti[9] = {
    "tipo": "ROM",
    "nome": "Samsung 970 EVO Plus 1TB",
    "prezzo": "180",
  }

  componenti[10] = {
    "tipo": "Alimentatore",
    "nome": "Corsair RM850x 850W 80+ Gold",
    "prezzo": "200",
  }

  componenti[11] = {
    "tipo": "Processore",
    "nome": "Ryzen 5 5600X",
    "prezzo": "300",
  }

  componenti[12] = {
    "tipo": "Processore",
    "nome": "Ryzen 7 5800X",
    "prezzo": "400",
  }

  componenti[13] = {
    "tipo": "Processore",
    "nome": "Ryzen 7 5700X",
    "prezzo": "350",
  }

  componenti[14] = {
    "tipo": "SchedaMadre",
    "nome": "MSI MPG B550 GAMING PLUS",
    "prezzo": "150",
  }

  componenti[15] = {
    "tipo": "Case",
    "nome": "AZZA Apollo 430",
    "prezzo": "50",
  }

  componenti[16] = {
    "tipo": "RAM",
    "nome": "16GB DDR4-3600 ! Kingston FURY Beast RGB",
    "prezzo": "60",
  }

  componenti[17] = {
    "tipo": "ROM",
    "nome": "1TB ! Crucial P3",
    "prezzo": "100",
  }

  componenti[18] = {
    "tipo": "Alimentatore",
    "nome": "AZZA PSAZ 650 Watt 80+ PLUS BRONZE",
    "prezzo": "80",
  }

  componenti[19] = {
    "tipo": "Processore",
    "nome": "Intel Core i7-12700F",
    "prezzo": "345",
  }

  componenti[20] = {
    "tipo": "SchedaMadre",
    "nome": "Gigabyte B760M DS3H DDR4",
    "prezzo": "100",
  }

  componenti[21] = {
    "tipo": "RAM",
    "nome": "32GB DDR4-3600 ! Kingston FURY Beast RGB",
    "prezzo": "80",
  }

  componenti[22] = {
    "tipo": "ROM",
    "nome": "512GB ! Crucial P3",
    "prezzo": "80",
  }

  componenti[23] = {
    "tipo": "Alimentatore",
    "nome": "FSP Hydro K Pro 750 Watt 80 PLUS BRONZE",
    "prezzo": "80",
  }

  componenti[24] = {
    "tipo": "Case",
    "nome": "Megaport Nero RGB",
    "prezzo": "60",
  }

  componenti[25] = {
    "tipo": "Processore",
    "nome": "Intel Core i9-11900K",
    "prezzo": "600",
  }

  componenti[26] = {
    "tipo": "SchedaMadre",
    "nome": "Asus Prime Z590-P",
    "prezzo": "190",
  }

  componenti[27] = {
    "tipo": "Processore",
    "nome": "AMD Ryzen 5 5600G",
    "prezzo": "250",
  }

  componenti[28] = {
    "tipo": "SchedaMadre",
    "nome": "ASUS TUF GAMING B550M-PLUS",
    "prezzo": "150",
  }

  componenti[29] = {
    "tipo": "RAM",
    "nome": "PCS PRO 3200 MHz 16 GB",
    "prezzo": "60",
  }

  componenti[30] = {
    "tipo": "ROM",
    "nome": "250GB KINGSTON NV2 NVMe PCle SSD",
    "prezzo": "50",
  }

  componenti[31] = {
    "tipo": "ROM",
    "nome": "SEAGATE BARACUDA HDD 1 TB",
    "prezzo": "40",
  }

  componenti[32] = {
    "tipo": "Case",
    "nome": "Corsair 4000D Airflow",
    "prezzo": "80",
  }



  preAssemblati[0] = {
    "nome": "PC da gaming AMD Ryzen 7 Tempest",
    "descrizione": "Preparati per battaglie epiche, gare elettrizzanti ed esplorazioni avventurose dell'infinito universo di gioco! Con Tempest sei perfettamente equipaggiato per sperimentare un gameplay super fluido nei tuoi giochi preferiti.",
    "componenti": [
      componenti[13],
      componenti[14],
      componenti[15],
      componenti[16],
      componenti[17],
      componenti[18]
    ]
  }

  preAssemblati[1] = {
    "nome": "PC da gaming Intel i7 NOVA",
    "descrizione": "Nova rossa è il termine usato per descrivere la fusione di due stelle in un sistema stellare binario. Qui, ovviamente, la potente CPU multi-core e la popolare scheda grafica di NVIDIA sono le nostre stelle nel sistema dei componenti!",
    "componenti": [
      componenti[19],
      componenti[20],
      componenti[21],
      componenti[22],
      componenti[23],
      componenti[24]
    ]
  }

  preAssemblati[2] = {
    "nome": "DIMENSION MASTER",
    "descrizione": "Il PC da gaming Dimension Master è il nostro PC da gaming più potente. Con la sua CPU Intel Core i9-11900K e la scheda grafica GeForce RTX 3080 Ti, questo PC è perfetto per i giocatori più esigenti.",
    "componenti": [
      componenti[27],
      componenti[28],
      componenti[29],
      componenti[30],
      componenti[23],
      componenti[24]
    ]
  }

  preAssemblati[3] = {
    "nome": "BESTSELLER",
    "descrizione": "Questo PC ALL-IN-ONE è perfetto per il gaming e per il lavoro. Grazie al suo processore Intel e alla sua scheda grafica integrata, questo PC è perfetto per i giocatori casual e per i professionisti che lavorano da casa.",
    "componenti": [
      componenti[6],
      componenti[1],
      componenti[21],
      componenti[31],
      componenti[10],
      componenti[32]
    ]
  }
}

function viewModal(idModal) {
  document.getElementById("btn" + idModal).click();
}

function caricaMenu(tipo) {

  document.getElementById("divComponente").removeChild(document.getElementById("divComponente").children[0]);
  let modalSection = document.createElement("p");
  modalSection.id = "componenti";
  document.getElementById("divComponente").appendChild(modalSection);

  let title = document.getElementById("titoloComponente");
  title.innerHTML = tipo;

  for (let i = 0; i < componenti.length; i++) {
    if (componenti[i].tipo == tipo) {
      let nome = document.createElement("p");
      nome.innerHTML = componenti[i].nome;
      nome.classList.add("fw-bold", "d-inline", "m-5");

      let prezzo = document.createElement("p");
      prezzo.innerHTML = componenti[i].prezzo + ".00€";

      let btn = document.createElement("button");
      btn.className = "btn btn-dark mt-2 w-100";
      btn.addEventListener("click", function() {
        tempBuild = 1;
        costoTotale -= parseInt(document.getElementById("prezzo" + tipo).children[0].innerHTML.substring(0, document.getElementById("prezzo" + tipo).children[0].innerHTML.length - 4));
        computer -= parseInt(document.getElementById("prezzo" + tipo).children[0].innerHTML.substring(0, document.getElementById("prezzo" + tipo).children[0].innerHTML.length - 4));

        document.getElementById("nome" + tipo).children[0].innerHTML = componenti[i].nome;
        document.getElementById("prezzo" + tipo).children[0].innerHTML = componenti[i].prezzo + ".00€";

        computer += parseInt(componenti[i].prezzo);

        costoTotale += parseInt(componenti[i].prezzo);
        document.getElementById("Totale").innerHTML = "Totale: " + costoTotale + ".00€";

      });
      btn.setAttribute("data-bs-dismiss", "modal");

      btn.appendChild(nome);
      btn.appendChild(prezzo);

      modalSection.appendChild(btn);
    }
  }
}

function caricaComponenti() {
  let int_parti = ["Processore", "SchedaMadre", "RAM", "ROM", "Alimentatore", "CASE"];


  let div_componenti = document.getElementById("containerComponenti");


  for (let i = 0; i < int_parti.length; i++) {
    let row = document.createElement("div");
    row.className = "row componente";
    row.id = "d" + int_parti[i];
    div_componenti.appendChild(row);

    let col1 = document.createElement("div");
    col1.className = "col-sm-2";
    col1.type = "button";
    col1.id = "img" + int_parti[i];
    col1.style.borderRight = "1px solid black"

    row.appendChild(col1);

    let btn = document.createElement("button");
    btn.className = "btn btn-dark mt-2";
    btn.innerHTML = "Scegli";
    btn.id = "btn" + int_parti[i];
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#componentModal");
    btn.onclick = function() {
      caricaMenu(int_parti[i]);
    }
    col1.appendChild(btn);

    let col2 = document.createElement("div");
    col2.className = "col-sm-8";
    col2.id = "nome" + int_parti[i];
    col2.innerHTML = int_parti[i];
    col2.style.borderRight = "1px solid black"
    row.appendChild(col2);

    let p = document.createElement("p");
    p.innerHTML = "...";
    p.classList.add("fw-bold", "text-white");
    col2.appendChild(p);

    let col3 = document.createElement("div");
    col3.className = "col-sm-2";
    col3.innerHTML = "prezzo";
    col3.id = "prezzo" + int_parti[i];
    row.appendChild(col3);

    let p2 = document.createElement("p");
    p2.innerHTML = "0.00€";
    p2.classList.add("fw-bold", "text-white");
    col3.appendChild(p2);
  }

  let row = document.createElement("div");
  row.className = "row componente";


  let col = document.createElement("div");
  col.className = "col-sm-3";
  col.style.borderRight = "1px solid black";
  row.appendChild(col);

  let btn = document.createElement("button");
  btn.className = "btn btn-dark mt-2";
  btn.innerHTML = "VAI AL CARRELLO";
  btn.id = "btnCarrello";
  btn.onclick = function() {
    if (tempBuild == 1) {
      let conferma = confirm("Vuoi salvare questa build?");
      if (conferma)
        controlloComponenti(int_parti);
    }

    if (nomeAcquisti.length > 0) {
      sessionStorage.setItem("prezzoBuilds", prezzoAcquisti);
      sessionStorage.setItem("nomeBuilds", nomeAcquisti);
    }

    window.location.href = "acquista.html";
  }
  col.appendChild(btn);

  col = document.createElement("div");
  col.className = "col-sm-3";
  col.style.borderRight = "1px solid black";
  row.appendChild(col);

  btn = document.createElement("button");
  btn.className = "btn btn-dark mt-2";
  btn.innerHTML = "AGGIUNGI AL CARRELLO";
  btn.id = "btnAcquista1";
  btn.onclick = function() {
    controlloComponenti(int_parti);
  }
  col.appendChild(btn);




  col = document.createElement("div");
  col.className = "col-sm-2 mt-2 fw-bold text-white text-center";
  col.id = "Totale";
  col.innerHTML = "Totale: 0.00€";
  row.appendChild(col);

  div_componenti.appendChild(row);

}

function controlloComponenti(int_parti) {

  if (document.getElementById("nomeBuild").value == "") {
    document.getElementById("nomeBuild").focus();
    document.getElementById("nomeBuild").style.border = "2px solid red";
    return;
  }
  else {
    document.getElementById("nomeBuild").style.borderWidth = "0px";
    document.getElementById("nomeBuild").style.borderBottom = "2px solid white";
  }

  let miss = false;

    /*
    <div class="alert alert-danger alert-dismissible fade w-50 mx-auto" id="alertMancanzaComponenti">
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          <p id="pMancanzaComponenti"></p>
        </div>
    
    */let div = document.createElement("div");
  div.className = "alert alert-danger alert-dismissible fade show w-75 mx-auto";
  div.id = "alertMancanzaComponenti";

  let btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-close";
  btn.setAttribute("data-bs-dismiss", "alert");
  div.appendChild(btn);

  let p = document.createElement("p");
  p.id = "pMancanzaComponenti";
  p.innerHTML = "Mancano i seguenti componenti:\n";
  div.appendChild(p);

  let ul = document.createElement("ul");
  ul.id = "ulMancanzaComponenti";
  p.appendChild(ul);





  for (let i = 0; i < 6; i++) {
    if (document.getElementById("nome" + int_parti[i]).children[0].innerHTML == "...") {
      miss = true;

      let li = document.createElement("li");
      li.innerHTML = int_parti[i];
      ul.appendChild(li);
    }
  }

  if (miss) {
    if (document.getElementById("alertMancanzaComponenti") != null)
      document.getElementById("alertMancanzaComponenti").remove();
    document.getElementById("alert").appendChild(div);
    return;
  }


  tempBuild = 0;


  nomeAcquisti.push(document.getElementById("nomeBuild").value);
  prezzoAcquisti.push(computer);

  document.getElementById("nomeBuild").value = "";
  for (let i = 0; i < 6; i++) {
    document.getElementById("nome" + int_parti[i]).children[0].innerHTML = "..."
  }

}

function init() {

  /* RIFERIMENTI */
  _tecno_campo1 = document.getElementById("info_tecnologie_campo1");
  _tecno_campo2 = document.getElementById("info_tecnologie_campo2");
  _btnAccedi = document.getElementById("btnAccedi");
  _btnRegistrati = document.getElementById("btnRegistrati");
  _btnCloseProfile = document.getElementById("btnCloseProfile");
  //_btnSIalPRO = document.getElementById("btnSIalPRO");
  _btnExit = document.getElementById("btnExit");
  userOptions = document.getElementById("userOptionsList");
  _btnAcquista = document.getElementById("btnAcquista");
  _txtRobot = document.getElementById("txtRobot");

  let hoverDentro = document.getElementsByClassName("hoverDentro");
  /* RIFERIMENTI */
  /*----------------------------*/

  /* ASSEGNAZIONE UTENTE ADMIN */

  var admin =
  {
    "username": "admin",
    "password": "admin",
    "nome": "admin",
    "cognome": "admin",
    "email": "admin",
    "dataNascita": "admin"
  }

  utenti[0] = admin;

  /* ASSEGNAZIONE UTENTE ADMIN */
  /*----------------------------*/
  /* ASSEGNAZIONI EVENTI */

  _btnAccedi.addEventListener("click", function() {
    let utente = document.getElementById("txtUsernameLogin").value;
    let password = document.getElementById("txtPasswordLogin").value;


    if (_txtRobot.checked) {
      searchUser(utente, password);
      document.getElementById("loginRobotError").style.visibility = "hidden";
    }
    else {
      document.getElementById("loginRobotError").style.visibility = "visible";
    }

  });

  _btnRegistrati.addEventListener("click", function() {
    let utente = document.getElementById("txtUsernameSign").value;
    let password1 = document.getElementById("txtPasswordSign1").value;
    let password2 = document.getElementById("txtPasswordSign2").value;
    let nome = document.getElementById("txtNomeSign").value;
    let cognome = document.getElementById("txtCognomeSign").value;
    let email = document.getElementById("txtEmailSign").value;
    let dataNascita = document.getElementById("txtDataNascitaSign").value;
    addUser(utente, password1, password2, nome, cognome, email, dataNascita);
  });

  _btnExit.addEventListener("click", function() {
    userLogout();
  });

  _btnCloseProfile.addEventListener("click", function() {
    let mail = document.getElementsByClassName("datoUtente")[2].value;
    changeUserData(mail);
  });

  if (document.getElementsByTagName("title")[0].innerHTML == "TechBuilder:&gt;CARRELLO") {
    _btnAcquista.addEventListener("click", function() {

      if (!logged) {
        alertACQUISTO(false);
      }
      else {

        btnAcquista.disabled = true;
        alertACQUISTO(true);
        confermaAcquisto();
        /*
        
        sessionStorage.clear();
        window.location.href = "index.html";
         */
      }
    });
  }

  /*
  _btnSIalPRO.addEventListener("click",function(){
      if(userOptions.children["linkPRO"])
          userOptions.removeChild(userOptions.children["linkPRO"]);
  });
  */
  if (document.getElementsByTagName("title")[0].innerHTML == "TechBuilder:&gt;BUILDER")
    for (let i = 0; i < 4; i++) {
      hoverDentro[i].addEventListener("mouseover", function() {
        hoverDentro[i].src = "img/pcDentro" + (i + 1) + ".jpg";
      }
      )
      hoverDentro[i].addEventListener("mouseout", function() {
        hoverDentro[i].src = "img/pcFronte" + (i + 1) + ".jpg";
      }
      )

    }

  /* ASSEGNAZIONI EVENTI */

  addUserOptions(false, "");
}

function confermaAcquisto() {
  sessionStorage.clear();
  while (document.getElementById("acquisti").children[0] != null)
    document.getElementById("acquisti").children[0].remove();
}

function alertACQUISTO(flag) {

  if (document.getElementById("alertAcquisto") != null)
    document.getElementById("alertAcquisto").remove();

  let colore;
  let scritta;
  if (flag) {
    colore = "success";
    scritta = "Acquisto effettuato con successo!"
  }
  else {
    colore = "danger";
    scritta = "Devi essere loggato per poter acquistare!"
  }


  let div = document.createElement("div");
  div.id = "alertAcquisto";
  div.className = "alert alert-" + colore + " alert-dismissible fade show container-sm mt-3";
  div.setAttribute("role", "alert");
  div.innerHTML = scritta;
  let btn = document.createElement("button");
  btn.type = "button";
  btn.className = "close";
  btn.setAttribute("data-dismiss", "alert");
  btn.setAttribute("aria-label", "Close");

  div.appendChild(btn);

  document.getElementById("wrapper").appendChild(div);
}

function changeUserData(mail) {
  let i = 0;
  while (utenti[i].email != mail)
    i++;

  utenti[i].nome = document.getElementsByClassName("datoUtente")[0].value;
  utenti[i].cognome = document.getElementsByClassName("datoUtente")[1].value;
  utenti[i].username = document.getElementsByClassName("datoUtente")[3].value;
  utenti[i].dataNascita = document.getElementsByClassName("datoUtente")[4].value;
  utenti[i].password = document.getElementsByClassName("datoUtente")[5].value;
}

function searchUser(utente, password) {
  document.getElementById("loginNameError").style.visibility = "hidden";
  document.getElementById("loginPasswordError").style.visibility = "hidden";
  let i = 0;
  while (i < utenti.length) {
    if (utenti[i].username == utente || utenti[i].email == utente) {
      if (password == utenti[i].password) {
        removeUserOptions();
        addUserOptions(true, utenti[i].username);
        document.getElementById("closeLogin").click();
        logged = true;
        sessionStorage.setItem("nAccount", i);

      }
      else {
        document.getElementById("txtPasswordLogin").value = "";
        document.getElementById("loginPasswordError").style.visibility = "visible";
      }
      return;
    }
    i++;
  }

  document.getElementById("txtUsernameLogin").value = "";
  document.getElementById("txtUsernameLogin").focus();
  document.getElementById("loginNameError").style.visibility = "visible";
}

function addUser(utente, pswd1, pswd2, nome, cognome, email, dataNascita) {

  if (pswd1 != pswd2) {
    alert("Le password non coincidono");
    return;
  }

  for (let i = 0; i < utenti.length; i++) {
    if (utenti[i].username == utente || utenti[i].email == email) {
      alert("Utente già registrato");
      console.log("Utente già registrato");
      return;
    }
  }

  console.log("Utente registrato");

  var datiUtente = {
    "username": utente,
    "password": pswd1,
    "nome": nome,
    "cognome": cognome,
    "email": email,
    "dataNascita": dataNascita
  }

  utenti.push(datiUtente);
  sessionStorage.setItem("utenti", JSON.stringify(utenti));
  document.getElementById("closeSignup").click();
}


function userLogout() {
  removeUserOptions();
  addUserOptions(false, "");
}

function loadUser(nomeUtente) {
  let dati = document.getElementsByClassName("datoUtente");

  let i = 0;
  while (utenti[i].username != nomeUtente)
    i++;

  dati[0].value = utenti[i].nome;
  dati[1].value = utenti[i].cognome;
  dati[2].value = utenti[i].email;
  dati[3].value = utenti[i].username;
  dati[4].value = utenti[i].dataNascita;
  dati[5].value = utenti[i].password;
}


function removeUserOptions() {
  while (userOptions.firstChild) {
    userOptions.removeChild(userOptions.firstChild);
  }
}

function addUserOptions(logged, nomeUtente) {
  /*
  <a class="dropdown-item list-item text-decoration-none" href="#">Accedi</a>
  <a class="dropdown-item list-item text-decoration-none" href="#">Registrati</a>
  */
  let a, p;
  if (!logged) {

    a = document.createElement("a");
    a.classList.add("dropdown-item", "list-item", "text-decoration-none");
    a.setAttribute("data-bs-toggle", "modal");
    a.setAttribute("data-bs-target", "#loginModal");
    a.href = "#";
    a.type = "button";
    a.innerHTML = "Accedi";
    userOptions.append(a);

    a = document.createElement("a");
    a.classList.add("dropdown-item", "list-item", "text-decoration-none");
    a.setAttribute("data-bs-toggle", "modal");
    a.setAttribute("data-bs-target", "#signupModal");
    a.href = "#";
    a.innerHTML = "Registrati";
    userOptions.append(a);
  }
  else {
    p = document.createElement("p");
    p.classList.add("text-center", "text-muted");
    p.setAttribute("readonly", "true");
    p.disabled = true;
    p.innerHTML = nomeUtente;
    userOptions.append(p);

    a = document.createElement("a");
    a.classList.add("dropdown-item", "list-item", "text-decoration-none");
    a.setAttribute("data-bs-toggle", "modal");
    a.setAttribute("data-bs-target", "#profileModal");
    a.innerHTML = "Profilo";
    a.onclick = function() {
      loadUser(nomeUtente);
    }
    userOptions.append(a);

    /*
    a = document.createElement("a");
    a.classList.add("dropdown-item","list-item","text-decoration-none");
    a.setAttribute("data-bs-toggle","modal");
    a.setAttribute("data-bs-target","#PROModal");
    a.id="linkPRO";
    a.innerHTML = "Passa a PRO";
    userOptions.append(a);
    */

    a = document.createElement("a");
    a.classList.add("dropdown-item", "list-item", "text-decoration-none");
    a.setAttribute("data-bs-toggle", "modal");
    a.setAttribute("data-bs-target", "#exitModal");
    a.href = "#";
    a.innerHTML = "Esci";
    userOptions.append(a);
  }
}


function expandDescrizioni() {


  if (!expanded_tecnologie) {
    /*
    if(expanded_tecnologie){
        _tecno_campo1.classList.remove("col-lg-6");
        _tecno_campo1.classList.add("col-lg-12");
        _tecno_campo2.style.display = "inline";
        _tecno_campo2.style.visibility = "hidden";
        _tecno_campo2.classList.remove("col-lg-6");
        _tecno_campo2.classList.add("col-lg-1");
        expanded_tecnologie = false;
    }
    else{
        _tecno_campo1.classList.remove("col-lg-12");
        _tecno_campo1.classList.add("col-lg-6");
        _tecno_campo2.classList.remove("col-lg-1");
        _tecno_campo2.classList.add("col-lg-6");
        _tecno_campo2.style.display = "block";
        _tecno_campo2.style.visibility = "visible";
        expanded_tecnologie = true;
    }
    */
    _tecno_campo2.style.display = "hidden";
    _tecno_campo2.classList.add("col-lg-6");
    _tecno_campo1.classList.remove("col-lg-12");
    _tecno_campo1.classList.add("col-lg-6");
    /*ACCORDION DINAMICO TECNOLOGIE*/
    let divAccordion = document.createElement("div");
    divAccordion.classList.add("accordion", "rounded-4", "p-2");
    divAccordion.id = "accordionTecno";

    let divItem = document.createElement("div");
    divItem.classList.add("accordion-item");

    divAccordion.append(divItem);

    let h2 = document.createElement("h2");
    //h2.class = "accordion-header";
    h2.id = "headingOne";
    divItem.append(h2);

    let button = document.createElement("button");
    button.classList.add("accordion-button");
    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#IA");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "IA");
    button.innerHTML = "<strong> Computing basato su IA</strong>";

    h2.append(button);

    let divCollapse = document.createElement("div");
    divCollapse.id = "IA";
    divCollapse.classList.add("accordion-collapse", "collapse");
    divCollapse.setAttribute("aria-labelledby", "headingOne");
    divCollapse.setAttribute("data-bs-parent", "#accordionTecno");
    divItem.append(divCollapse);

    let divBody = document.createElement("div");
    divBody.classList.add("accordion-body");

    divCollapse.append(divBody);

    let p = document.createElement("p");
    p.innerHTML = "Il computing su intelligenza artificiale (AI) si riferisce alla capacità di utilizzare algoritmi e modelli di machine learning per consentire ai computer di emulare le capacità cognitive umane. <br> Questo permette ai computer di apprendere dai dati forniti, riconoscere modelli, elaborare il linguaggio naturale, comprendere l'immagine e persino prendere decisioni basate sul contesto.<br>Stiamo sviluppando questo tecnica per aiutare le aziende migliorare l'efficienza di programmi già esistenti.";

    divBody.append(p);

    let divItem2 = document.createElement("div");
    divItem2.classList.add("accordion-item");

    divAccordion.append(divItem2);

    h2 = document.createElement("h2");
    h2.classList.add("accordion-header");
    h2.id = "headingTwo";
    divItem2.append(h2);

    button = document.createElement("button");
    button.classList.add("accordion-button", "collapsed");
    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#DL");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "DL");
    button.innerHTML = "<strong> Deep Learning</strong>";

    h2.append(button);

    divCollapse = document.createElement("div");
    divCollapse.id = "DL";
    divCollapse.classList.add("accordion-collapse", "collapse");
    divCollapse.setAttribute("aria-labelledby", "headingTwo");
    divCollapse.setAttribute("data-bs-parent", "#accordionTecno");
    divItem2.append(divCollapse);

    divBody = document.createElement("div");
    divBody.classList.add("accordion-body");

    divCollapse.append(divBody);

    p = document.createElement("p");

    p.innerHTML = "Il deep learning è una sottoarea dell'intelligenza artificiale che si concentra sulla creazione di modelli computazionali ispirati alla struttura e al funzionamento del cervello umano, noto come rete neurale artificiale. Questi modelli sono in grado di apprendere in modo autonomo da grandi quantità di dati e di effettuare previsioni o prendere decisioni senza essere esplicitamente programmati per compiere specifiche azioni. <br> Il termine deep nel deep learning si riferisce alla presenza di più strati di neuroni artificiali all'interno delle reti neurali <br> Il deep learning ha dimostrato eccellenti risultati in diverse applicazioni, come il riconoscimento delle immagini, il riconoscimento vocale, la traduzione automatica, la generazione di testo e molto altro ancora.";

    divBody.append(p);

    let divItem3 = document.createElement("div");
    divItem3.classList.add("accordion-item");

    divAccordion.append(divItem3);

    h2 = document.createElement("h2");
    h2.class = "accordion-header";
    h2.id = "headingThree";
    divItem3.append(h2);

    button = document.createElement("button");
    button.classList.add("accordion-button", "collapsed");
    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#ML");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "ML");
    button.innerHTML = "<strong> Machine Learning</strong>";

    h2.append(button);

    divCollapse = document.createElement("div");
    divCollapse.id = "ML";
    divCollapse.classList.add("accordion-collapse", "collapse");
    divCollapse.setAttribute("aria-labelledby", "headingThree");
    divCollapse.setAttribute("data-bs-parent", "#accordionTecno");
    divItem3.append(divCollapse);

    divBody = document.createElement("div");
    divBody.classList.add("accordion-body");

    divCollapse.append(divBody);

    p = document.createElement("p");

    p.innerHTML = "Il machine learning è un campo dell'intelligenza artificiale che si occupa di sviluppare algoritmi e modelli per l'AI. <br> Esistono diverse tecniche di machine learning, tra cui il: <ul> <li>supervised learning (apprendimento supervisionato)</li> <li>unsupervised learning (apprendimento non supervisionato)</li> <li>reinforcement learning (apprendimento per rinforzo)</li> </ul> <br> Visto l'importanza di questa tecnologia, è in rapido sviluppo in tutti i settori disponibili.";
    divBody.append(p);

    _tecno_campo2.append(divAccordion);
    expanded_tecnologie = true;
  }
  else {
    _tecno_campo1.classList.add("col-lg-12");
    _tecno_campo1.classList.remove("col-lg-6");
    _tecno_campo2.removeChild(document.getElementById("accordionTecno"));
    expanded_tecnologie = false;
  }
}

function visSpecifiche(n) {
  document.getElementById("btnSpecificheModal").click();

  document.getElementById("img_Preassemblato").src = "img/pcFronte" + (n + 1) + ".jpg";
  document.getElementById("nome_Preassemblato").innerHTML = preAssemblati[n].nome;
  document.getElementById("descrizione_Preassemblato").innerHTML = preAssemblati[n].descrizione;
  document.getElementById("specifiche_Preassemblato").innerHTML =
    "<ul> <li>Processore: " + preAssemblati[n].componenti[0].nome +
    "</li> <li>Scheda madre: " + preAssemblati[n].componenti[1].nome +
    "</li> <li>RAM: " + preAssemblati[n].componenti[2].nome +
    "</li> <li>Hard Disk: " + preAssemblati[n].componenti[3].nome +
    "</li> <li>Alimentatore: " + preAssemblati[n].componenti[4].nome +
    "</li> <li>Case: " + preAssemblati[n].componenti[5].nome + "</li> </ul>";

  document.getElementById("btnProvaPreassemblato").onclick = function() {
    aggiungiPreassemblato(n);
  };
}

function aggiungiPreassemblato(n) {
  let int_parti = ["Processore", "SchedaMadre", "RAM", "ROM", "Alimentatore", "CASE"];
  tempBuild = 1;
  for (let i = 0; i < 6; i++) {
    costoTotale -= parseInt(document.getElementById("prezzo" + int_parti[i]).children[0].innerHTML.substring(0, document.getElementById("prezzo" + int_parti[i]).children[0].innerHTML.length - 4));
    computer -= parseInt(document.getElementById("prezzo" + int_parti[i]).children[0].innerHTML.substring(0, document.getElementById("prezzo" + int_parti[i]).children[0].innerHTML.length - 4));

    document.getElementById("nome" + int_parti[i]).children[0].innerHTML = preAssemblati[n].componenti[i].nome;
    document.getElementById("prezzo" + int_parti[i]).children[0].innerHTML = preAssemblati[n].componenti[i].prezzo + ".00€";

    computer += parseInt(preAssemblati[n].componenti[i].prezzo);

    costoTotale += parseInt(preAssemblati[n].componenti[i].prezzo);
    document.getElementById("Totale").innerHTML = "Totale: " + costoTotale + ".00€";
  }

  window.scrollTo(0, 0);
}