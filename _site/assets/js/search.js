// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/

// Create the lunr index for the search
var index = elasticlunr(function () {
  this.addField('title')
  this.addField('author')
  this.addField('layout')
  this.addField('content')
  this.setRef('id')
});

// Add to this index the proper metadata from the Jekyll content

index.addDoc({
  title: "Proyecto 2",
  author: null,
  layout: "post",
  content: "segunda prueba proyecto\nLarara.\n",
  id: 0
});
index.addDoc({
  title: "Proyección de la matriz narrativa cronística en el sistema literario bajo medieval castellano",
  author: null,
  layout: "post",
  content: "Código: PICT 2018-0385\nPeríodo: 01/10/2020 y prorrogado hasta el  30/05/2024\nInstitución: Instituto de Investigaciones Bibliográficas y Crítica Textual (IIBICRIT) \nDirector/a: Funes, Leonardo\nGrupo colaborador:\nResumen: El presente proyecto se propone la reconstrucción textual y el estudio formal e ideológico de una serie de textos historiográficos castellanos del período 1285-1400, así como su análisis comparativo con textos narrativos contemporáneos pertenecientes a la épica tardía, la narrativa didáctico-ejemplar y la narrativa caballeresca, con el fin de formular un modelo descriptivo y explicativo de la evolución de una poética del relato histórico en su proyección sobre el sistema de géneros narrativos de la Baja Edad Media castellana. Se trata de la continuación de un Proyecto previo que acaba de finalizar (PICT 2014 “La narrativa histórica medieval castellana de inspiración nobiliaria: edición y estudio formal e ideológico”). Aquí se aprovechan los resultados obtenidos para profundizar una línea de indagación que se ha revelado muy fructífera.\nLíneas de investigación:\n\n",
  id: 1
});

// Builds reference data (maybe not necessary for us, to check)
var store = [{
  "title": "Proyecto 2",
  "author": null,
  "layout": "post",
  "link": "/proyecto2-proyecto/",
}
,{
  "title": "Proyección de la matriz narrativa cronística en el sistema literario bajo medieval castellano",
  "author": null,
  "layout": "post",
  "link": "/Proyecci%C3%B3n-de-la-matriz-narrativa-cron%C3%ADstica-en-el-sistema-literario-bajo-medieval-castellano/",
}
]

// Query
var qd = {}; // Gets values from the URL
location.search.substr(1).split("&").forEach(function(item) {
    var s = item.split("="),
        k = s[0],
        v = s[1] && decodeURIComponent(s[1]);
    (k in qd) ? qd[k].push(v) : qd[k] = [v]
});

function doSearch() {
  var resultdiv = document.querySelector('#results');
  var query = document.querySelector('input#search').value;

  // The search is then launched on the index built with Lunr
  var result = index.search(query);
  resultdiv.innerHTML = "";
  if (result.length == 0) {    
    resultdiv.append(document.createElement('p').innerHTML = 'No results found.');
  } else if (result.length == 1) {
    resultdiv.append(document.createElement('p').innerHTML = 'Found '+result.length+' result');
  } else {
    resultdiv.append(document.createElement('p').innerHTML = 'Found '+result.length+' results');
  }
  // Loop through, match, and add results
  for (var item in result) {
    var ref = result[item].ref;
    res = document.createElement('div')
    res.classList.add("result")
    link = document.createElement('a')
    link.setAttribute('href', '/curso-edicion-digital'+store[ref].link+'?q='+query)
    link.innerHTML = store[ref].title || 'Untitled page'
    p = document.createElement('p')
    p.appendChild(link)
    res.appendChild(p)
    resultdiv.appendChild(res)
  }
}

var callback = function(){
  searchInput = document.querySelector('input#search') 
  if (qd.q) {
    searchInput.value = qd.q[0];
    doSearch();
  }
  searchInput.addEventListener('keyup', doSearch);
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
