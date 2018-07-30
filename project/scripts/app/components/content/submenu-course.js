var menu = document.getElementById('homeBar');

function setBottom() {
  var homeBar = document.getElementById('homeBar');

  if (homeBar.classList.contains('bottom')) {
    homeBar.classList.remove('bottom');
    document.getElementById('submenu').classList.remove('bottom');
    // document.getElementsByClass('icon').classList.remove('bottom');
  }
  else {
    homeBar.classList.add('bottom');
    document.getElementById('submenu').classList.add('bottom');
    // document.getElementsByClass('icon').classList.add('bottom');
  }
}

function toggleMenu() {
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var hiddenItems = document.querySelectorAll('.hide');

  if(width <= 991) {
    setBottom();
  }

  for (var i = 0; i < hiddenItems.length; i++) {
    var element = hiddenItems[i];

    if (element.classList.contains('show')) {
      element.classList.remove('show');
    }
    else {
      element.classList.add('show');
    }
  }
}

menu.addEventListener( "click", function(event) {
    event.stopPropagation();
    toggleMenu();
});
