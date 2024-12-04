const nlinestables = 6;
const maxfilesize = 1048576;
const tabletexttrama1 = document.getElementsByClassName("tabletexttrama1");
const tabletexttrama2 = document.getElementsByClassName("tabletexttrama2");
const tabletexttrama3 = document.getElementsByClassName("tabletexttrama3");
const tabletextArquetipos = document.getElementsByClassName(
  "tabletextArquetipos"
);
const tabletextscena1 = document.getElementsByClassName("tabletextscena1");
const tabletextscena2 = document.getElementsByClassName("tabletextscena2");
const tabletextscena3 = document.getElementsByClassName("tabletextscena3");
const tabletextidea1 = document.getElementsByClassName("tabletextidea1");
const tabletextidea2 = document.getElementsByClassName("tabletextidea2");
const tabletextidea3 = document.getElementsByClassName("tabletextidea3");
const tabletextidea4 = document.getElementsByClassName("tabletextidea4");
const btclassfic = document.getElementsByClassName("btclassfic");
const btup = document.getElementsByClassName("btup");
const btdown = document.getElementsByClassName("btdown");
let desc = false;
let sortlist = 0;
let urlbd =
  "https://script.google.com/macros/s/AKfycbwdokFRNJVbnq_-fH-6UB4XZqixeMn6AqYB7c3xSGR0-feAZCHu8_7W1ewcEwVKbK_Wbg/exec";
let listonline = [];
formdata.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const data = new FormData(formdata);
  const datasend = mountobject(data);
  console.log(datasend);
  printobject(datasend);
  sendobject(datasend);
});
function submitform() {
  const data = new FormData(formdata);
  const datasend = mountobject(data);
  console.log(datasend);
  printobject(datasend);
  sendobject(datasend);
}
function mountobject(data) {
  let datasend = {};
  data.forEach((value, key) => {
    if (!Reflect.has(datasend, key)) {
      datasend[key] = value;
      return;
    }
    if (!Array.isArray(datasend[key])) {
      datasend[key] = [datasend[key]];
    }
    datasend[key].push(value);
  });
  datasend.IdeaBank = [];
  for (let i = 0; i < nlinestables; i++) {
    datasend.IdeaBank.push({
      Subject: datasend.Subject[i],
      Action: datasend.Action[i],
      Thing: datasend.Thing[i],
      Quality: datasend.Quality[i],
    });
  }
  datasend.OwnRule = [];
  if (Array.isArray(datasend.OwnRuleName)) {
    for (let i = 0; i < datasend.OwnRuleName.length; i++) {
      datasend.OwnRule.push({
        Name: datasend.OwnRuleName[i],
        description: datasend.OwnRuleNameDescription[i],
      });
    }
  } else {
    datasend.OwnRule.push({
      Name: datasend.OwnRuleName,
      description: datasend.OwnRuleNameDescription,
    });
  }
  delete datasend.Subject;
  delete datasend.Action;
  delete datasend.Thing;
  delete datasend.Quality;
  delete datasend.OwnRuleName;
  delete datasend.OwnRuleNameDescription;
  return datasend;
}
function sendobject(object) {
  fetch(urlbd, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(object),
    mode: "no-cors", // Desativa CORS
  }).then((resp) => {
    if (resp.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + resp.status
      );
      return;
    }
    resp.json().then((data) => {
      console.log(data);
    });
  });
  console.log(object);
}
function createtag() {
  const intag = document.createElement("input");
  intag.type = "text";
  intag.classList.add("texttables");
  intag.name = "Tags";
  tags.appendChild(intag);
}
moretags.addEventListener("click", (event) => {
  event.preventDefault();
  createtag();
});
function createrule() {
  const inrule = document.createElement("div");
  inrule.classList.add("divrule");
  const innamelabel = document.createElement("label");
  innamelabel.innerHTML = "Nome da regra";
  const innameinput = document.createElement("input");
  innameinput.type = "text";
  innameinput.name = "OwnRuleName";
  const indesclabel = document.createElement("label");
  indesclabel.innerHTML = "Descrição da regra";
  const indescinput = document.createElement("input");
  indescinput.type = "text";
  indescinput.name = "OwnRuleNameDescription";
  inrule.appendChild(innamelabel);
  inrule.appendChild(innameinput);
  inrule.appendChild(indesclabel);
  inrule.appendChild(indescinput);
  rules.appendChild(inrule);
}
morerules.addEventListener("click", (event) => {
  event.preventDefault();
  createrule();
});
imgURL.addEventListener("change", () => {
  if (checkUrl(imgURL.value) || imgFile.value) {
    previewcover.src = imgURL.value;
  } else {
    alert("url invalida");
  }
});
imgFile.addEventListener("input", (e) => {
  if (e.target.files.length === 0) return;
  if (e.target.files[0].size > maxfilesize) {
    alert("Arquivo maior que 1 mb, tente outro");
    imgFile.value = "";
  } else {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      imgURL.value = reader.result;
      previewcover.src = reader.result;
    };
  }
  //imgURL.required = (imgFile.value != "") ? false : true;
});
function checkUrl(string) {
  let result;
  try {
    let url = new URL(string);
    result = true;
  } catch (err) {
    result = false;
  }
  return result;
}
function printobject(data) {
  toprint.style.backgroundColor = data.BackgroundColor;
  toprint.style.color = data.TextColor;
  printname.innerHTML = data.Name;
  printnamec.innerHTML = data.Name;
  printcoverimg.src = data.imgURL;
  printauthor.innerHTML = data.Author;
  printurlfont.innerHTML = window.location.href;
  printauthorc.innerHTML = "Escrito por " + data.Author;
  dominuslink.href = window.location.href;
  dominuslogo.src = window.location.origin + "/imgs/logo-dominus.png";
  CClogo.src = window.location.origin + "/imgs/CC-BY-180x65.jpg";
  pAmbience.innerHTML = data.Ambiance;
  for (let i = 0; i < nlinestables; i++) {
    tabletexttrama1[i].innerHTML = data.Occurrence[i];
    tabletexttrama2[i].innerHTML = data.Need[i];
    tabletexttrama3[i].innerHTML = data.Otherwise[i];
    tabletextArquetipos[i].innerHTML = data.Archetypes[i];
    tabletextscena1[i].innerHTML = data.Places[i];
    tabletextscena2[i].innerHTML = data.Characters[i];
    tabletextscena3[i].innerHTML = data.Events[i];
    tabletextidea1[i].innerHTML = data.IdeaBank[i].Subject;
    tabletextidea2[i].innerHTML = data.IdeaBank[i].Action;
    tabletextidea3[i].innerHTML = data.IdeaBank[i].Thing;
    tabletextidea4[i].innerHTML = data.IdeaBank[i].Quality;
  }
  data.OwnRule.forEach((el) => {
    const paragraf = document.createElement("p");
    paragraf.innerHTML = `<strong>${el.Name}: </strong>${el.description}`;
    showOwnRules.appendChild(paragraf);
  });
}
bthelpbox.addEventListener("click", () => {
  helpbox.hidden = !helpbox.hidden;
});
function mounthtml(datasend) {
  return `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="utf-8" />
<meta property="og:title" content="Dominus RPG Solo / ${
    datasend.Name ? datasend.Name : ""
  }" />
<meta property="og:description" content='Cenário ${
    datasend.Name ? datasend.Name : ""
  } para o RPG Solo  Dominus' />
<meta property="og:locale" content="pt-br" />
<meta property="description" content='Cenário ${
    datasend.Name ? datasend.Name : ""
  } para o RPG Solo  Dominus' />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<title>${datasend.Name ? datasend.Name : ""} - Dominus - RPG Solo</title>
<style>
* {color: ${datasend.TextColor ? datasend.TextColor : "black"};}
body {
background-color: ${
    datasend.BackgroundColor ? datasend.BackgroundColor : "white"
  };
max-width: 900px;
}
header {
max-width: 500px
}
header * {
display: flex;
width: 100%;
justify-content: center;
}
header>a {
flex-direction: column;
}
header img {
width: inherit;
}
h3 {
margin: 0;
text-align: center;
}
p {
margin: 0;
text-align: justify;
font-weight: normal;
}
label {
display: block;
font-weight: bold;
}
svg {
width: 32px;
height: 32px;
}
#showtables {
display: flex;
flex-direction: column;
}
th {
background-color: #a9a9a9;
}
td {
background-color: #ffffff80;
}
.tablenumber {
background-color: #a9a9a9;
font-weight: bold;
width: 25px;
}
#showcover {
display: flex;
flex-direction: column;
align-items: center;
}
.modaldiv {
page-break-before: always;
}
#showcover hr {
width: 100%;
}
#showcover>div {
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
}
#showcover>div>img {
height: 65px;
}
#showcover>div>div {
display: flex;
flex-direction: column;
align-items: flex-end;
}
#printcoverimg {
max-width: 600px;
max-height: 800px;
}
#showback {
align-items: center;
text-align: center;
}
.rule {
text-align: justify;
font-weight: normal;
}
.rule * {
display: inline;
}
</style>
</head>
<body>
${toprint.innerHTML}
</body>
</html>
`;
}
tohtml.addEventListener("click", () => {
  const data = new FormData(formdata);
  const datasend = mountobject(data);
  printobject(datasend);
  let link = document.createElement("a");
  let htmltofile = mounthtml(datasend);
  let text = new Blob([htmltofile]);
  let namefile = datasend.Name + "-Dominus.html";
  link.setAttribute("download", namefile);
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  link.href = URL.createObjectURL(text);
  link.click();
});
savelocal.addEventListener("click", () => {
  const data = new FormData(formdata);
  const datasend = mountobject(data);
  let link = document.createElement("a");
  let datafile = new Blob([JSON.stringify(datasend, false, 1)]);
  let namefile = datasend.Name + "-Dominus.json";
  link.setAttribute("download", namefile);
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(datafile)
  );
  link.href = URL.createObjectURL(datafile);
  link.click();
});
opemfilelocal.addEventListener("click", () => {
  fileopem.click();
});
fileopem.addEventListener("change", () => {
  let filelist = new FileReader();
  filelist.readAsText(fileopem.files[0]);
  filelist.onload = async function () {
    datafile = JSON.parse(filelist.result);
    filetoscreem(datafile);
    console.log(fileopem.files[0].name);
  };
  filelist.onerror = function () {
    console.log(filelist.error);
  };
});
function filetoscreem(datafile) {
  console.log(datafile);
  document.getElementsByName("Name")[0].value = datafile.Name;
  document.getElementsByName("Author")[0].value = datafile.Author;
  document.getElementsByName("Ambiance")[0].value = datafile.Ambiance;
  document.getElementsByName("BackgroundColor")[0].value =
    datafile.BackgroundColor;
  document.getElementsByName("TextColor")[0].value = datafile.TextColor;
  document.getElementsByName("imgURL")[0].value = datafile.imgURL;
  previewcover.src = imgURL.value;
  document.getElementsByName("textURL")[0].value = datafile.textURL;
  document.getElementsByName("OtherNotes")[0].value = datafile.OtherNotes;
  document.getElementsByName("Name")[0].value = datafile.Name;
  if (Array.isArray(datafile.Tags)) {
    if (datafile.Tags.length > tags.childElementCount) {
      const count = datafile.Tags.length - tags.childElementCount;
      for (let i = 0; i < count; i++) createtag();
    } else {
      for (let i = datafile.Tags.length; i < tags.childElementCount; i++)
        document.getElementsByName("Tags")[i].value = "";
    }
    datafile.Tags.forEach((ele, ind) => {
      document.getElementsByName("Tags")[ind].value = ele;
    });
  } else {
    document.getElementsByName("Tags")[0].value = datafile.Tags;
    for (let i = 1; i < tags.childElementCount; i++)
      document.getElementsByName("Tags")[i].value = "";
  }
  datafile.Archetypes.forEach((ele, ind) => {
    document.getElementsByName("Archetypes")[ind].value = ele;
  });
  datafile.Occurrence.forEach((ele, ind) => {
    document.getElementsByName("Occurrence")[ind].value = ele;
  });
  datafile.Need.forEach((ele, ind) => {
    document.getElementsByName("Need")[ind].value = ele;
  });
  datafile.Otherwise.forEach((ele, ind) => {
    document.getElementsByName("Otherwise")[ind].value = ele;
  });
  datafile.Places.forEach((ele, ind) => {
    document.getElementsByName("Places")[ind].value = ele;
  });
  datafile.Characters.forEach((ele, ind) => {
    document.getElementsByName("Characters")[ind].value = ele;
  });
  datafile.Events.forEach((ele, ind) => {
    document.getElementsByName("Events")[ind].value = ele;
  });
  datafile.IdeaBank.forEach((ele, ind) => {
    document.getElementsByName("Subject")[ind].value = ele.Subject;
    document.getElementsByName("Action")[ind].value = ele.Action;
    document.getElementsByName("Thing")[ind].value = ele.Thing;
    document.getElementsByName("Quality")[ind].value = ele.Quality;
  });
  if (
    datafile.OwnRule.length > document.getElementsByClassName("divrule").length
  ) {
    const count =
      datafile.OwnRule.length -
      document.getElementsByClassName("divrule").length;
    for (let i = 0; i < count; i++) createrule();
  } else {
    for (
      let i = datafile.OwnRule.length;
      i < document.getElementsByClassName("divrule").length;
      i++
    ) {
      document.getElementsByName("OwnRuleName")[i].value = "";
      document.getElementsByName("OwnRuleNameDescription")[i].value = "";
    }
  }
  datafile.OwnRule.forEach((ele, ind) => {
    document.getElementsByName("OwnRuleName")[ind].value = ele.Name;
    document.getElementsByName("OwnRuleNameDescription")[ind].value =
      ele.description;
  });
}
closeaboutbt.addEventListener("click", closeabout);
btshowabout.addEventListener("click", showabout);
function closeabout() {
  modalabout.classList.add("hiddendiv");
}
function showabout() {
  modalabout.classList.remove("hiddendiv");
}
opemonline.addEventListener("click", listOnlineFiles);
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
function opemfileonline(idscen) {
  console.log("Cenário id: " + idscen);
  getrequest(urlbd + "?type=scen&id=" + idscen, opemfileonlineAux);
}
function opemfileonlineAux(result) {
  modalonline.classList.add("hiddendiv");
  filetoscreem(result);
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
    listOnlineFilesAux(listonline, i + 1, desc);
    if (wordsearche.value) {
      listSort(filterList(wordsearche.value), sortlist, desc);
    }
  });
}
//modo escuro
dlmode.addEventListener("click", () => {
  darkmode.disabled = !darkmode.disabled;
});

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
