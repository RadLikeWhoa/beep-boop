var navState = 'left'
var navItems = document.querySelectorAll('.nav-item')
var scrollWrap = document.getElementById('scroll-wrap')

var sectionEL = document.getElementById('eternal-life')
var sectionC = document.getElementById('cyborgs')

var words = document.querySelectorAll('.cloud-item')

function toggle () {
  scrollWrap.style.transform = navState === 'left' ? 'translateX(-50%)' : 'translateX(0%)'
  navState = navState === 'left' ? 'right' : 'left'
}

for (item of navItems) {
  item.addEventListener('click', toggle)
}

window.addEventListener('keyup', function (e) {
  if (e.keyCode === 37) {
    navState = 'right'
    toggle()
  } else if (e.keyCode === 39) {
    navState = 'left'
    toggle()
  }
})

for (item of words) {
  var term = item.querySelector('.term')
  var hidden = item.querySelector('.hidden')

  if (hidden) {
    hidden.style.width = term.offsetWidth + 'px'
  }

  item.addEventListener('click', function (e) {
    var active = document.querySelector('.cloud-item.active')

    if (active) {
      active.classList.remove('active')
    }

    var target = e.target

    while (target && !target.classList.contains('cloud-item')) {
      target = target.parentNode
    }

    if (active === target) return

    target.classList.add('active')

    setTimeout(function () {
      var element = navState === 'left' ? sectionEL : sectionC

      if (target.offsetTop + target.offsetHeight > element.scrollTop + window.innerHeight) {
        scrollTo(element, target)
      }
    }, 250)
  })
}

function scrollTo (element, target) {
  if (!('requestAnimationFrame' in window)) {
    return
  }

  var current = element.scrollTop
  var time = 0
  var percentage = 0
  var raf
  position = target.offsetTop - 24

  function easing (time) {
    return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time
  }

  function scroll () {
    percentage = (time += 60) / 3000

    current += (position > current ? 1 : -1) * ((Math.abs(current - position)) * easing(Math.min(1, percentage)))
    element.scrollTo(0, Math.floor(current))

    if (Math.abs(current - position) > 0) {
      raf = requestAnimationFrame(scroll)
    }
  }

  raf = requestAnimationFrame(scroll)
}

$('map area').tooltipster({
  theme: 'tooltipster-light',
  trigger: 'click',
  maxWidth: '320'
})

$('img[usemap]').rwdImageMaps()
