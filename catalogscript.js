let listonline = [];
let allscens = {};
let urlbd =
  "https://script.google.com/macros/s/AKfycbwdokFRNJVbnq_-fH-6UB4XZqixeMn6AqYB7c3xSGR0-feAZCHu8_7W1ewcEwVKbK_Wbg/exec";
//preenche tabelas ao carregar cenário
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
  ids = url.slice((urlbd + "?type=scen&id=").length);
  allscens[ids] = scen;
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
});
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
function htmlcreate(cenar) {
  return `
  <!DOCTYPE html>
  <html lang="pt-br">
    <head>
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
        cenar.Name ? cenar.Name : ""
      } - Dominus - RPG Solo com Multiplos Cenários</title>
      <style>
    @font-face {
      font-family: Lexend;
      src: url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Lexend:wght@100..900&family=Share+Tech&display=swap') format("truetype");
    }

    * {
      color: ${cenar.TextColor ? cenar.TextColor : "black"};
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

    #scenarioauthor {
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
      max-height: 800px;
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
  </style>
  </head>
  <body>
  <header id="cover">
    <h2 id="scenarioname">${cenar.Name}</h2>
    <strong id="scenarioauthor">${cenar.Author}</strong>
    <img id="scenarioimg" src="${
      cenar.imgURL
        ? cenar.imgURL
        : "https://dominusrpg.vercel.app/dominusweb.png"
    }" alt="Imagem do cenário ${cenar.Name}" />
    <p id="scenariondesc">${
      cenar.Ambiance ? cenar.Ambiance : "Um cénario Dominus Web"
    }</p>
    <spam id="scenariotags">${
      cenar.Tags ? "Palavras-chaves: " + cenar.Tags.join(", ") : ""
    }</spam>
    <spam id="scenarionotes">${cenar.OtherNotes}</spam>
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
  </main>
  <footer id="bkcover">
    <fieldset id="rules" class="hiddendiv">
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
    <spam>Fonte: <a href="${window.location.href}">Dominus Web</a></span><br />
    <spam>${cenar.textURL ? "Cenário original: " + cenar.textURL : ""}</spam>
  </footer>
  </body>
  </html>
  `;
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
//modo escuro
dlmode.addEventListener("click", () => {
  darkmode.disabled = !darkmode.disabled;
});
