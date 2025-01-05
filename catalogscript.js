let listonline = [];
let allscens = {};
let urlbd =
  "https://script.google.com/macros/s/AKfycbwdokFRNJVbnq_-fH-6UB4XZqixeMn6AqYB7c3xSGR0-feAZCHu8_7W1ewcEwVKbK_Wbg/exec";
//preenche tabelas ao carregar cenário
//inicial
initscens();
function initscens() {
  fetch("./scens.json").then((resp) =>
    resp.json().then((data) => {
      allscens = data;
      let tempscens = Object.keys(data);
      let i = Math.floor(Math.random() * tempscens.length);
      let tscen = allscens[tempscens[i]];
      console.log(tempscens);
      while (tempscens.length > 0) {
        i = Math.floor(Math.random() * tempscens.length);
        tscen = allscens[tempscens[i]];
        creatrowscen(tempscens[i], tscen);
        tempscens = tempscens.slice(i, i + 1);
        console.log(tempscens.length);
      }
    })
  );
}
//function fillSheets() {}
rowsscen.addEventListener("click", (ev) => {
  const bt = ev.target;
  const row = bt.closest("tr");
  if (ev.target.classList.contains("arrowup")) {
    const prevRow = row.previousElementSibling;
    if (prevRow && prevRow.rowIndex !== 0) {
      // Evita mover a linha para cima do cabeçalho
      row.parentNode.insertBefore(row, prevRow);
    }
  } else if (ev.target.classList.contains("arrowdown")) {
    const nextRow = row.nextElementSibling;
    if (nextRow) {
      row.parentNode.insertBefore(nextRow, row);
    }
  } else if (ev.target.classList.contains("printbt")) {
    printsce(row.children[0].children[1].value);
  }
});
//solicita lista de cenários
function listOnlineFiles() {
  rowsscen.innerHTML = "";
  getrequest(urlbd + "?type=list", listOnlineFilesAux);
}
async function listOnlineFilesAux(result) {
  listonline = result;
  console.log(listonline.length);
  let count = 0;
  let ninterval = 0;
  ninterval = setInterval(() => {
    if (count < listonline.length) {
      getrequest(urlbd + "?type=scen&id=" + listonline[count][0], appendonline);
      count++;
    } else {
      clearInterval(ninterval);
    }
  }, 500);
}
//adiciona cenário à tabela
function appendonline(scen, url) {
  const ids = url.slice((urlbd + "?type=scen&id=").length);
  allscens[ids] = scen;
  creatrowscen(ids, scen);
}
function creatrowscen(ids, scen) {
  const sline = document.createElement("tr");
  sline.value = ids;
  sline.style = `color: ${scen.TextColor};background-color: ${scen.BackgroundColor};`;
  const smark = document.createElement("td");
  const simg = document.createElement("td");
  const sinfos = document.createElement("td");
  const stitle = document.createElement("h2");
  const sauthor = document.createElement("span");
  const sambiance = document.createElement("p");
  const skeys = document.createElement("p");
  const sskeys = document.createElement("strong");
  const ssskeys = document.createElement("span");
  const snotes = document.createElement("p");
  const ssnotes = document.createElement("strong");
  const sssnotes = document.createElement("span");
  const ssmark = document.createElement("input");
  const printbt = document.createElement("button");
  const arrowup = document.createElement("button");
  const arrowdown = document.createElement("button");
  const ssimg = document.createElement("img");
  printbt.classList.add("printbt");
  arrowup.classList.add("arrowup");
  ssmark.type = "checkbox";
  ssmark.classList.add("censelected");
  arrowdown.classList.add("arrowdown");
  ssmark.value = ids;
  smark.appendChild(arrowup);
  smark.appendChild(ssmark);
  smark.appendChild(arrowdown);
  ssimg.classList.add("miniimgs");
  ssimg.src = scen.imgURL;
  simg.appendChild(printbt);
  simg.appendChild(ssimg);
  stitle.innerHTML += scen.Name;
  sinfos.appendChild(stitle);
  sauthor.innerHTML = scen.Author;
  sinfos.appendChild(sauthor);
  sambiance.innerHTML = scen.Ambiance;
  sinfos.appendChild(sambiance);
  sskeys.innerHTML = "Palavras-chave: ";
  skeys.appendChild(sskeys);
  ssskeys.innerHTML = scen.Tags.join(", ");
  skeys.appendChild(ssskeys);
  sinfos.appendChild(skeys);
  ssnotes.innerHTML = "Notas: ";
  snotes.appendChild(ssnotes);
  sssnotes.innerHTML += scen.OtherNotes;
  snotes.appendChild(sssnotes);
  sinfos.appendChild(snotes);
  smark.classList.add("col0");
  simg.classList.add("col1");
  sinfos.classList.add("col2");
  sline.appendChild(smark);
  sline.appendChild(simg);
  sline.appendChild(sinfos);
  rowsscen.appendChild(sline);
}
/*
//ordena a lista de cenários
function listSort(listonline, sort, desc) {
  if (sort > 0) {
    listonline.sort((a, b) => {
      const nameA = a[sort].toUpperCase(); // ignore upper and lowercase
      const nameB = b[sort].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        if (desc) return -1;
        if (!desc) return 1;
      }
      if (nameA > nameB) {
        if (desc) return 1;
        if (!desc) return -1;
      }
      return 0; // names must be equal
    });
  }
  console.log(listonline);
  tscen.innerHTML = "";
  listonline.forEach((el) => {
    appendonline(el);
  });
}
*/
//faz requicisão get
async function getrequest(url, funcAux) {
  timediv.classList.remove("hiddendiv");
  fetch(url)
    .then((resp) => {
      if (resp.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + resp.status
        );
        output.innerText += "\nerro " + resp.status + "\n";
        return;
      }
      resp.json().then((data) => {
        funcAux(data.body, url);
        timediv.classList.add("hiddendiv");
      });
    })
    .catch((err) => {
      console.log("Fetch Error :-S", err);
    });
}
//mostrar about
btshowabout.addEventListener("click", () => {
  modalabout.classList.remove("hiddendiv");
});
//ocultar about
closeaboutbt.addEventListener("click", () => {
  modalabout.classList.add("hiddendiv");
});
//selecionar tudo
btselectall.addEventListener("click", () => {
  const selects = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < selects.length; i++) {
    selects[i].click();
  }
});
//Atualizar lista
toupdate.addEventListener("click", () => {
  const resp = confirm("Essa ação poderá levar vários minutos, tem certeza?");
  if (resp) {
    const reresp = confirm(
      "A atualização irá incluir os ultimos cenários cadastrados e ainda não verificados, não nos responsabilizamos pelos seus conteúdos, continuar mesmo assim?"
    );
    if (reresp) {
      listOnlineFiles();
      lastupdate.innerHTML = new Date().toLocaleDateString();
    }
  }
});
//Baixar cenários selecionados
togetonejson.addEventListener("click", async () => {
  const resp = confirm("Essa ação poderá levar vários minutos, tem certeza?");
  if (resp) {
    const selects = document.getElementsByClassName("censelected");
    const cenarios = [];
    let interval = 0;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i].checked) {
        if (allscens[selects[i].value]) {
          cenarios.push(allscens[selects[i].value]);
        } else {
          cenarios.push({});
          let posit = cenarios.length - 1;
          getrequest(urlbd + "?type=scen&id=" + selects[i].value, (data) => {
            allscens[selects[i].value] = data;
            cenarios[posit] = allscens[selects[i].value];
          });
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }
    }
    interval = setInterval(() => {
      let verif = true;
      cenarios.forEach((el) => {
        if (!Object.keys(el).length) {
          verif = false;
          timediv.classList.remove("hiddendiv");
        }
      });
      if (verif) {
        console.log(cenarios);
        cenarios.forEach((data) => savescenario(data));
        clearInterval(interval);
        timediv.classList.add("hiddendiv");
      }
    }, 100);
  }
});
//Imprimir cenários selecionados
toprint.addEventListener("click", async () => {
  const resp = confirm("Essa ação poderá levar vários minutos, tem certeza?");
  if (resp) {
    const cenlistinput = document.querySelectorAll('input[type="checkbox"]');
    const cenlist = [];
    //lista cenários demarcados
    for (let i = 0; i < cenlistinput.length; i++) {
      if (cenlistinput[i].checked) {
        cenlist.push(cenlistinput[i].value);
      }
    }
    //baixa cenários ainda não baixados
    for (let i = 0; i < cenlist.length; i++) {
      if (!allscens[cenlist[i]]) {
        timediv.classList.remove("hiddendiv");
        getrequest(urlbd + "?type=scen&id=" + cenlist[i], (data) => {
          allscens[cenlist[i]] = data;
          timediv.classList.add("hiddendiv");
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
    let interval = setInterval(() => {
      let cc = true;
      for (let i = 0; i < cenlist.length; i++) {
        if (!allscens[cenlist[i]]) {
          cc = false;
        }
      }
      if (cc === true) {
        printlist(cenlist);
        clearInterval(interval);
      }
    }, 100);
  }
});
// imprimir todos cenários
function printlist(cenlist) {
  //console.log(cenlist);
  let stringscens = "";
  cenlist.forEach((el) => {
    stringscens += htmlcreate(allscens[el], false, el);
  });
  let htmlstring = `
  <!DOCTYPE html>
  <html lang="pt-br">
  ${creathead()}
  <body>
  ${creatcover(cenlist)}
  ${stringscens}
  ${creatfooter({}, true)}
  </body>
  <script>window.print()</script>
  </html>
  `;
  let link = document.createElement("a");
  let text = new Blob([htmlstring], { type: "text/html" });
  [htmlstring], { type: "text/plain: charset=utf-8" };
  link.setAttribute("download", "CenaryColletion");
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  let imp = window.open(
    URL.createObjectURL(text),
    "",
    "popup," + "width=" + (window.innerWidth > 800 ? "800" : window.innerWidth)
  );
  //imp.print();
}
//salvar cenário
function savescenario(data) {
  let link = document.createElement("a");
  let datafile = new Blob([JSON.stringify(data, false, 1)]);
  let namefile = data.Name + "-Dominus.json";
  link.setAttribute("download", namefile);
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(datafile)
  );
  link.href = URL.createObjectURL(datafile);
  link.click();
}
//imprimir cenário
function printsce(idcen) {
  if (allscens[idcen]) {
    printscen(allscens[idcen]);
  } else {
    timediv.classList.remove("hiddendiv");
    getrequest(urlbd + "?type=scen&id=" + idcen, (data) => {
      allscens[idcen] = data;
      printscen(allscens[idcen]);
      timediv.classList.add("hiddendiv");
    });
  }
}
async function printscen(cenar) {
  console.log(JSON.stringify(cenar, false, 1));
  let link = document.createElement("a");
  const cenhtml = htmlcreate(cenar);
  let text = new Blob([cenhtml], { type: "text/html" });
  [cenhtml], { type: "text/plain: charset=utf-8" };
  console.log(text);
  let namefile = cenar.Name + "-" + cenar.name + ".html";
  link.setAttribute("download", namefile);
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  let imp = window.open(
    URL.createObjectURL(text),
    "",
    "popup," + "width=" + (window.innerWidth > 800 ? "800" : window.innerWidth)
  );
  await new Promise((resolve) => setTimeout(resolve, 100));
  imp.print();
  //imp.close();
}
function htmlcreate(cenar, unit = true, keyscen = false) {
  return ` ${unit ? '<!DOCTYPE html><html lang="pt-br">' : ""}
  ${
    unit
      ? creathead(cenar) + "<body>"
      : "<div " +
        (keyscen ? "id=" + keyscen : "") +
        ' style="color:' +
        (cenar.TextColor ? cenar.TextColor : "black") +
        "; background-color:" +
        (cenar.BackgroundColor ? cenar.BackgroundColor : "white") +
        ';">'
  }
  <header>
    <h2>${cenar.Name}</h2>
    <strong class="scenarioauthor">${cenar.Author}</strong>
    <img src="${
      cenar.imgURL
        ? cenar.imgURL
        : "https://dominusrpg.vercel.app/imgs/dominusweb.png"
    }" alt="Imagem do cenário ${cenar.Name}" />
    <p>${cenar.Ambiance ? cenar.Ambiance : "Um cénario Dominus Web"}</p>
    <spam>${
      cenar.Tags ? "Palavras-chaves: " + cenar.Tags.join(", ") : ""
    }</spam>
    <spam>${cenar.OtherNotes}</spam>
  </header>
  <main>
  <h3>Trama</h3>
  <table>
    <tr>
      <th>d6</th>
      <th>Algo aconteceu...</th>
      <th>Você precisa...</th>
      <th>Senão...</th>
    </tr>
    <tr>
      <td class="tablenumber">1</td>
      <td class="tabletexttrama1">${cenar.Occurrence[0]}</td>
      <td class="tabletexttrama2">${cenar.Need[0]}</td>
      <td class="tabletexttrama3">${cenar.Otherwise[0]}</td>
    </tr>
    <tr>
      <td class="tablenumber">2</td>
      <td class="tabletexttrama1">${cenar.Occurrence[1]}</td>
      <td class="tabletexttrama2">${cenar.Need[1]}</td>
      <td class="tabletexttrama3">${cenar.Otherwise[1]}</td>
    </tr>
    <tr>
      <td class="tablenumber">3</td>
      <td class="tabletexttrama1">${cenar.Occurrence[2]}</td>
      <td class="tabletexttrama2">${cenar.Need[2]}</td>
      <td class="tabletexttrama3">${cenar.Otherwise[2]}</td>
    </tr>
    <tr>
      <td class="tablenumber">4</td>
      <td class="tabletexttrama1">${cenar.Occurrence[3]}</td>
      <td class="tabletexttrama2">${cenar.Need[3]}</td>
      <td class="tabletexttrama3">${cenar.Otherwise[3]}</td>
    </tr>
    <tr>
      <td class="tablenumber">5</td>
      <td class="tabletexttrama1">${cenar.Occurrence[4]}</td>
      <td class="tabletexttrama2">${cenar.Need[4]}</td>
      <td class="tabletexttrama3">${cenar.Otherwise[4]}</td>
    </tr>
    <tr>
      <td class="tablenumber">6</td>
      <td class="tabletexttrama1">${cenar.Occurrence[5]}</td>
      <td class="tabletexttrama2">${cenar.Need[5]}</td>
      <td class="tabletexttrama3">${cenar.Otherwise[5]}</td>
    </tr>
  </table>
  <h3>Arquétipo</h3>
  <table>
    <tr>
      <td class="tablenumber">1</td>
      <td class="tabletextArquetipos">${cenar.Archetypes[0]}</td>
    </tr>
    <tr>
      <td class="tablenumber">2</td>
      <td class="tabletextArquetipos">${cenar.Archetypes[1]}</td>
    </tr>
    <tr>
      <td class="tablenumber">3</td>
      <td class="tabletextArquetipos">${cenar.Archetypes[2]}</td>
    </tr>
    <tr>
      <td class="tablenumber">4</td>
      <td class="tabletextArquetipos">${cenar.Archetypes[3]}</td>
    </tr>
    <tr>
      <td class="tablenumber">5</td>
      <td class="tabletextArquetipos">${cenar.Archetypes[4]}</td>
    </tr>
    <tr>
      <td class="tablenumber">6</td>
      <td class="tabletextArquetipos">${cenar.Archetypes[5]}</td>
    </tr>
  </table>
  <h3>Cenas</h3>
    <table>
      <tr>
        <th>d6</th>
        <th>Lugares</th>
        <th>Personagens (1-3)</th>
        <th>Eventos (4-6)</th>
      </tr>
      <tr>
        <td class="tablenumber">1</td>
        <td class="tabletextscena1">${cenar.Places[0]}</td>
        <td class="tabletextscena2">${cenar.Characters[0]}</td>
        <td class="tabletextscena3">${cenar.Events[0]}</td>
      </tr>
      <tr>
        <td class="tablenumber">2</td>
        <td class="tabletextscena1">${cenar.Places[1]}</td>
        <td class="tabletextscena2">${cenar.Characters[1]}</td>
        <td class="tabletextscena3">${cenar.Events[1]}</td>
      </tr>
      <tr>
        <td class="tablenumber">3</td>
        <td class="tabletextscena1">${cenar.Places[2]}</td>
        <td class="tabletextscena2">${cenar.Characters[2]}</td>
        <td class="tabletextscena3">${cenar.Events[2]}</td>
      </tr>
      <tr>
        <td class="tablenumber">4</td>
        <td class="tabletextscena1">${cenar.Places[3]}</td>
        <td class="tabletextscena2">${cenar.Characters[3]}</td>
        <td class="tabletextscena3">${cenar.Events[3]}</td>
      </tr>
      <tr>
        <td class="tablenumber">5</td>
        <td class="tabletextscena1">${cenar.Places[4]}</td>
        <td class="tabletextscena2">${cenar.Characters[4]}</td>
        <td class="tabletextscena3">${cenar.Events[4]}</td>
      </tr>
      <tr>
        <td class="tablenumber">6</td>
        <td class="tabletextscena1">${cenar.Places[5]}</td>
        <td class="tabletextscena2">${cenar.Characters[5]}</td>
        <td class="tabletextscena3">${cenar.Events[5]}</td>
      </tr>
    </table>
  <h3>Banco de Idéias</h3>
  <table>
    <tr>
      <th>d6</th>
      <th>Assunto</th>
      <th>Ação</th>
      <th>Coisa</th>
      <th>Qualidade</th>
    </tr>
    <tr>
      <td class="tablenumber">1</td>
      <td class="tabletextidea1">${cenar.IdeaBank[0].Subject}</td>
      <td class="tabletextidea2">${cenar.IdeaBank[0].Action}</td>
      <td class="tabletextidea3">${cenar.IdeaBank[0].Thing}</td>
      <td class="tabletextidea4">${cenar.IdeaBank[0].Quality}</td>
    </tr>
    <tr>
      <td class="tablenumber">2</td>
      <td class="tabletextidea1">${cenar.IdeaBank[1].Subject}</td>
      <td class="tabletextidea2">${cenar.IdeaBank[1].Action}</td>
      <td class="tabletextidea3">${cenar.IdeaBank[1].Thing}</td>
      <td class="tabletextidea4">${cenar.IdeaBank[1].Quality}</td>
    </tr>
    <tr>
      <td class="tablenumber">3</td>
      <td class="tabletextidea1">${cenar.IdeaBank[2].Subject}</td>
      <td class="tabletextidea2">${cenar.IdeaBank[2].Action}</td>
      <td class="tabletextidea3">${cenar.IdeaBank[2].Thing}</td>
      <td class="tabletextidea4">${cenar.IdeaBank[2].Quality}</td>
    </tr>
    <tr>
      <td class="tablenumber">4</td>
      <td class="tabletextidea1">${cenar.IdeaBank[3].Subject}</td>
      <td class="tabletextidea2">${cenar.IdeaBank[3].Action}</td>
      <td class="tabletextidea3">${cenar.IdeaBank[3].Thing}</td>
      <td class="tabletextidea4">${cenar.IdeaBank[3].Quality}</td>
    </tr>
    <tr>
      <td class="tablenumber">5</td>
      <td class="tabletextidea1">${cenar.IdeaBank[4].Subject}</td>
      <td class="tabletextidea2">${cenar.IdeaBank[4].Action}</td>
      <td class="tabletextidea3">${cenar.IdeaBank[4].Thing}</td>
      <td class="tabletextidea4">${cenar.IdeaBank[4].Quality}</td>
    </tr>
    <tr>
      <td class="tablenumber">6</td>
      <td class="tabletextidea1">${cenar.IdeaBank[5].Subject}</td>
      <td class="tabletextidea2">${cenar.IdeaBank[5].Action}</td>
      <td class="tabletextidea3">${cenar.IdeaBank[5].Thing}</td>
      <td class="tabletextidea4">${cenar.IdeaBank[5].Quality}</td>
    </tr>
  </table>
  ${prownrules(cenar.OwnRule)}
  ${unit ? "" : creatfooter(cenar, unit)}
  </main>
  ${unit ? creatfooter(cenar) : ""}
  ${unit ? "</body></html>" : "</div>"}
  `;
}
function creathead(cenar = {}) {
  return `<head>
      <meta charset="utf-8" />
      <meta property="og:title" content="Dominus RPG Solo / ${
        cenar.Name ? cenar.Name : ""
      }" />
      <meta property="og:description" content='História no cenário ${
        cenar.Name ? cenar.Name : ""
      } do RPG Solo  Dominus' />
      <meta property="og:locale" content="pt-br" />
      <meta property="description" content='História no cenário ${
        cenar.Name ? cenar.Name : ""
      } do RPG Solo  Dominus' />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <title>${
        cenar.Name ? cenar.Name + " - " : ""
      } Dominus - RPG Solo com Multiplos Cenários</title>
      <style>
    @font-face {
      font-family: Lexend;
      src: url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Lexend:wght@100..900&family=Share+Tech&display=swap') format("truetype");
    }

    * {
      ${cenar.TextColor ? "color: " + cenar.TextColor + ";" : ""}
      font-family: Lexend, 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    body {
      background-color: ${
        cenar.BackgroundColor ? cenar.BackgroundColor : "white"
      };
      max-width: 800px;
      margin: 0 2px;
    }

    header {
      width: 100%;
      min-width: 300px;
      display: flex;
      flex-direction: column;
      break-after: page;
    }

    header * {
      display: flex;
      width: 100%;
      justify-content: center;
    }

    h2 {
      margin: 5px 0;
      font-size: xx-large;
      font-weight: bold;
    }

    .scenarioauthor {
      font-style: italic;
      margin: 0 0 2px 0;
    }

    header>a {
      flex-direction: column;
    }

    header img {
      align-self: center;
      height: auto;
      width: auto;
      max-height: 750px;
      max-width: 100%;
    }

    main {
      break-after: page;
    }

    h3 {
      margin: 0;
      text-align: start;
    }

    p {
      margin: 0;
      text-align: justify;
    }

    table {
      border-radius: 5px;
      width: 100%;
      border-collapse: collapse;
      font-size: small;
    }

    .tablenumber {
      font-weight: bold;
    }

    th,
    td {
      background-color: #dddddd66;
      border: 1px #ddd solid;
      padding: 1px 3px;
    }

    main .rule{
      font-size: small;
    }

    fieldset {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px;
    }

    article {
      text-align: justify;
      margin: 0 0 5px 0;
    }

    #covercatalog {
      max-height: 500px;
      display: block;
    }

    #cenlistdiv {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      max-height: 450px;
    }

    #cenlistdiv>spam {
      width: fit-content;
      max-width: 20%;
    }

    #cenlistdiv>spam>a {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  </style>
  </head>`;
}
function prownrules(OwnRule) {
  let ruleshtml = '<div class="rule">';
  OwnRule.forEach((el, ind) => {
    ruleshtml += `<h3>Regra ${ind + 1}: ${el.Name}</h3>
    <article>${el.description}</article>`;
  });
  ruleshtml += "</div>";
  return ruleshtml;
}
function creatfooter(cenar = {}, unit = true) {
  if (unit) {
    return `<footer>
      <fieldset class="hiddendiv">
      <h2>Regras do sistema Dominus</h2>
      <div class="rule">
        <h3>Regra 1: Preparação</h3>
        <article>Escolha (ou role) um Arquétipo na tabela e dê um nome para seu personagem. Depois role um dado paracada uma das três colunas na tabela de Trama.</article>
      </div>
      <div class="rule">
        <h3>Regra 2: História</h3>
        <article>Para começar a sua história, escolha (ou role) um Lugar na tabela de Cenas. Sempre que entrar em uma Cena, role um dado. Se cair 3 ou menos, role um Personagem. Se cair 4 ou mais, role umEvento. Vocêpode ir para uma nova cena se achar apropriado (e tenha resolvido qualquer conflito aparente).</article>
      </div>
      <div class="rule">
        <h3>Regra 3: Desafio</h3>
        <article>Sempre que seu personagem tentar fazer algo que possa dar errado, você tem um Desafio: role um dado. Se tirar 4 ou mais, você conseguiu vencê-lo. Se houver algo nesta situação que lhe dê vantagem nesse Desafio, role 2 dados e escolha o maior. Caso algo lhe dê desvantagem, role 2 dados e escolha o menor.</article>
      </div>
      <div class="rule">
        <h3>Regra 4: Dilema</h3>
        <article>Sempre que tiver uma dúvida cuja resposta não seja óbvia, determine duas opções possíveis (sim ou não, esquerda ou direita, acontece A ou acontece B etc) e role um dado. Se cair 3 ou menos é a primeira opção, e se cair 4 ou mais é a segunda opção.</article>
      </div>
      <div class="rule">
        <h3>Regra 5: Banco de Ideias</h3>
        <article>Sempre que precisar elaborar melhor um Lugar, Personagem ou Evento, role no Banco de Ideias e interprete o resultado de qualquer coluna de acordo com o Cenário.</article>
      </div>
    </fieldset>
    <spam>${
      cenar.Author ? "Cenário criado por: " + cenar.Author : ""
    }<\spam><br />
    <spam>Data da versão: ${Date().toLocaleString()}</spam><br/>
    ${
      unit && cenar.textURL
        ? '<spam>Cenário original: <a href="' +
          cenar.textURL +
          '">' +
          cenar.textURL +
          "</a></span><br />"
        : ""
    }
    <spam>Fonte: <a href="${
      window.location.href
    }">Dominus Web</a></span><br />`;
  } else {
    return `<spam>Data da versão: ${Date().toLocaleString()}</spam><br/>
    <spam>${
      cenar.textURL
        ? 'Cenário original: <a href="' +
          cenar.textURL +
          '">' +
          cenar.textURL +
          "</a>"
        : ""
    }</spam>
    </footer>`;
  }
}
function creatcover(listscen) {
  let listspams = "";
  listscen.forEach((el) => {
    listspams += `<spam><a href="#${el}">${allscens[el].Name}</a></spam>`;
  });
  return `
<header>
  <h2>Dominus Web</h2>
  <strong class="scenarioauthor"><a href="https://dominusrpg.vercel.app">Dominus Web RPG</a></strong>
  <img src="https://dominusrpg.vercel.app/imgs/dominusweb.png" alt="Imagem padrão do goblim mais Logo do Sistema Dominus" style="width: 400px;">
  <fieldset id="covercatalog">
    <h2>Índice de Cenários</h2>
    <div id="cenlistdiv">
      ${listspams}
    </div>
  </fieldset>
</header>
`;
}
//modo escuro
dlmode.addEventListener("click", () => {
  darkmode.disabled = !darkmode.disabled;
});
