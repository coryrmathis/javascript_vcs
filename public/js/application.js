
$(document).ready(function(){
  $("#keychoice").on("submit", function(event){
    event.preventDefault()
    keyNum = parseInt($("#keychoice input[type='radio']:checked").val())
    new Instrument(keyNum)
})


var Instrument = function(keyNum){

  var context = new (window.AudioContext || window.webkitAudioContext)();

  var setupNote = function(frequency){
    var oscillator = context.createOscillator()
    oscillator.frequency.value = frequency
    var gainNode = context.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(context.destination)
    return {oscillator, gainNode, context}
  };

  var playNote = function(noteName){
    noteName.gainNode.gain.value = 1
    noteName.oscillator.start()
    for (var i = .9 ; i >= 0; i -= .1) {
      noteName.gainNode.gain.setValueAtTime(i, noteName.context.currentTime + .2)
    }
  };

  var listenOn = function(id, frequency, letterKey){
      
    $(id).on("click", function(event){
      var note = setupNote(frequency)
      playNote(note)
      // $(id).animate({ opacity: 0.2 }, 1200, 'linear')

    })

    $(document).keyup(function(event){
      if (event.key == letterKey){
        var note = setupNote(frequency)
        playNote(note)
        $(id).animate({ opacity: 0.2 }, 100, 'linear', function(){
          $(this).animate({ opacity: 1 }, 100, 'linear')
        })
     };
    });
  };

// Starts on C3.
  var fullScale = [
      130.81,
      138.59,
      146.83,
      155.56,
      164.81,
      174.61,
      185.00,
      196.00,
      207.65,
      220.00,
      233.08,
      246.94,
      261.63,
      277.18,
      293.66,
      311.13,
      329.63,
      349.23,
      369.99,
      392.00,
      415.30,
      440.00,
      466.16,
      493.88,
      523.25
  ]

  var findMajorKey = function(firstNoteIndex){
    var key = []
    key.push(fullScale[firstNoteIndex])
    key.push(fullScale[firstNoteIndex + 2])
    key.push(fullScale[firstNoteIndex + 4])
    key.push(fullScale[firstNoteIndex + 5])
    key.push(fullScale[firstNoteIndex + 7])
    key.push(fullScale[firstNoteIndex + 9])
    key.push(fullScale[firstNoteIndex + 11])
    key.push(fullScale[firstNoteIndex + 12])
    return key
  };  
  
  // var keyNum = function(){
  //   $("#keychoice").on("submit", function(event){
  //     event.preventDefault()
  //     return $(".key:checked").val()

  //   })
  // }

  var currentKey = findMajorKey(keyNum)

  
  listenOn("#c", currentKey[0], "a")
  listenOn("#d", currentKey[1], "s")
  listenOn("#e", currentKey[2], "d")
  listenOn("#f", currentKey[3], "f")
  listenOn("#g", currentKey[4], "j")
  listenOn("#a", currentKey[5], "k")
  listenOn("#b", currentKey[6], "l")
  listenOn("#c5",currentKey[7], ";")

}

// $(document).ready(function(){
//   $("#keychoice").on("submit", function(evet)n{
//     event.preventDefault()
//     currentInstrument = new Instrument($("#keychoice input[type='radio']:checked").val())
    
//   });
});

