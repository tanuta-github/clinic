var swiper=new Swiper(".swiper",{slidesPerView:"auto",spaceBetween:0,loop:!0,touchRatio:.1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});Inputmask().mask(document.querySelectorAll("input")),document.querySelectorAll(".about__btn").forEach(function(e){e.addEventListener("click",function(){document.querySelectorAll(".about__btn").forEach(function(e){e.setAttribute("aria-selected",!1)}),this.setAttribute("aria-selected",!0)})});const choices=new Choices(document.querySelector(".help-form select"),{silent:!1,removeItemButton:!0,searchEnabled:!1,searchChoices:!1,placeholderValue:"Специальность врача",noChoicesText:"Нет специальностей",callbackOnInit:function(){document.querySelector(".help-form select").addEventListener("change",function(){document.querySelector(".help-form input[type=search]").style.display=this.value?"none":"block"}),document.querySelector(".help-form input[type=search]").setAttribute("readonly","true")}}),calendar=e=>{e&&(myCalendar=jsCalendar.new(e)).onDateClick(function(e,t){e.target.closest("div").previousElementSibling.value=jsCalendar.tools.dateToString(t,"DD.MM.YYYY","ru"),myCalendar.set(t)})},bannerPos=(calendar(document.getElementById("calendar")),document.addEventListener("click",function(e){e=e.target.className;"jsCalendar-nav-left"!=e&&"jsCalendar-nav-right"!=e&&"help-form__fields-input calendar-input"!=e&&(document.getElementById("calendar").className="calendar collapse jsCalendar")}),document.getElementById("form-call").addEventListener("submit",e=>{e.preventDefault()}),document.getElementById("footer-popup").addEventListener("submit",e=>{e.preventDefault(),document.querySelector(".footer__popup-form").style.display="none",document.querySelector(".footer__popup-success").style.display="block"}),document.getElementById("popup-call-form").addEventListener("submit",e=>{e.preventDefault(),document.querySelector(".popup-call__container").style.display="none",document.querySelector(".popup-call__success").style.display="block"}),document.addEventListener("scroll",e=>{document.getElementById("scroll-block").className=document.scrollingElement.scrollTop>window.innerHeight?"scroll-block show":"scroll-block";const t=document.querySelector(".header");0<document.scrollingElement.scrollTop?t.classList.add("header-fixed"):t.classList.remove("header-fixed")}),document.querySelector(".header__lang-link, .header__lang-link-active").addEventListener("click",e=>{document.querySelector(".header__lang-link").classList.toggle("opened")}),document.querySelector(".header__xs-search").addEventListener("click",e=>{document.querySelector(".header").classList.toggle("header-search")}),document.querySelector(".header__xs-search-form").addEventListener("submit",e=>{e.preventDefault(),document.querySelector(".header__xs-search-form-input").value?document.querySelector(".search-result").style.display="block":document.querySelector(".header").classList.toggle("header-search")}),document.querySelector(".header__xs-search-form-input").addEventListener("keyup",e=>{var t=document.querySelector(".header__xs-search-form-input").value;document.querySelector(".header__xs-search-form-clear").style.display=t?"block":"none",document.querySelector(".search-result").style.display=t?"block":"none"}),document.querySelector(".header__xs-search-form-clear").addEventListener("click",e=>{document.querySelector(".header__xs-search-form-input").value="",document.querySelector(".header__xs-search-form-clear").style.display="none",document.querySelector(".search-result").style.display="none"}),document.querySelector(".header__xs-menu-icon").addEventListener("click",e=>{const t=document.querySelector(".header");t.classList.toggle("header-open"),t.classList.remove("header-search")}),document.querySelector(".header .close").addEventListener("click",e=>{document.querySelector(".header").classList.toggle("header-open")}),()=>{document.querySelector(".banner").style.marginTop=document.querySelector(".header").offsetHeight+"px"});window.addEventListener("resize",e=>{setTimeout(bannerPos,50)}),bannerPos();