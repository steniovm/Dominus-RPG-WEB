let listonline = [];
let allscens = {};
let urlbd =
  "https://script.google.com/macros/s/AKfycbwdokFRNJVbnq_-fH-6UB4XZqixeMn6AqYB7c3xSGR0-feAZCHu8_7W1ewcEwVKbK_Wbg/exec";
//preenche tabelas ao carregar cenário
function fillSheets() {}
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
  const printbt = document.createElement("img");
  const arrowup = document.createElement("img");
  const arrowdown = document.createElement("img");
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
  //simg.appendChild(printbt);
  simg.appendChild(ssimg);
  stitle.innerHTML = scen.Name;
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
//modo escuro
dlmode.addEventListener("click", () => {
  darkmode.disabled = !darkmode.disabled;
});
