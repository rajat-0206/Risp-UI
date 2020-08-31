async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  
   console.log(response.text());
   return("waiting");
}

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  mode: 'no-cors',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};


function gettime(){
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
    '<img alt="User" src="images/user.jpg" class="direct-sender-img">'+
    "</div>";
  $('#chat').append($content);
}
  window.onload = function () {
    bot("Hii I am Risp. Your Personal AI assistant");
  }


  $('.sendbtn').click(function () {
    query = $('#status_message').val();
    document.getElementById('status_message').value = "";
    user(query);
    var url = 'https://chatbot.pythonanywhere.com/askrisp?query='+query;
    // getData(url).then(data=>{
    //   console.log(data);
    //   bot(data);
    // });
  //   fetch("https://chatbot.pythonanywhere.com/askrisp?query=bye", requestOptions)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
  var settings = {
    "url": "https://chatbot.pythonanywhere.com/askrisp?query=bye",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  });
