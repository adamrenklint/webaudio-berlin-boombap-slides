var bap = require('bap');

function slices () {

  var breakKit = bap.sample({
    src: 'sounds/esther.wav',
    pitch: -26
  }).slice(16);
  breakKit.slot(1).layer('sounds/kick.wav');
  breakKit.slot(2).layer('sounds/snare.wav');
  breakKit.slot(4).layer('sounds/snare.wav');

  var pattern = bap.pattern({ bars: 2, tempo: 95 });
  pattern.channel(2).add(
    ['1.1.01', 'B1'],
    ['1.2.01', 'B2'],
    ['1.3.01', 'B3'],
    ['1.4.01', 'B4'],
    ['2.1.01', 'B1'],
    ['2.2.01', 'B2'],
    ['2.3.01', 'B8'],
    ['2.4.01', 'B9'],
    ['2.4.49', 'B5', 48]
  );

  pattern.kit('B', breakKit).start();
}

module.exports = slices;
