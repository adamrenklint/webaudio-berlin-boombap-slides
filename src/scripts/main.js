var Dilla = require('dilla');

var demos = {
  'metronome': require('./metronome'),
  'boombap-drums': require('./boombap-01'),
  'boombap-plongs': require('./boombap-02'),
  'boombap-strings': require('./boombap-03'),
  'boombap-bass': require('./boombap-04'),
  'slices-sample': require('./slices-01'),
  'slices-drums': require('./slices-02'),
  'slices-full': require('./slices-03')
};
var positionEl = null;

function stopDemo (slide) {
  bap.clock.stop();
}

function startDemo (slide) {
  var name = slide.dataset && slide.dataset.demo;
  var demo = name && demos[name];
  if (demo) {
    demo();
    positionEl = slide.getElementsByClassName('position')[0];
  }
}

function onSlideChanged (event) {
  event.previousSlide && stopDemo(event.previousSlide);
  startDemo(event.currentSlide);
}

function draw () {
  if (positionEl) {
    positionEl.textContent = bap.clock.position;
  }
  window.requestAnimationFrame(draw);
}

if (!~location.href.indexOf('receiver')) {
  draw();
  Reveal.addEventListener( 'slidechanged', onSlideChanged);
  startDemo(Reveal.getCurrentSlide());
}
