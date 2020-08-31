var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

var Textbox = $('#status_message');

var instructions = $('#instruction');

var box = $('#voicebox');

var Content = '';

recognition.continuous = false;

recognition.onresult = function(event) {

  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;
 
    Content += transcript;
    Textbox.val(Content);
    $('.sendbtn').click();
  
};

recognition.onstart = function() { 
    box.show();
    Content = '';
    instructions.text('Listning..');
  }
  
  recognition.onspeechend = function() {
    instructions.text('Ending...');
    box.hide();
  }
  
  recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
      instructions.text('Try again.');  
    }
  }



recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text("Some error happened in speech recognitions");
  }
}

$('#start-btn').on('click', function(e) {
  if (Content.length) {
    Content += ' ';
  }
  recognition.start();
});

Textbox.on('input', function() {
  Content = $(this).val();
})