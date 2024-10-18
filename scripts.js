//elementos html
const stepdivs = document.getElementsByTagName("section");
const ideas = document.getElementsByClassName("idea");
const bideas = document.getElementsByClassName("bidea");
const voiceinputs = document.querySelectorAll(".intebt");
const vinputs = document.querySelectorAll(".inte");
const modaldivs = document.getElementsByClassName("modaldiv");
const svglist = document.querySelectorAll("#divsvgs>svg");
const archetypelist = document.getElementsByClassName("tabletextArquetipos");
const textarchs = document.getElementsByClassName("textarch");
const texttrama1s = document.getElementsByClassName("texttrama1");
const texttrama2s = document.getElementsByClassName("texttrama2");
const texttrama3s = document.getElementsByClassName("texttrama3");
const occurrencelist = document.getElementsByClassName("tabletexttrama1");
const needlist = document.getElementsByClassName("tabletexttrama2");
const otherwiselist = document.getElementsByClassName("tabletexttrama3");
const placeslist = document.getElementsByClassName("tabletextscena1");
const characterslist = document.getElementsByClassName("tabletextscena2");
const eventslist = document.getElementsByClassName("tabletextscena3");
const subjectlist = document.getElementsByClassName("tabletextidea1");
const actionlist = document.getElementsByClassName("tabletextidea2");
const thinglist = document.getElementsByClassName("tabletextidea3");
const qualitylist = document.getElementsByClassName("tabletextidea4");
//variaveis e constantes globais
const audiourl = "./songs/dado-rolando.mp3";
const MAXROWS = 8;
const TIMELIMIT = 60000;
let scenario = {};
let caracter = { name: "", archetype: "", gamer: "" };
let timeoutnumber = 0;
let urlbd =
  "https://script.google.com/macros/s/AKfycbyEj_S-obS0w9-iBPFAfs1R8gMNYj8PFw48iQtUHRWLJmRGEqrnjy476K9UHKOEzIadew/exec";
//implementação
//https://script.google.com/macros/s/AKfycbySDun34b29zLvxnmSHR3ddl5PY9DCZUI5CLHtWsw12yK4SSxCvoo600USH5SATnpreCA/exec
//AKfycbySDun34b29zLvxnmSHR3ddl5PY9DCZUI5CLHtWsw12yK4SSxCvoo600USH5SATnpreCA
//configura links do menu
opemeditor.href = window.location.origin + "/scenariocreate.html";
//redimensionamento de caixas de texto
for (let i = 0; i < vinputs.length; i++) {
  vinputs[i].addEventListener("input", () => {
    resizetextbox(i);
  });
}
function resizetextbox(i) {
  if (vinputs[i].scrollHeight > vinputs[i].offsetHeight && vinputs[i].rows < 3)
    vinputs[i].rows++;
}
//carrega arquivo
filejsonbt.addEventListener("change", function () {
  let filelist = new FileReader();
  filelist.readAsText(filejsonbt.files[0]);
  filelist.onload = function () {
    scenario = JSON.parse(filelist.result);
    console.log(scenario);
    loadedscene();
    fillSheets();
  };
  filelist.onerror = function () {
    console.log(filelist.error);
  };
});
loadScene.addEventListener("click", () => {
  filejsonbt.click();
});
filehbt.addEventListener("change", function () {
  let filelist = new FileReader();
  filelist.readAsText(filehbt.files[0]);
  filelist.onload = function () {
    const doch = document.implementation.createHTMLDocument();
    doch.getElementsByTagName("html")[0].innerHTML = filelist.result;
    const scenarioname = doch.getElementById("scenarioname").innerText;
    console.log(scenarioname);
    console.log(doch);
    if (scenarioname === scenario.Name) {
      historytext.innerHTML = doch.getElementsByTagName("main")[0].innerHTML;
      loadCaracter(doch);
      nextStep(0, 1);
      historydiv.classList.remove("hiddendiv");
      showmessage("História carregada");
    } else {
      showmessage("cenário " + scenarioname + " não está carregado");
    }
  };
  filelist.onerror = function () {
    console.log(filelist.error);
  };
});
function loadCaracter(doch) {
  caracter.name = doch.getElementsByTagName("h3")[1].innerText.split(" ")[1];
  caracter.gamer = doch
    .getElementsByTagName("spam")[1]
    .innerText.split(" ")[2]
    .split("\n")[0];
  caracter.archetype = doch
    .getElementsByTagName("p")[0]
    .innerText.split(" ")[1];
  console.log(caracter);
}
loadhistory.addEventListener("click", () => {
  filehbt.click();
});
//leitura do arquivo
function loadedscene() {
  historytext.innerHTML = "";
  historydiv.classList.add("hiddendiv");
  nextStep(1, 0);
  if (scenario.Name) {
    addTitle("Cenário: " + scenario.Name);
    addRow(2);
    scenarioname.innerHTML = scenario.Name;
  }
  scenario.Archetypes.forEach((el, ind) => {
    textarchs[ind].innerHTML = el;
    textarchs[ind].value = el;
  });
  scenario.Occurrence.forEach((el, ind) => {
    texttrama1s[ind].innerHTML = el;
    texttrama1s[ind].value = el;
  });
  scenario.Need.forEach((el, ind) => {
    texttrama2s[ind].innerHTML = el;
    texttrama2s[ind].value = el;
  });
  scenario.Otherwise.forEach((el, ind) => {
    texttrama3s[ind].innerHTML = el;
    texttrama3s[ind].value = el;
  });
  if (scenario.BackgroundColor)
    if (scenario.TextColor)
      stylefomat.innerHTML = `#historydiv{color:${scenario.TextColor}}
      #historytext{background-color: ${scenario.BackgroundColor}}`;
  if (scenario.OwnRule) {
    scenario.OwnRule.forEach((el, ind) => {
      const div = document.createElement("div");
      const h3 = document.createElement("h3");
      const article = document.createElement("article");
      div.classList.add("rule");
      h3.innerText = "Regra X" + (ind + 1) + ": " + el.Name;
      article.innerText = el.description;
      div.appendChild(h3);
      div.appendChild(article);
      rulesx.appendChild(div);
    });
    if (scenario.Author) {
      scenarioauthor.innerHTML = scenario.Author;
    }
    if (scenario.imgURL) {
      scenarioimg.src = scenario.imgURL;
    }
    if (scenario.OtherNotes) {
      scenarionotes.innerHTML = scenario.OtherNotes;
    }
    if (scenario.textURL) {
      cover.href = scenario.textURL;
    }
  }
  showmessage("Carregado cenário: " + scenario.Name);
}
//Mostra e oculta capa do cenário
scenariohidden.addEventListener("click", () => {
  coverdiv.classList.toggle("hiddendiv");
});
//Mostra e oculta regras do cenário
btrulesbox.addEventListener("click", () => {
  rules.classList.toggle("hiddendiv");
});
//insere arquétipo
btarch.addEventListener("click", () => {
  let dicevalue = roolDice();
  textarch.value = scenario.Archetypes[dicevalue - 1];
});
//insere trama
bttrama1.addEventListener("click", () => {
  let dicevalue = roolDice();
  texttrama1.value = scenario.Occurrence[dicevalue - 1];
});
bttrama2.addEventListener("click", () => {
  let dicevalue = roolDice();
  texttrama2.value = scenario.Need[dicevalue - 1];
});
bttrama3.addEventListener("click", () => {
  let dicevalue = roolDice();
  texttrama3.value = scenario.Otherwise[dicevalue - 1];
});
//cria personagem e trama
fcaracter.addEventListener("click", () => {
  addRow();
  creatCaracter();
  creatTrama();
  addRow();
  nextStep(0, 1);
  historydiv.classList.remove("hiddendiv");
  showmessage("História iniciada");
});
function creatCaracter() {
  caracter.name = cnameinput.value;
  caracter.gamer = cgamerinput.value;
  if (caracter.name) {
    addTitle("Personagem: " + caracter.name);
  }
  caracter.archetype = textarch.value;
  if (caracter.archetype) {
    historytext.value += "Arquétipo: " + caracter.archetype + "\n\n";
    addParag("Arquétipo: " + caracter.archetype);
    addRow(1);
  }
  console.log(caracter);
}
function creatTrama() {
  if (texttrama1.value) {
    addParag("Aconteceu que: " + texttrama1.value);
    addRow();
  }
  if (texttrama2.value) {
    addParag("Você Precisa: " + texttrama2.value);
    addRow();
  }
  if (texttrama3.value) {
    addParag("Senão: " + texttrama3.value);
    addRow();
  }
  addRow();
}
//sorteia lugar
bplaces.addEventListener("click", () => {
  let dicevalue = roolDice();
  addParag("Local: " + scenario.Places[dicevalue - 1]);
  addRow();
  showmessage(
    caracter.name + " esta em '" + scenario.Places[dicevalue - 1] + "'"
  );
});
//sorteia acontecimento
boccur.addEventListener("click", () => {
  let dicevalues = roolTwoDices();
  if (dicevalues[0] < 4) {
    addParag("Personagem: " + scenario.Characters[dicevalues[1] - 1]);
    showmessage(" Apareceu '" + scenario.Characters[dicevalues[1] - 1] + "'");
  } else {
    addParag("Evento: " + scenario.Events[dicevalues[1] - 1]);
    showmessage(" Aconteceu que '" + scenario.Events[dicevalues[1] - 1] + "'");
  }
  addRow();
});
//insere narração
baction.addEventListener("click", () => {
  addParag(caracter.name + ": " + textaction.value);
  showmessage(caracter.name + " fez/disse: '" + textaction.value + "'");
  addRow();
});
//sorteia desafio
bdefiance.addEventListener("click", () => {
  let result = roolDice() > 3 ? "Obteve sucesso" : "Fracassou";
  addParag(caracter.name + ": " + result);
  showmessage(caracter.name + " '" + result + "'");
  addRow();
});
bdefiancev.addEventListener("click", () => {
  let result = Math.max(...roolTwoDices()) > 3 ? "Obteve sucesso" : "Fracassou";
  addParag(caracter.name + ": " + result);
  showmessage(caracter.name + " '" + result + "'");
  addRow();
});
bdefianced.addEventListener("click", () => {
  let result = Math.min(...roolTwoDices()) > 3 ? "Obteve sucesso" : "Fracassou";
  addParag(caracter.name + ": " + result);
  showmessage(caracter.name + " '" + result + "'");
  addRow();
});
//sorteia dilema
bdilema.addEventListener("click", () => {
  let result = roolDice() < 4 ? textdilema1.value : textdilema2.value;
  addParag(caracter.name + ": " + result);
  showmessage(caracter.name + " decidiu: '" + result + "'");
  addRow();
});
//sorteia banco de ideias
bideias.addEventListener("click", () => {
  let dicevalue = roolDice();
  ideas[0].innerHTML = scenario.IdeaBank[dicevalue - 1].Subject;
  ideas[1].innerHTML = scenario.IdeaBank[dicevalue - 1].Action;
  ideas[2].innerHTML = scenario.IdeaBank[dicevalue - 1].Thing;
  ideas[3].innerHTML = scenario.IdeaBank[dicevalue - 1].Quality;
  tableideas.classList.remove("hiddendiv");
  showmessage("Escolha uma ideia para usar na história");
  timeoutnumber = setTimeout(() => {
    tableideas.classList.add("hiddendiv");
  }, TIMELIMIT);
});
for (let i = 0; i < bideas.length; i++) {
  bideas[i].addEventListener("click", () => {
    addParag(ideas[i].innerHTML);
    showmessage("Ideia: '" + ideas[i].innerHTML + "' utilizada");
    addRow();
    tableideas.classList.add("hiddendiv");
    clearTimeout(timeoutnumber);
  });
}
//rola dado avulso
brools.addEventListener("click", () => {
  const dicevalue = roolDice();
  showmessage("Rolagem: " + dicevalue);
  addRow();
});
//salva história em arquivo
savehistory.addEventListener("click", savehtml);
//rolagem de dados
function roolDice(nf = 6, dicetwo = false) {
  let roll = Math.ceil(Math.random() * nf);
  const diceimg = svglist[roll].cloneNode(true);
  diceimg.classList.add("imgdice");
  historytext.appendChild(diceimg);
  new Audio(audiourl).play();
  if (dicetwo) {
    setTimeout(() => {
      new Audio(audiourl).play();
    }, 500);
  }
  showdice.appendChild(diceimg.cloneNode(true));
  showmodal(1);
  return roll;
}
function roolTwoDices(nf = 6) {
  const r1 = roolDice(nf, false);
  const r2 = roolDice(nf, true);
  return [r1, r2];
}

//adciona texto
function addParag(textp) {
  const paragraph = document.createElement("p");
  paragraph.innerHTML = textp;
  historytext.appendChild(paragraph);
  historytext.scrollTop = historytext.scrollHeight;
}
function addTitle(textp) {
  const paragraph = document.createElement("h3");
  paragraph.innerHTML = textp;
  historytext.appendChild(paragraph);
  historytext.scrollTop = historytext.scrollHeight;
}
//aumenta tamanho da caixa de texto
function addRow(rows = 1) {
  for (let i = 0; i < rows; i++)
    historytext.appendChild(document.createElement("br"));
  historytext.scrollTop = historytext.scrollHeight;
}
//alterna tela visivel
function nextStep(hid, vis) {
  stepdivs[hid].classList.add("hiddendiv");
  stepdivs[vis].classList.remove("hiddendiv");
}

// configurar o webkit de reconhecimento de fala
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;
recognition.lang = "pt-BR";
let textvoice = "";
recognition.addEventListener("result", (e) => {
  // mapeamento através da lista de fala para juntar palavras
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  textvoice = text;
});
//configura botões de escuta de fala
for (let i = 0; i < voiceinputs.length; i++) {
  voiceinputs[i].addEventListener("mousedown", (evt) => {
    voiceinputs[i].classList.add("intebtpress");
    recognition.start();
  });
  voiceinputs[i].addEventListener("touchstart", (evt) => {
    evt.preventDefault();
    voiceinputs[i].classList.add("intebtpress");
    recognition.start();
  });
  voiceinputs[i].addEventListener("mouseup", (evt) => {
    voiceinputs[i].classList.remove("intebtpress");
    recognition.stop();
    if (vinputs[i].value) vinputs[i].value += " ";
    vinputs[i].value += textvoice;
    resizetextbox(i);
    textvoice = "";
  });
  voiceinputs[i].addEventListener("touchend", (evt) => {
    evt.preventDefault();
    voiceinputs[i].classList.remove("intebtpress");
    recognition.stop();
    if (vinputs[i].value) vinputs[i].value += " ";
    vinputs[i].value += textvoice;
    resizetextbox(i);
    textvoice = "";
  });
}

// configuração de modal
closemodalbt.addEventListener("click", closemodal);
closeaboutbt.addEventListener("click", closeabout);
btshowabout.addEventListener("click", showabout);
function closemodal() {
  modal.classList.add("hiddendiv");
  for (let i = 0; i < modaldivs.length; i++) {
    modaldivs[i].classList.add("hiddendiv");
  }
  showdice.innerHTML = "";
}
function closeabout() {
  modalabout.classList.add("hiddendiv");
}
function showmodal(index = modaldivs.length - 1) {
  if (index < modaldivs.length) {
    modal.classList.remove("hiddendiv");
    modaldivs[index].classList.remove("hiddendiv");
  } else {
    console.log("divisão do modal inexistente");
  }
}
function showabout() {
  modalabout.classList.remove("hiddendiv");
}
function showmessage(message) {
  showmen.innerHTML = message;
  showmodal(0);
  setTimeout(closemodal, 5000);
}
//preenche tabelas do modal ao carregar cenário
function fillSheets() {
  for (let i = 0; i < 6; i++) {
    if (i < scenario.Archetypes.length) {
      archetypelist[i].innerHTML = scenario.Archetypes[i];
    }
    if (i < scenario.Occurrence.length) {
      occurrencelist[i].innerHTML = scenario.Occurrence[i];
    }
    if (i < scenario.Need.length) {
      needlist[i].innerHTML = scenario.Need[i];
    }
    if (i < scenario.Otherwise.length) {
      otherwiselist[i].innerHTML = scenario.Otherwise[i];
    }
    if (i < scenario.Places.length) {
      placeslist[i].innerHTML = scenario.Places[i];
    }
    if (i < scenario.Characters.length) {
      characterslist[i].innerHTML = scenario.Characters[i];
    }
    if (i < scenario.Events.length) {
      eventslist[i].innerHTML = scenario.Events[i];
    }
    if (i < scenario.IdeaBank.length) {
      subjectlist[i].innerHTML = scenario.IdeaBank[i].Subject;
      actionlist[i].innerHTML = scenario.IdeaBank[i].Action;
      thinglist[i].innerHTML = scenario.IdeaBank[i].Thing;
      qualitylist[i].innerHTML = scenario.IdeaBank[i].Quality;
    }
  }
}
//salvamento da história em arquivo html
function savehtml() {
  let link = document.createElement("a");
  let htmltofile = htmlcreate();
  let text = new Blob([htmltofile]);
  [htmltofile], { type: "text/plain: charset=utf-8" };
  let namefile = scenario.Name + "-" + caracter.name + ".html";
  link.setAttribute("download", namefile);
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  link.href = URL.createObjectURL(text);
  link.click();
}
function htmlcreate() {
  return `
  <!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta charset="utf-8" />
      <meta property="og:title" content="Dominus RPG Solo / ${
        scenario.Name ? scenario.Name : ""
      }" />
      <meta property="og:description" content='História no cenário ${
        scenario.Name ? scenario.Name : ""
      } do RPG Solo  Dominus' />
      <meta property="og:locale" content="pt-br" />
      <meta property="description" content='História no cenário ${
        scenario.Name ? scenario.Name : ""
      } do RPG Solo  Dominus' />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <title>${
        scenario.Name ? scenario.Name : ""
      } - Dominus - RPG Solo com Multiplos Cenários</title>
      <style>
      * {color: ${scenario.TextColor ? scenario.TextColor : "black"};}
      body {
        background-color: ${
          scenario.BackgroundColor ? scenario.BackgroundColor : "white"
        };
        max-width: 900px;
      }
      header {max-width: 500px}
      header * {
        display: flex;
        width: 100%;
        justify-content: center;
      }
      header > a {flex-direction: column;}
      header img {width: inherit;}
      h3 {
        margin: 0;
        text-align: center;
      }
      p {
        margin: 0;
        display: inline;
      }
      svg {
        width: 32px;
        height: 32px;
      }
      </style>
  </head>
  <body>
  <header>
  <a ${cover.src ? 'src="' + cover.src + '"' : ""}>${cover.innerHTML}</a>
  </header>
  <hr/>
  <main>${
    historytext.innerHTML
  }</main><!--historytext.value.replaceAll("\n", "<br/>")-->
  <hr/>
  <spam>${
    caracter.gamer ? "Jogado por: " + caracter.gamer : "Jogador anônimo"
  }<\spam>
  <br/>
  <footer>
  <spam>Data do jogo/história: ${Date().toLocaleString()}</spam><br/>
  <spam>História produzida via <a href="${
    window.location.href
  }">Dominus Web</a></span>
  </footer>
  </body>
  </html>
  `;
}
//exporta da história em arquivo diversos
tohtml.addEventListener("click", savehtml);
tosvg.addEventListener("click", savesvg);
function savesvg() {
  const link = document.createElement("a");
  historytext.style.maxHeight = "none";
  htmlToImage.toSvg(historytext).then(function (dataUrl) {
    link.download = scenario.Name + ".svg";
    link.href = dataUrl;
    link.click();
    historytext.style = "";
    historytext.scrollTop = historytext.scrollHeight;
  });
}
topng.addEventListener("click", savepng);
function savepng() {
  const link = document.createElement("a");
  historytext.style.maxHeight = "none";
  htmlToImage.toPng(historytext).then(function (dataUrl) {
    link.download = scenario.Name + ".png";
    link.href = dataUrl;
    link.click();
    historytext.style = "";
    historytext.scrollTop = historytext.scrollHeight;
  });
}
tojpeg.addEventListener("click", savejpeg);
function savejpeg() {
  const link = document.createElement("a");
  historytext.style.maxHeight = "none";
  htmlToImage.toJpeg(historytext).then(function (dataUrl) {
    link.download = scenario.Name + ".jpeg";
    link.href = dataUrl;
    link.click();
    historytext.style = "";
    historytext.scrollTop = historytext.scrollHeight;
  });
}
async function getrequest(url, funcAux) {
  timediv.classList.remove("hiddendiv");
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        output.innerText += "\nerro " + response.status + "\n";
        return;
      }
      response.json().then((data) => {
        funcAux(data.body);
        timediv.classList.add("hiddendiv");
      });
    })
    .catch((err) => {
      console.log("Fetch Error :-S", err);
    });
}
opemonline.addEventListener("click", listOnlineFiles);
function listOnlineFiles() {
  getrequest(urlbd + "?type=list", listOnlineFilesAux);
}
function listOnlineFilesAux(result) {
  listonline = result;
  console.log(listonline);
  tscen.innerHTML = "";
  listonline.forEach((el) => {
    appendonline(el);
  });
  modalonline.classList.remove("hiddendiv");
}
function appendonline(scen) {
  const sline = document.createElement("tr");
  const scolname = document.createElement("td");
  const scolauthor = document.createElement("td");
  const scolkeys = document.createElement("td");
  const scolbt = document.createElement("td");
  const scenbt = document.createElement("button");
  scolname.innerText = scen[1];
  scolauthor.innerText = scen[2];
  scolkeys.innerText = scen[3];
  scenbt.innerText = "abrir";
  scenbt.value = scen[0];
  scenbt.addEventListener("click", () => {
    opemfileonline(scenbt.value);
  });
  scolbt.appendChild(scenbt);
  sline.appendChild(scolname);
  sline.appendChild(scolauthor);
  sline.appendChild(scolkeys);
  sline.appendChild(scolbt);
  tscen.appendChild(sline);
}
closeonlinebt.addEventListener("click", closeonline);
function closeonline() {
  modalonline.classList.add("hiddendiv");
}
function opemfileonline(idscen) {
  console.log("Cenário id: " + idscen);
  getrequest(urlbd + "?type=scen&id=" + idscen, opemfileonlineAux);
}
function opemfileonlineAux(result) {
  scenario = result;
  console.log(scenario);
  loadedscene();
  fillSheets();
  closeonline();
}
/*
Falta
- comentários disqus
*/
