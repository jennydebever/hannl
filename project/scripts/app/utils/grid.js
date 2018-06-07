/**
 * Toggle demo grid overlay with control + L
 */


var i = 0;
function toggle() {
  if (i % 2 === 0) {
    var $grid = document.createElement('div');
    $grid.classList.add('demo-grid-overlay');
    $grid.innerHTML = '<div class="demo-grid"><div class="demo-grid__item"><span>1</span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span>4</span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span>8</span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span>12</span></div></div>';
    document.body.appendChild($grid);
  } else {
    document.body.removeChild(document.querySelector('.demo-grid-overlay'));
  }
  ++i;
}

window.HAN.grid = toggle;


document.addEventListener('keydown', function(e) {
  if (e.which === 76 && e.ctrlKey) {
    toggle();
  }
}, false);