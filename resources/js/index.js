var swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  loop: true,
  touchRatio: 0.1,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
})
/********************/
Inputmask().mask(document.querySelectorAll("input"))
/********************/
const choices = new Choices(document.querySelector('.help-form select'), {
  silent:false,
  removeItemButton:true,
  searchEnabled: false,
  searchChoices: false,
  placeholderValue: "Специальность врача",
  noChoicesText: 'Нет специальностей',
  callbackOnInit: function(){
    document.querySelector('.help-form select').addEventListener("change", function(){
      document.querySelector('.help-form input[type=search]').style.display = (this.value) ? "none" : "block"
    })
    document.querySelector('.help-form input[type=search]').setAttribute('readonly', 'true')
  }})

/********************/
const calendar = el => {
    if (!el) return
    myCalendar = jsCalendar.new(el)
    myCalendar.onDateClick(function(event, date){
       event.target.closest('div').previousElementSibling.value=jsCalendar.tools.dateToString(date, 'DD.MM.YYYY', 'ru')
       myCalendar.set(date)
    })
}
calendar(document.getElementById("calendar"))
document.addEventListener("click", function(event){
  const c = event.target.className
  if (!(c == 'jsCalendar-nav-left' || c == 'jsCalendar-nav-right' || c == 'help-form__fields-input calendar-input'))
    document.getElementById("calendar").className = "calendar collapse jsCalendar"
})
/*******************/
let timer;
document.getElementById("form-call").addEventListener("submit", event => {
  event.preventDefault();
  let sec = 30;
  clearInterval(timer)
  timer = setInterval(() => {
    sec -= 1
    if (sec >= 0) {
      if (sec < 10) sec = '0'+ sec
      document.querySelector(".form-call__timer .orange").innerHTML = sec
    } else {
      clearInterval(timer)
    }
  }, 1000)
  
})
/***************** */
document.getElementById("footer-popup").addEventListener("submit", event => {
  event.preventDefault();
  document.querySelector('.footer__popup-form').style.display = 'none'
  document.querySelector('.footer__popup-success').style.display = 'block'
})
/*****************/ 
document.getElementById("popup-call-form").addEventListener("submit", event => {
  event.preventDefault();
  document.querySelector('.popup-call__container').style.display = 'none'
  document.querySelector('.popup-call__success').style.display = 'block'
})

/*****************/
document.addEventListener("scroll", event => {
  document.getElementById('scroll-block').className = (document.scrollingElement.scrollTop > window.innerHeight) ? "scroll-block show" : "scroll-block"
  const header = document.querySelector('.header')
  if (document.scrollingElement.scrollTop > 0) header.classList.add('header-fixed'); else  header.classList.remove('header-fixed')
  
})
/***************/
document.querySelector('.header__lang-link, .header__lang-link-active').addEventListener('click', e => {
  document.querySelector('.header__lang-link').classList.toggle('opened')
})

/*************/
document.querySelector('.header__xs-search').addEventListener('click', e => {
  document.querySelector('.header').classList.toggle('header-search')
})

document.querySelector('.header__xs-search-form').addEventListener('submit', e => {
  e.preventDefault()
  const v = document.querySelector('.header__xs-search-form-input').value
  if (!v) document.querySelector('.header').classList.toggle('header-search') 
  else {
    document.querySelector('.search-result').style.display = 'block'
  }
})

document.querySelector('.header__xs-search-form-input').addEventListener('keyup', e => {
  const v =  document.querySelector('.header__xs-search-form-input').value
  document.querySelector('.header__xs-search-form-clear').style.display = (v) ? 'block' : 'none'
  document.querySelector('.search-result').style.display = (v) ? 'block' : 'none'
})

document.querySelector('.header__xs-search-form-clear').addEventListener('click', e => {
    document.querySelector('.header__xs-search-form-input').value = ''
    document.querySelector('.header__xs-search-form-clear').style.display = 'none'
    document.querySelector('.search-result').style.display = 'none'
})
/*******************/
document.querySelector('.header__xs-menu-icon').addEventListener('click', e => {
  const el = document.querySelector('.header')
  el.classList.toggle('header-open')
  el.classList.remove('header-search')
  
})
document.querySelector('.header .close').addEventListener('click', e => {
  document.querySelector('.header').classList.toggle('header-open')
})
/****************/
const bannerPos = () => {
  document.querySelector('.banner').style.marginTop = document.querySelector('.header').offsetHeight + "px"
}
window.addEventListener('resize', e => {
  setTimeout(bannerPos,50);
});
bannerPos();
