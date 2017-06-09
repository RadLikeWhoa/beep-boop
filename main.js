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
  interactive: true,
  trigger: 'click',
  maxWidth: '320'
})

$('img[usemap]').rwdImageMaps()

$('#fullpage').fullpage({
  anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
  sectionsColor: ['#f5f5f5', '#5e666e', '#f5f5f5', '#5e666e'],
  scrollOverflow: true,
  menu: '#menu',
  slidesNavigation: true,
  navigation: true,
  navigationPosition: 'right',
  allowPageScroll: true
})

Highcharts.chart('chart-demo', {
    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },
    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },
    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            pointStart: 2010
        }
    },
    series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }]
})
