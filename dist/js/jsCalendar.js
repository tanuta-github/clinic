var jsCalendar=function(){function a(){0===arguments.length||this._construct(arguments)}a.version="v1.4.4",a.prototype._construct=function(e){if(e=this._parseArguments(e),this._setTarget(e.target),this._init(e.options),this._initTarget(),this._setDate(null!==e.date?e.date:this._target.dataset.hasOwnProperty("date")?this._target.dataset.date:new Date),!this._now)throw new Error("jsCalendar: Date is outside range.");this._create(),this._update()},a.prototype.languages={en:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],_dateStringParser:function(e,t){return a._defaultDateStringParser(e,t,this)},_dayStringParser:function(e,t){return a._defaultDayStringParser(e,t,this)}}},a.prototype._init=function(e){this._elements={},this._events={},this._events.date=[],this._events.month=[],this._events.day_render=[],this._events.date_render=[],this._events.month_render=[],this._now=null,this._date=null,this._selected=[],this.language={},this._parseOptions(e)},a.prototype._parseArguments=function(e){var t={target:null,date:null,options:{}};if(0===e.length)throw new Error("jsCalendar: No parameters were given.");if(1===e.length)if(("object"==typeof HTMLElement?e[0]instanceof HTMLElement:e[0])&&"object"==typeof e[0]&&null!==e[0]&&1===e[0].nodeType&&"string"==typeof e[0].nodeName||"string"==typeof e[0])t.target=e[0];else{if(t.options=e[0],void 0===e[0].target)throw new Error("jsCalendar: Not target was given.");t.target=e[0].target,void 0!==e[0].date&&(t.date=e[0].date)}else t.target=e[0],2<=e.length&&(t.date=e[1]),3<=e.length&&(t.options=e[2]);return t},a.options={language:"en",zeroFill:!1,monthFormat:"month",dayFormat:"D",firstDayOfTheWeek:1,navigator:!0,navigatorPosition:"both",min:!1,max:!1,onMonthRender:!1,onDayRender:!1,onDateRender:!1},a.prototype._parseOptions=function(e){this._options={};var t,n={};for(t in a.options)a.options.hasOwnProperty(t)&&(this._options[t]=a.options[t]),e.hasOwnProperty(t)?n[t]=e[t]:this._target.dataset.hasOwnProperty(t)&&(n[t]=this._target.dataset[t]);void 0!==n.zeroFill&&("false"!==n.zeroFill&&n.zeroFill?this._options.zeroFill=!0:this._options.zeroFill=!1),void 0!==n.monthFormat&&(this._options.monthFormat=n.monthFormat),void 0!==n.dayFormat&&(this._options.dayFormat=n.dayFormat),void 0!==n.navigator&&("false"!==n.navigator&&n.navigator?this._options.navigator=!0:this._options.navigator=!1),void 0!==n.navigatorPosition&&(this._options.navigatorPosition=n.navigatorPosition),"string"==typeof n.language&&void 0!==this.languages[n.language]&&(this._options.language=n.language),this.setLanguage(this._options.language),void 0!==n.fdotw&&(n.firstDayOfTheWeek=n.fdotw),void 0!==n.firstDayOfTheWeek&&("number"==typeof n.firstDayOfTheWeek&&1<=n.firstDayOfTheWeek&&n.firstDayOfTheWeek<=7&&(this._options.firstDayOfTheWeek=n.firstDayOfTheWeek),"string"==typeof n.firstDayOfTheWeek&&(n.firstDayOfTheWeek.match(/^[1-7]$/)?this._options.firstDayOfTheWeek=parseInt(n.firstDayOfTheWeek,10):(this._options.firstDayOfTheWeek=this.language.days.indexOf(n.firstDayOfTheWeek)+1,(this._options.firstDayOfTheWeek<1||7<this._options.firstDayOfTheWeek)&&(this._options.firstDayOfTheWeek=1)))),void 0!==n.min&&"false"!==n.min&&!1!==n.min&&(this._options.min=o.parseDate(n.min)),void 0!==n.max&&"false"!==n.max&&!1!==n.max&&(this._options.max=o.parseDate(n.max)),void 0!==n.onMonthRender&&("string"==typeof n.onMonthRender&&"function"==typeof window[n.onMonthRender]?this._on("month_render",window[n.onMonthRender]):"function"==typeof n.onMonthRender&&this._on("month_render",n.onMonthRender)),void 0!==n.onDayRender&&("string"==typeof n.onDayRender&&"function"==typeof window[n.onDayRender]?this._on("day_render",window[n.onDayRender]):"function"==typeof n.onDayRender&&this._on("day_render",n.onDayRender)),void 0!==n.onDateRender&&("string"==typeof n.onDateRender&&"function"==typeof window[n.onDateRender]?this._on("date_render",window[n.onDateRender]):"function"==typeof n.onDateRender&&this._on("date_render",n.onDateRender))},a.prototype._setTarget=function(e){e=o.getElement(e);if(!e)throw new Error("jsCalendar: Target was not found.");this._target=e;e=this._target.id;e&&0<e.length&&(n["#"+e]=this)},a.prototype._initTarget=function(){0<this._target.className.length&&(this._target.className+=" "),this._target.className+="jsCalendar",this._elements.table=document.createElement("table"),this._elements.head=document.createElement("thead"),this._elements.table.appendChild(this._elements.head),this._elements.body=document.createElement("tbody"),this._elements.table.appendChild(this._elements.body),this._target.appendChild(this._elements.table)},a.prototype._isDateInRange=function(e){return!1===this._options.min&&!1===this._options.max||(e=o.parseDate(e),!(!1!==this._options.min&&this._options.min.getTime()>e.getTime())&&!(!1!==this._options.max&&this._options.max.getTime()<e.getTime()))},a.prototype._setDate=function(e){e=o.parseDate(e),this._isDateInRange(e)&&(this._now=e,this._date=new Date(this._now.getFullYear(),this._now.getMonth(),1))},a.prototype._parseToDateString=function(t,e){var n=this.language;return e.replace(/(MONTH|month|MMM|mmm|mm|m|MM|M|DAY|day|DDD|ddd|dd|d|DD|D|YYYY|yyyy)/g,function(e){return n.dateStringParser(e,t)})},a.prototype._getVisibleMonth=function(e){e=void 0===e?this._date:o.parseDate(e);var t=new Date(e.getTime()),n=(t.setDate(1),t.getDay()-(this._options.firstDayOfTheWeek-1)),s=(n<0&&(n+=7),this.language),a=this._options.monthFormat.replace(/(MONTH|month|MMM|mmm|##|#|YYYY|yyyy)/g,function(e){return s.dateStringParser(e,t)}),e=this._getVisibleDates(e),r=new Date(t.getYear()+1900,t.getMonth()+1,0).getDate(),i=-1;return{name:a,days:e,start:n+1,current:i=t.getYear()===this._now.getYear()&&t.getMonth()===this._now.getMonth()?n+this._now.getDate()-1:i,end:n+r}},a.prototype._getVisibleDates=function(e){e=void 0===e?this._date:o.parseDate(e);for(var t=[],e=new Date(e.getTime()),n=(e.setDate(1),e.setHours(0,0,0,0),e.getDay()-(this._options.firstDayOfTheWeek-1)),s=(n<0&&(n+=7),new Date(e.getTime()));0<n;)s.setDate(s.getDate()-1),t.unshift(new Date(s.getTime())),n--;for(s=new Date(e.getTime());t.push(new Date(s.getTime())),s.setDate(s.getDate()+1),1!==s.getDate(););for(var a=42-t.length;0<a;)t.push(new Date(s.getTime())),s.setDate(s.getDate()+1),a--;return t},a.prototype._create=function(){var e,t,n=this;for(this._elements.created=!0,this._elements.headRows=[],e=0;e<2;e++)this._elements.headRows.push(document.createElement("tr")),this._elements.head.appendChild(this._elements.headRows[e]);var s=document.createElement("th");for(s.setAttribute("colspan",7),this._elements.headRows[0].className="jsCalendar-title-row",this._elements.headRows[0].appendChild(s),this._elements.headLeft=document.createElement("div"),this._elements.headLeft.className="jsCalendar-title-left",s.appendChild(this._elements.headLeft),this._elements.month=document.createElement("div"),this._elements.month.className="jsCalendar-title-name",s.appendChild(this._elements.month),this._elements.headRight=document.createElement("div"),this._elements.headRight.className="jsCalendar-title-right",s.appendChild(this._elements.headRight),this._options.navigator&&(this._elements.navLeft=document.createElement("div"),this._elements.navLeft.className="jsCalendar-nav-left",this._elements.navRight=document.createElement("div"),this._elements.navRight.className="jsCalendar-nav-right","left"===this._options.navigatorPosition?(this._elements.headLeft.appendChild(this._elements.navLeft),this._elements.headLeft.appendChild(this._elements.navRight)):(("right"===this._options.navigatorPosition?this._elements.headRight:this._elements.headLeft).appendChild(this._elements.navLeft),this._elements.headRight.appendChild(this._elements.navRight)),this._elements.navLeft.addEventListener("click",function(e){n.previous();var t=new Date(n._date.getTime());t.setDate(1),n._eventFire("month",t,e)},!1),this._elements.navRight.addEventListener("click",function(e){n.next();var t=new Date(n._date.getTime());t.setDate(1),n._eventFire("month",t,e)},!1)),this._elements.headRows[1].className="jsCalendar-week-days",s.className="jsCalendar-title",this._elements.days=[],e=0;e<7;e++)this._elements.days.push(document.createElement("th")),this._elements.headRows[1].appendChild(this._elements.days[this._elements.days.length-1]);for(this._elements.bodyRows=[],this._elements.bodyCols=[],e=0;e<6;e++)for(this._elements.bodyRows.push(document.createElement("tr")),this._elements.body.appendChild(this._elements.bodyRows[e]),t=0;t<7;t++)this._elements.bodyCols.push(document.createElement("td")),this._elements.bodyRows[e].appendChild(this._elements.bodyCols[7*e+t]),this._elements.bodyCols[7*e+t].addEventListener("click",function(t){return function(e){n._eventFire("date",n._active[t],e)}}(7*e+t),!1)},a.prototype._selectDates=function(e){e=e.slice();for(var t=0;t<e.length;t++)e[t]=o.parseDate(e[t]),e[t].setHours(0,0,0,0),e[t]=e[t].getTime();for(t=e.length-1;0<=t;t--)this._selected.indexOf(e[t])<0&&this._selected.push(e[t])},a.prototype._unselectDates=function(e){e=e.slice();for(var t,n=0;n<e.length;n++)e[n]=o.parseDate(e[n]),e[n].setHours(0,0,0,0),e[n]=e[n].getTime();for(n=e.length-1;0<=n;n--)0<=(t=this._selected.indexOf(e[n]))&&this._selected.splice(t,1)},a.prototype._unselectAllDates=function(){for(;this._selected.length;)this._selected.pop()},a.prototype._update=function(){for(var e,t,n=this._getVisibleMonth(this._date),s=(this._active=n.days.slice(),this._elements.month.textContent=n.name,this._options.zeroFill?"0":""),a=n.days.length-1;0<=a;a--)e=n.days[a].getDate(),this._elements.bodyCols[a].textContent=e<10?s+e:e,0<=this._selected.indexOf(n.days[a].getTime())?this._elements.bodyCols[a].className="jsCalendar-selected":this._elements.bodyCols[a].removeAttribute("class");for(a=0;a<n.start-1;a++)this._elements.bodyCols[a].className="jsCalendar-previous";for(0<=n.current&&(0<this._elements.bodyCols[n.current].className.length?this._elements.bodyCols[n.current].className+=" jsCalendar-current":this._elements.bodyCols[n.current].className="jsCalendar-current"),a=n.end;a<n.days.length;a++)this._elements.bodyCols[a].className="jsCalendar-next";for(a=0;a<7;a++){var r=this;this._elements.days[a].textContent=this._options.dayFormat.replace(/(DAY|day|DDD|ddd|DD|dd|D)/g,function(e){return r.language.dayStringParser(e,(a+r._options.firstDayOfTheWeek-1)%7)})}if(0<this._events.month_render.length){var i=n.days[n.start];for(this._elements.month.removeAttribute("style"),t=0;t<this._events.month_render.length;t++)this._events.month_render[t].call(this,i.getMonth(),this._elements.month,{start:new Date(i.getTime()),end:new Date(i.getFullYear(),i.getMonth()+1,0,23,59,59,999),numberOfDays:n.end-n.start+1})}if(0<this._events.day_render.length)for(a=0;a<7;a++)for(this._elements.days[a].removeAttribute("style"),t=0;t<this._events.day_render.length;t++)this._events.day_render[t].call(this,(a+this._options.firstDayOfTheWeek-1)%7,this._elements.days[a],{position:a});if(0<this._events.date_render.length)for(a=0;a<n.days.length;a++)for(this._elements.bodyCols[a].removeAttribute("style"),t=0;t<this._events.date_render.length;t++)this._events.date_render[t].call(this,new Date(n.days[a].getTime()),this._elements.bodyCols[a],{isCurrent:n.current==a,isSelected:0<=this._selected.indexOf(n.days[a].getTime()),isPreviousMonth:a<n.start,isCurrentMonth:n.start<=a&&a<=n.end,isNextMonth:n.end<a,position:{x:a%7,y:Math.floor(a/7)}})},a.prototype._eventFire=function(e,n,s){if(this._events.hasOwnProperty(e))for(var t=0;t<this._events[e].length;t++)!function(e,t){setTimeout(function(){e.call(t,s,new Date(n.getTime()))},0)}(this._events[e][t],this)},a.prototype._on=function(e,t){if("function"!=typeof t)throw new Error("jsCalendar: Invalid callback function.");return this._events[e].push(t),this},a.prototype.onDateClick=function(e){return this._on("date",e)},a.prototype.onMonthChange=function(e){return this._on("month",e)},a.prototype.onDayRender=function(e){return this._on("day_render",e)},a.prototype.onDateRender=function(e){return this._on("date_render",e)},a.prototype.onMonthRender=function(e){return this._on("month_render",e)},a.prototype.set=function(e){return this._setDate(e),this.refresh(),this},a.prototype.min=function(e){return this._options.min=!!e&&o.parseDate(e),this.refresh(),this},a.prototype.max=function(e){return this._options.max=!!e&&o.parseDate(e),this.refresh(),this},a.prototype.refresh=function(e){return void 0!==e&&this._isDateInRange(e)&&(this._date=o.parseDate(e)),!0===this._elements.created&&this._update(),this},a.prototype.next=function(e){"number"!=typeof e&&(e=1);e=new Date(this._date.getFullYear(),this._date.getMonth()+e,1);return this._isDateInRange(e)&&(this._date=e,this.refresh()),this},a.prototype.previous=function(e){"number"!=typeof e&&(e=1);e=new Date(this._date.getFullYear(),this._date.getMonth()-e+1,0);return this._isDateInRange(e)&&(this._date=e,this.refresh()),this},a.prototype.goto=function(e){return this.refresh(e),this},a.prototype.reset=function(){return this.refresh(this._now),this},a.prototype.select=function(e){return void 0===e||(e instanceof Array||(e=[e]),this._selectDates(e),this.refresh()),this},a.prototype.unselect=function(e){return void 0===e||(e instanceof Array||(e=[e]),this._unselectDates(e),this.refresh()),this},a.prototype.clearSelected=a.prototype.clearselect=function(){return this._unselectAllDates(),this.refresh(),this},a.prototype.getSelected=function(e){"object"!=typeof e&&(e={});var t,n=this._selected.slice();if(e.sort&&(!0===e.sort?n.sort():"string"==typeof e.sort&&("asc"===e.sort.toLowerCase()?n.sort():"desc"===e.sort.toLowerCase()&&(n.sort(),n.reverse()))),e.type&&"string"==typeof e.type)if("date"===e.type.toLowerCase())for(t=n.length-1;0<=t;t--)n[t]=new Date(n[t]);else if("timestamp"!==e.type.toLowerCase())for(t=n.length-1;0<=t;t--)n[t]=this._parseToDateString(new Date(n[t]),e.type);return n},a.prototype.isSelected=function(e){return null!=e&&((e=o.parseDate(e)).setHours(0,0,0,0),e=e.getTime(),0<=this._selected.indexOf(e))},a.prototype.isVisible=function(e){if(null==e)return!1;(e=o.parseDate(e)).setHours(0,0,0,0),e=e.getTime();var t=this._getVisibleDates();return t[0].getTime()<=e&&t[t.length-1].getTime()>=e},a.prototype.isInMonth=function(e){if(null==e)return!1;var e=o.parseDate(e),t=(e.setHours(0,0,0,0),e.setDate(1),o.parseDate(this._date));return t.setHours(0,0,0,0),t.setDate(1),e.getTime()===t.getTime()},a.prototype.setLanguage=function(e){if("string"!=typeof e)throw new Error("jsCalendar: Invalid language code.");if(void 0===this.languages[e])throw new Error("jsCalendar: Language not found.");this._options.language=e;e=this.languages[e];return this.language.months=e.months,this.language.days=e.days,this.language.dateStringParser=e._dateStringParser,this.language.dayStringParser=e._dayStringParser,this.refresh(),this},a.autoFind=function(){for(var e=document.getElementsByClassName("auto-jsCalendar"),t=0;t<e.length;t++)"true"!==e[t].getAttribute("jsCalendar-loaded")&&(e[t].setAttribute("jsCalendar-loaded","true"),new a({target:e[t]}))};var o=a.tools={parseDate:function(e,t){if(null==e||"now"===e)e=new Date;else if("string"==typeof e){if(null===(e=e.replace(/-/g,"/").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4,4})$/i))){if(!t)throw new Error("jsCalendar: Failed to parse date.");return null}var n=parseInt(e[2],10)-1;if(!(e=new Date(e[3],n,e[1]))||e.getMonth()!==n){if(!t)throw new Error("jsCalendar: Date does not exist.");return null}}else if("number"==typeof e)e=new Date(e);else if(!(e instanceof Date)){if(!t)throw new Error("jsCalendar: Invalid date.");return null}return new Date(e.getTime())}},n=(o.stringToDate=o.parseDate,o.dateToString=function(e,t,n){var s=a.prototype.languages;return n&&s.hasOwnProperty(n)||(n="en"),a.prototype._parseToDateString.apply({language:{months:s[n].months,days:s[n].days,dateStringParser:s[n]._dateStringParser,dayStringParser:s[n]._dayStringParser}},[e,t])},o.getElement=function(e){if(!e)return null;if("string"==typeof e){if("#"===e[0])return document.getElementById(e.substring(1));if("."===e[0])return document.getElementsByClassName(e.substring(1))[0]}else if(e.tagName&&e.nodeName&&e.ownerDocument&&e.removeAttribute)return e;return null},a.new=function(){var e=new a;return e._construct(arguments),e},{});if(a.set=function(e,t){if(t instanceof a)return n[e]=t,!0;throw new Error("jsCalendar: The second parameter is not a jsCalendar.")},a.get=function(e){return n.hasOwnProperty(e)?n[e]:null},a.del=function(e){return!!n.hasOwnProperty(e)&&(delete n[e],!0)},a.addLanguage=function(n){if(void 0===n)throw new Error("jsCalendar: No language object was given.");if("string"!=typeof n.code)throw new Error("jsCalendar: Invalid language code.");if(!(n.months instanceof Array))throw new Error("jsCalendar: Invalid language months.");if(12!==n.months.length)throw new Error("jsCalendar: Invalid language months length.");if(!(n.days instanceof Array))throw new Error("jsCalendar: Invalid language days.");if(7!==n.days.length)throw new Error("jsCalendar: Invalid language days length.");(a.prototype.languages[n.code]=n)._dateStringParser=n.hasOwnProperty("dateStringParser")?function(e,t){return n.dateStringParser(e,t)||a._defaultDateStringParser(e,t,n)}:function(e,t){return a._defaultDateStringParser(e,t,n)},n._dayStringParser=n.hasOwnProperty("dayStringParser")?function(e,t){return n.dayStringParser(e,t)||a._defaultDayStringParser(e,t,n)}:function(e,t){return a._defaultDayStringParser(e,t,n)}},a._defaultDateStringParser=function(e,t,n){switch(e){case"MONTH":case"month":return n.months[t.getMonth()];case"MMM":case"mmm":return n.months[t.getMonth()].substring(0,3);case"mm":return n.months[t.getMonth()].substring(0,2);case"m":return n.months[t.getMonth()].substring(0,1);case"MM":return(t.getMonth()<9?"0":"")+(t.getMonth()+1);case"M":return t.getMonth()+1;case"##":return(t.getMonth()<9?"0":"")+(t.getMonth()+1);case"#":return t.getMonth()+1;case"DAY":case"day":return n.days[t.getDay()];case"DDD":case"ddd":return n.days[t.getDay()].substring(0,3);case"dd":return n.days[t.getDay()].substring(0,2);case"d":return n.days[t.getDay()].substring(0,1);case"DD":return(t.getDate()<=9?"0":"")+t.getDate();case"D":return t.getDate();case"YYYY":case"yyyy":return t.getYear()+1900}},a._defaultDayStringParser=function(e,t,n){switch(e){case"DAY":case"day":return n.days[t];case"DDD":case"ddd":return n.days[t].substring(0,3);case"DD":case"dd":return n.days[t].substring(0,2);case"D":return n.days[t].substring(0,1)}},void 0!==window.jsCalendar_language2load){for(;window.jsCalendar_language2load.length;)setTimeout(function(e){return function(){a.addLanguage(e)}}(window.jsCalendar_language2load.pop()),0);delete window.jsCalendar_language2load}return window.addEventListener("load",function(){a.autoFind()},!1),a}();