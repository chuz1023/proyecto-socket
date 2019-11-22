var socket = io.connect('http://192.168.61.75:8082',{ 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  render(data);
})

function render (data) {
  var html = data.map(function(elem, index) {
    let html_string= string_expresion(elem.text);
    return(`<div style="background-color:white; font-size:25px;" class = "container-elements">
              <strong class="autor">${elem.author}</strong>:
              <em class="menssage">${elem.text}</em>
            </div> ${html_string}`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value    
  };
  socket.emit('new-message', message);
  return false;
}

let string_expresion = (date) => {

 //Expresiones 
let varVocal= date.match(/[aeiouAEIOUáéíóú]/gim,"");
let varPalabra = date.match(/[^\s\d]+/g, "");
let varMay = date.match(/(\b[A-Z|ÁÉÍÓÚ])[a-z|áéíóú|A-Z|ÁÉÍÓÚ]*/g);
let varNumero = date.match(/[0-9\b]/g,"");
let varNvocal = date.match(/[^aeiou\W\d]\b/g, "");;

//Condicionales
if(varVocal === null){Tvocal = 0;}else {Tvocal = varVocal.length;}
if(varPalabra === null){Tpalabras = 0;}else{Tpalabras = varPalabra.length;}
if(varMay === null){Tmayus = 0;}else{Tmayus = varMay.length;}
if(varNumero === null){Tnumero = 0;}else{Tnumero = varNumero.length;}
if(varNvocal === null){Tnvocales = 0;}else{Tnvocales = varNvocal.length;}

//Retorna
 return `<p class="respuestas" > 
         <pre>
          <strong " class="texto">  Vocales Recibidas: </strong> 
          <em class="infor">${Tvocal}</em>

          <strong "class="texto"> Palabras Recibidas: </strong> 
          <em class="infor">${Tpalabras}</em>

          <strong  "class="texto">Cantida de Numeros: </strong>
          <em class="infor">${Tnumero}</em>

          <strong  "class="texto"> inician en mayuscula: </strong>
          <em class="infor">${Tmayus}</em>

          <strong "class="texto">  terminacion no vocal: </strong>
          <em class="infor">${Tnvocales}</em></pre>
          `;
}



