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
const btclassfic = document.getElementsByClassName("btclassfic");
const btup = document.getElementsByClassName("btup");
const btdown = document.getElementsByClassName("btdown");
const musiccontrol = document.querySelectorAll(".audiobtn");
//variaveis e constantes globais
const audiourl = "./songs/dado-rolando.mp3";
const musicbk = new Audio();
musicbk.loop = true;
musicbk.volume = 0.1;
const musiclist = [
  ["sem audio", ""],
  ["Alegre", "./songs/jigsaw-puzzle-background.mp3"],
];
const MAXROWS = 8;
const TIMELIMIT = 60000;
let scenario = {};
let caracter = { name: "", archetype: "", gamer: "" };
let timeoutnumber = 0;
let listonline = [];
let desc = false;
let sortlist = 0;
let urlbd =
  "https://script.google.com/macros/s/AKfycbwdokFRNJVbnq_-fH-6UB4XZqixeMn6AqYB7c3xSGR0-feAZCHu8_7W1ewcEwVKbK_Wbg/exec";
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
    fillRules();
  }
  showmessage("Carregado cenário: " + scenario.Name);
  showdesc.innerHTML = scenario.Ambiance;
  scenariondesc.innerHTML = scenario.Ambiance;
  showRules();
}
function fillRules() {
  scenario.OwnRule.forEach((el, ind) => {
    const div = document.createElement("div");
    const divs = document.createElement("div");
    const h3 = document.createElement("h3");
    const h3s = document.createElement("h3");
    const article = document.createElement("article");
    const articles = document.createElement("article");
    const brs = document.createElement("br");
    div.classList.add("rule");
    h3.innerText = "Regra X" + (ind + 1) + ": " + el.Name;
    h3s.innerText = "Regra X" + (ind + 1) + ": " + el.Name;
    article.innerText = el.description;
    articles.innerText = el.description;
    div.appendChild(h3);
    divs.appendChild(h3s);
    div.appendChild(article);
    divs.appendChild(articles);
    divs.appendChild(brs);
    rulesx.appendChild(div);
    showrules.appendChild(divs);
  });
  if (scenario.Author) {
    scenarioauthor.innerHTML = scenario.Author;
  }
  if (scenario.imgURL) {
    scenarioimg.src = scenario.imgURL;
  }
  if (scenario.OtherNotes) {
    scenarionotes.innerHTML = scenario.OtherNotes;
    const otNotes = document.createElement("article");
    otNotes.innerHTML = scenario.OtherNotes;
    showrules.appendChild(otNotes);
  }
  if (scenario.textURL) {
    cover.href = scenario.textURL;
  }
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
  textaction.value = "";
});
bnaction.addEventListener("click", () => {
  addParag("Narrador: " + textaction.value);
  showmessage("'" + textaction.value + "'");
  addRow();
  textaction.value = "";
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
//sorteia nova trama
bdoccur.addEventListener("click", () => {
  let result = roolDice();
  addParag("Aconteceu: " + scenario.Occurrence[result - 1]);
  showmessage("Aconteceu: " + scenario.Occurrence[result - 1]);
  addRow();
});
bdneed.addEventListener("click", () => {
  let result = roolDice();
  addParag("Você precisa: " + scenario.Need[result - 1]);
  showmessage("Você precisa: " + scenario.Need[result - 1]);
  addRow();
});
bdother.addEventListener("click", () => {
  let result = roolDice();
  addParag("Senão: " + scenario.Otherwise[result - 1]);
  showmessage("Senão: " + scenario.Otherwise[result - 1]);
  addRow();
});
bdtram.addEventListener("click", () => {
  let result = roolDice();
  addParag(
    "Aconteceu: " +
      scenario.Occurrence[result - 1] +
      ". Você precisa: " +
      scenario.Need[result - 1] +
      ". Senão: " +
      scenario.Otherwise[result - 1]
  );
  showmessage(
    "Aconteceu: " +
      scenario.Occurrence[result - 1] +
      ". Você precisa: " +
      scenario.Need[result - 1] +
      ". Senão: " +
      scenario.Otherwise[result - 1]
  );
  addRow();
});
//sorteia novo arquetípo
bdarch.addEventListener("click", () => {
  let result = roolDice();
  addParag("Arquétipo: " + scenario.Archetypes[result - 1]);
  showmessage("Arquétipo: " + scenario.Archetypes[result - 1]);
  addRow();
});
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
function showRules() {
  showrules.classList.remove("hiddendiv");
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
    .then((resp) => {
      if (resp.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + resp.status
        );
        output.innerText += "\nerro " + resp.status + "\n";
        return;
      }
      resp.json().then((data) => {
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
function listOnlineFilesAux(result, sort = 0, desc = false) {
  listonline = result;
  listSort(listonline, sort, desc);
}
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
  modalonline.classList.remove("hiddendiv");
}
function appendonline(scen) {
  const sline = document.createElement("tr");
  const scolname = document.createElement("td");
  const scolauthor = document.createElement("td");
  const scolkeys = document.createElement("td");
  scolname.innerText = scen[1];
  scolauthor.innerText = scen[2];
  scolkeys.innerText = scen[3].split(",").join(", ");
  sline.value = scen[0];
  sline.addEventListener("click", () => {
    opemfileonline(sline.value);
  });
  sline.appendChild(scolname);
  sline.appendChild(scolauthor);
  sline.appendChild(scolkeys);
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
//ordena tabela
for (let i = 0; i < btclassfic.length; i++) {
  btclassfic[i].addEventListener("click", () => {
    desc = !desc;
    for (let j = 0; j < btup.length; j++) {
      if (j != i) {
        btup[j].classList.add("hiddendiv");
        btdown[j].classList.add("hiddendiv");
      } else {
        if (desc) {
          btup[j].classList.add("hiddendiv");
          btdown[j].classList.remove("hiddendiv");
        } else {
          btup[j].classList.remove("hiddendiv");
          btdown[j].classList.add("hiddendiv");
        }
      }
    }
    sortlist = i + 1;
    listOnlineFilesAux(listonline, sortlist, desc);
    if (wordsearche.value) {
      listSort(filterList(wordsearche.value), sortlist, desc);
    }
  });
}

//modo escuro
dlmode.addEventListener("click", () => {
  darkmode.disabled = !darkmode.disabled;
});

//tirar destaque do menu scenário
let timescen = setInterval(() => {
  if (scenario.Name) {
    clearInterval(timescen);
    menuscen.classList.remove("emphasis");
  } else {
    menuscen.classList.add("emphasis");
    setTimeout(() => {
      menuscen.classList.remove("emphasis");
    }, 3000);
  }
}, 6000);

//filtro de pesquisa
// campo wordsearche botão submitwordsearche
let timefilter;
wordsearche.addEventListener("input", enterwordsearche);
submitwordsearche.addEventListener("click", enterwordsearche);

function enterwordsearche() {
  clearTimeout(timefilter);
  timefilter = setTimeout(() => {
    listSort(filterList(wordsearche.value), sortlist, desc);
  }, 500);
}

function filterList(word) {
  return listonline.filter((el) =>
    el.toString().toLowerCase().includes(word.toLowerCase())
  );
}
//sorteia cenário aleatóriamente (dentro dos filtrados se for o caso)
randomscen.addEventListener("click", () => {
  const tscen = document.querySelectorAll("#tscen>tr");
  const randnumber = Math.floor(Math.random() * tscen.length);
  tscen[randnumber].click();
});

//inserir controle de som ambiente
musiclist.forEach((el) => {
  const opt = document.createElement("option");
  opt.value = el[1];
  opt.innerHTML = el[0];
  audioselect.appendChild(opt);
});
audioselect.addEventListener("change", () => {
  try {
    if (audioselect.value) {
      musicbk.src = audioselect.value;
      musicbk.play();
    } else {
      musicbk.pause();
    }
    console.log(musicbk.src);
  } catch (err) {
    console.log(err);
  }
});
musiccontrol[0].addEventListener("click", function () {
  musicbk.volume = 0;
});
musiccontrol[1].addEventListener("click", function () {
  if (musicbk.volume >= 0.1) {
    musicbk.volume -= 0.1;
  }
});
musiccontrol[2].addEventListener("click", function () {
  if (musicbk.volume <= 0.9) {
    musicbk.volume += 0.1;
  }
});
musiccontrol[3].addEventListener("click", function () {
  musicbk.volume = 1;
});
//inserir salvamento de opções no local storage (modo claro/escuro, som ambiente)
