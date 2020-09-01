/* Start IndexDB functions  */
async function getAllData() {
  var result = idb.select("Messages", function (isSelected, responseData) {
    if (isSelected) {
      textToAudio("Loading Previous Message");
      $("#chat").empty();
      for(i in responseData){
        if(responseData[i]['id']=="bot"){
          bot(responseData[i]['message'],samay=responseData[i]['time']);
        }
        else{
          user(responseData[i]['message'],samay=responseData[i]['time'],flag="no");
        }
      }
      bot("Hii I am Risp. Your Personal AI assistant");
    }
    else {
      return false;
    }
  });
}

async function addOneData(_id,_message, _time) {
  var key = idb.select("Messages", function (isSelected, responseData) {
    if (isSelected) {
      idb.insert("Messages", {id:_id,message:_message,time:_time,ID:responseData.length+1});
      }
    else{
      idb.insert("Messages", {id:_id,message:_message,time:_time,ID:1});
    }
    });
  
}

async function deleteAllData() {
  $('#chat').empty();
  var result = idb.delete("Messages", function (isDeleted, responseText) {
    if (isDeleted) {
      textToAudio("Chat history cleared");
        return;

    }
    else {
      return;
    }
  });
}



/* IndexDB ended */

/* Confirm Dialogue box */

function Confirm(title, msg, $true, $false,refreshCallback) { /*change*/
  var $content =  "<div class='dialog-ovelay'>" +
                  "<div class='dialog'><header>" +
                   " <h3> " + title + " </h3> " +
                   "<i class='fa fa-close'></i>" +
               "</header>" +
               "<div class='dialog-msg'>" +
                   " <p> " + msg + " </p> " +
               "</div>" +
               "<footer>" +
                   "<div class='controls'>" +
                       " <button class='button button-danger doAction'>" + $true + "</button> " +
                       " <button class='button button-default cancelAction'>" + $false + "</button> " +
                   "</div>" +
               "</footer>" +
            "</div>" +
          "</div>";
   $('body').prepend($content);
$('.doAction').click(function () {
  refreshCallback();/*new*/
  $(this).parents('.dialog-ovelay').fadeOut(500, function () {
    $(this).remove();
  });
});
$('.cancelAction, .fa-close').click(function () {
  $(this).parents('.dialog-ovelay').fadeOut(500, function () {
    $(this).remove();
    return false;
  });
});

}

// Confirm dialogue ended


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

function bot(msg,samay="") { /*change*/
  if(samay==""){
    samay = gettime();
  }
  var $content = "<div class='direct-chat-msg'>" +
    '<img alt="iamgurdeeposahan" src="images/logo.png" class="direct-chat-img">' +
    '<div class="direct-chat-text">' +
    msg +
    '<span class="direct-chat-timestamp pull-right">' + samay +
    '</span>' +
    "</div>" +
    "</div>";
  $('#chat').append($content);
}

function user(msg,samay="",flag="yes") { /*change*/
  if(samay==""){
    samay= gettime();
  }
  var $content = "<div class='direct-sender'>" +
    '<div class="direct-sender-text">' +
    msg +
    '<span class="direct-sender-timestamp pull-left">' + samay +
    '</span>' +
    "</div>" +
    '<img alt="User" src="images/user.jpg" class="direct-sender-img">' +
    "</div>";
    if(flag!="no"){
  addOneData("user",msg,gettime());
    }
  $('#chat').append($content);
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

// window.onload = function () {
//   bot("Hii I am Risp. Your Personal AI assistant");
//   textToAudio("Hii I am Risp. Your Personal AI assistant");
// }

function thinking() {
  var $content = '<div class="direct-chat-msg" id="temploader">' +
    '<img alt="iamgurdeeposahan" src="images/logo.png" class="direct-chat-img">' +
    '<div class="direct-chat-text">' +
    '<div class="animation">' +
    '<div id="loader21" class="dot"></div>' +
    '<div id="loader22" class="dot"></div>' +
    '<div id="loader23" class="dot"></div>' +
    '<div id="loader24" class="dot"></div>' +
    '<div class="w3-small w3-text-black w3display-middle" id="loadingtext"></div>' +
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
      addOneData("bot",result,gettime());
      window.location.href = "#abcd";
    })
    .catch(error => console.log('error', error));
  setTimeout(() => {
    thinking();
    window.location.href = "#abcd";
  }, 300);
  setTimeout(() => {
    $("#loadingtext").html("This is taking long...");
  }, 12000);
});

$("#deleteall").click(()=>{
  flag =  Confirm("Delete All Chat | Risp", "Do you really want to delete all messages?","Yes","Cancel",deleteAllData);
})
window.onload = function () {
  idb.init({
    database: "ChatHistory",
    version: 1,
    tables: [
      {
        name: "Messages",
        keyPath: "ID",
        autoIncrement: false,
        index: [{ name: "title", unique: false }]
      }
    ]
  });
  bot("Hii I am Risp. Your Personal AI assistant");
  textToAudio("Hii I am Risp. Your Personal AI assistant");
}

$("#loadprev").click(()=>{
  getAllData();

});