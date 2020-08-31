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
  window.location.href = "#abcd";
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
window.onload = function () {
  bot("Hii I am Risp. Your Personal AI assistant");
}


$('.sendbtn').click(function () {
  query = $('#status_message').val();
  document.getElementById('status_message').value = "";
  user(query);
  var url = 'https://chatbot.pythonanywhere.com/askrisp?query=' + query;
  fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => {
    result = result.slice(1,);
    result = result.replace('"',"");
    bot(result);
    })
  .catch(error => console.log('error', error));
  
});
