var bap = require('bap');

function metronome () {
  var beep = bap.kit();

  var basic = bap.oscillator({
    attack: 0.001,
    release: 0.1,
    length: 0.08
  });

  beep.slot(1).layer(basic.with({ frequency: 330 }));

  var nextSlot = bap.slot();
  var cloned = basic.with({ frequency: 440 });
  nextSlot.layer(cloned);
  beep.slot(2, nextSlot);

  var pattern = bap.pattern({ bars: 2, tempo: 140 });
  pattern.channel(1).add(
    ['*.1.01', 'A1'],
    ['*.2%1.01', 'A2']
  );

  pattern.kit('A', beep).start();
}

module.exports = metronome;
