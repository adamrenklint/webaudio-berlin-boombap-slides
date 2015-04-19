var bap = require('bap');

function boombap () {

  var drumKit = bap.kit();
  drumKit.slot(1).layer('sounds/kick.wav');
  var snare = bap.sample('sounds/snare.wav');
  drumKit.slot(2).layer(snare);
  drumKit.slot(3).layer(1, bap.sample({
    src: 'sounds/hihat.wav',
    volume: 50
  }));

  var boombapPattern = bap.pattern({ bars: 2, tempo: 90 });
  boombapPattern.channel(1).add(
    ['1.1.01', 'A01'],
    ['1.1.51', 'A01', null, 80],
    ['1.1.91', 'A02'],
    ['1.2.88', 'A01'],
    ['1.3.75', 'A01'],
    ['1.3.91', 'A02'],
    ['1.4.72', 'A01', null, 80],
    ['2.1.91', 'A02'],
    ['2.1.51', 'A01', null, 70],
    ['2.3.51', 'A01', null, 80],
    ['2.3.88', 'A01'],
    ['2.4.03', 'A02']
  );

  boombapPattern.channel(2).add(
    ['*.odd.01',  'A03', null, 70],
    ['*.even.01', 'A03', null, 80],
    ['*.4.53',    'A03', null, 60]
  );

  var plongKit = bap.kit();
  plongKit.slot(1).layer(bap.sample({
    src: 'sounds/plong1.wav',
    duration: 95
  }));
  plongKit.slot(2).layer(bap.sample({
    src: 'sounds/plong2.wav',
    duration: 60
  }));

  boombapPattern.channel(3).add(
    ['1.1.01', 'B01'],
    ['1.4.90', 'B02', null, 40],
    ['2.1.52', 'B02', null, 70]
  );

  boombapPattern
    .kit('A', drumKit)
    .kit('B', plongKit)
    .start();
}

module.exports = boombap;
