const sprity = require('sprity');

// let list = ['icon', 'pin'];

let options = {
  src: [`./img/*.png`],
  out: './dist',
  orientation: 'vertical',
  processor: 'less',
  style: 'map-btn-info-sprite.less',
  margin: 0,
  prefix: 'map-btn-info'
};

sprity.create(options, function(err) {
    if(err) console.log(err);
    console.log('done');
});
