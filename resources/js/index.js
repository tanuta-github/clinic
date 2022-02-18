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
document.querySelectorAll(".about__btn").forEach(function (elem) { 
  elem.addEventListener("click", function(){
    document.querySelectorAll(".about__btn").forEach(function (el) { 
      el.setAttribute("aria-selected", false);
    })
    this.setAttribute("aria-selected", true);
    
  })
})
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









