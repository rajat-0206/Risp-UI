var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
function gettime() {
  var now = new Date();
  now.setHours(now.getHours());
  var isPM = now.getHours() >= 12;
  var isMidday = now.getHours() == 12;
  var time = [now.getHours() - (isPM && !isMidday ? 12 : 0),
  now.getMinutes(),
  ].join(':') +
    (isPM ? ' pm' : 'am');
  return time;
}

function bot(msg) { /*change*/
  var $content = "<div class='direct-chat-msg'>" +
    '<img alt="iamgurdeeposahan" src="images/logo.png" class="direct-chat-img">' +
    '<div class="direct-chat-text">' +
    msg +
    '<span class="direct-chat-timestamp pull-right">' + gettime() +
    '</span>' +
    "</div>" +
    "</div>";
  $('#chat').append($content);
}

function user(msg) { /*change*/
  var $content = "<div class='direct-sender'>" +
    '<div class="direct-sender-text">' +
    msg +
    '<span class="direct-sender-timestamp pull-left">' + gettime() +
    '</span>' +
    "</div>" +
    '<img alt="User" src="images/user.jpg" class="direct-sender-img">' +
    "</div>";
  $('#chat').append($content);
  t = document.getElementById("chat");
  t.scrollTop = t.scrollHeight;
}


function textToAudio(msg) {

  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";

  speech.text = msg;
  speech.volume = 2;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

window.onload = function () {
  bot("Hii I am Risp. Your Personal AI assistant");
  textToAudio("Hii I am Risp. Your Personal AI assistant");
}

function thinking() {
  var $content = '<div class="direct-chat-msg" id="temploader">' +
    '<img alt="iamgurdeeposahan" src="images/logo.png" class="direct-chat-img">' +
    '<div class="direct-chat-text">' +
    '<div class="animation">' +
    '<div id="loader21" class="dot"></div>' +
    '<div id="loader22" class="dot"></div>' +
    '<div id="loader23" class="dot"></div>' +
    '<div id="loader24" class="dot"></div>' +
    '<div class="w3-small w3-text-black w3display-middle" id="loadingtext"></div>'+
    ' </div></div> </div>';
  $('#chat').append($content);
}


$('.sendbtn').click(function () {
  query = $('#status_message').val();
  if (query == "") return;
  document.getElementById('status_message').value = "";
  user(query);
  window.location.href = "#abcd";
  var url = 'https://chatbot.pythonanywhere.com/askrisp?query=' + query;
  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
      result = result.slice(1,);
      result = result.replace('"', "");
      $("#temploader").remove();
      bot(result);
      textToAudio(result);
      window.location.href = "#abcd";
    })
    .catch(error => console.log('error', error));
    setTimeout(() => {
      thinking();
      window.location.href = "#abcd";
    }, 300);
    setTimeout(() => {
      $("#loadingtext").html("This is taking long...");
    },12000);
});
