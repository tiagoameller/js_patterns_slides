(function(){var c=[].slice;window.KINOUT={slides:0,index:{horizontal:0,vertical:0},dom:function(){var d;d=1<=arguments.length?c.call(arguments,0):[];return typeof $$!=="undefined"&&$$!==null?$$.apply(null,d):$.apply(null,d)},init:function(d){if(d==null)d={};this.Element.init(d);this.Events.init();this.Url.read()}}}).call(this);(function(){KINOUT.Constants={MARKUP:{GLOW:"<div class='glow'></div>",COPYRIGHT:"<div class='copyright'><a href='http://slid.us/'>slid.<span>us</span></a>by tapquo</div>",PROGRESS:{horizontal:"<div class='progress horizontal' value='0' max='100'><span></span></div>",vertical:"<div class='progress vertical' value='0' max='100'><span></span></div>"}},SELECTOR:{KINOUT:".kinout",SLIDE:".kinout > section",SUBSLIDE:".kinout > section.present > article",STEP:"section.present > article.present [data-step]",
STEP_TO_SHOW:":not([data-run='success'])",STEP_TO_HIDE:"[data-run='success']",PROGRESS:{horizontal:".progress.horizontal",vertical:".progress.vertical"}},STYLE:{PAST:"past",PRESENT:"present",FUTURE:"future"}}}).call(this);(function(){KINOUT.Element=function(c){var d,b,f,h,m;b=c.Constants.SELECTOR;d=c.Constants.MARKUP;f={parent:void 0,slides:[],steps:[],progress:{horizontal:void 0,vertical:void 0}};h=function(){var g,i,k,l,e;g=false;e=c.dom(b.STEP+b.STEP_TO_SHOW);k=0;for(l=e.length;k<l;k++){i=e[k];i=c.dom(i);if(i.data("run")!=="success"){i.data("run","success");g=true;break}}return g};m=function(){var g,i,k,l;g=false;l=c.dom(b.STEP+b.STEP_TO_HIDE);for(i=l.length;i>0;){k=c.dom(l[i-1]);if(k.data("run")==="success"){k.data("run",
"");g=true;break}i--}return g};return{init:function(g){f.parent=c.dom(b.KINOUT);g.template&&f.parent.addClass(g.template);return f.parent.prepend(d.GLOW).append(d.COPYRIGHT)},instance:function(){return f.parent},slides:function(){if(!(f.slides.length>0))f.slides=f.parent.children("section");return f.slides},subslides:function(g){return c.dom(f.slides[g]).children("article")},steps:function(g){return g?h():m()},progress:function(g,i){if(g==null)g="horizontal";if(i==null)i=0;if(!f.progress[g]){f.parent.append(d.PROGRESS[g]);
f.progress[g]=f.parent.children(b.PROGRESS[g]).children("span")}f.progress[g].style(g==="horizontal"?"width":"height",""+i+"%")}}}(KINOUT)}).call(this);(function(){KINOUT.Events=function(c,d){var b,f,h,m,g,i,k,l,e;f={KEYDOWN:"keydown",CLICK:"click",TOUCH:"touchstart",HASHCHANGE:"hashchange",MOUSEWHEEL:"mousewheel"};b={LEFT:"left",RIGHT:"right",UP:"up",DOWN:"down"};e=function(){if(d.isMobile())d(document).on(f.TOUCH,k,false);else{d(document).on(f.KEYDOWN,i,false);d(document).on(f.CLICK,g,false);d(document).on(f.MOUSEWHEEL,l,false)}};i=function(a){if(a.keyCode>=37&&a.keyCode<=40){h(a);a.preventDefault()}};k=function(a){if(a.touches.length===1){a.preventDefault();
a={x:a.touches[0].clientX,y:a.touches[0].clientY};m(a)}};g=function(a){if(!d(a.target).closest("a").length){a.preventDefault();m({x:a.clientX,y:a.clientY})}};l=function(){};h=function(a){switch(a.keyCode){case 37:c.Router.direction(b.LEFT);break;case 39:c.Router.direction(b.RIGHT);break;case 38:c.Router.direction(b.UP);break;case 40:c.Router.direction(b.DOWN)}};m=function(a){var j,n;n=window.innerWidth*0.2;j=window.innerHeight*0.2;if(a.x<n)c.Router.direction(b.LEFT);else if(a.x>window.innerWidth-
n)c.Router.direction(b.RIGHT);else if(a.y<j)c.Router.direction(b.UP);else a.y>window.innerHeight-j&&c.Router.direction(b.DOWN)};return{init:function(){e()}}}(KINOUT,Quo)}).call(this);(function(){KINOUT.Router=function(c){var d,b,f,h,m;b={};f=function(){b.horizontal--;c.View.slide(b.horizontal,0,false)};h=function(){b.horizontal++;c.View.slide(b.horizontal,0)};m=function(){b.vertical--;c.View.slide(b.horizontal,b.vertical,false)};d=function(){b.vertical++;c.View.slide(b.horizontal,b.vertical)};return{direction:function(g){b=c.View.index();switch(g){case "left":return f();case "right":return h();case "up":return m();case "down":return d()}}}}(KINOUT)}).call(this);(function(){KINOUT.Step=function(){return{show:function(){return this},hide:function(){}}}(KINOUT)}).call(this);(function(){KINOUT.Url=function(c){return{read:function(){var d,b;d=window.location.hash.slice(2).split("/");b=d[0]?parseInt(d[0]):0;d=d[1]?parseInt(d[1]):0;c.View.slide(b,d)},write:function(d,b){var f;f="/";if(d>0||b>0)f+=d;if(b>0)f+="/"+b;window.location.hash=f}}}(KINOUT)}).call(this);(function(){KINOUT.View=function(c){var d,b,f,h,m,g,i,k,l;d=c.Constants.SELECTOR;b=c.Constants.STYLE;h=c.index;f=function(e,a){g(e[a]);e[a].setAttribute("class",b.PRESENT);e.slice(0,a).map(function(j){return j.setAttribute("class",b.PAST)});return e.slice(a+1).map(function(j){return j.setAttribute("class",b.FUTURE)})};m=function(e,a){h.horizontal=e==null?h.horizontal:e;h.vertical=a==null?h.vertical:a};k=function(){var e;h.horizontal=l(d.SLIDE,h.horizontal);h.vertical=l(d.SUBSLIDE,h.vertical);e=c.Element.slides();
console.error(e.find(".present"))};i=function(){var e,a;e=c.Element.slides();e=parseInt(h.horizontal*100/(e.length-1));c.Element.progress("horizontal",e);a=0;e=c.Element.subslides(h.horizontal);if(e.length>1)a=parseInt((h.vertical+1)*100/e.length);return c.Element.progress("vertical",a)};l=function(e,a){var j;j=Array.prototype.slice.call(document.querySelectorAll(e));if(j.length){a=Math.max(Math.min(a,j.length-1),0);f(j,a)}else a=0;return a};g=function(e){var a,j;a=c.Element.instance();j=e.getAttribute("data-color");
e=e.getAttribute("data-image");if(j){a.style("background-color",j);return a.removeClass("default-color")}else{a.addClass("default-color");return a.style("background-image","url("+e+")")}};return{slide:function(e,a,j){if(j==null)j=true;if(!c.Element.steps(j)){m(e,a);k();i();c.Url.write(h.horizontal,h.vertical)}},index:function(){return{horizontal:h.horizontal,vertical:h.vertical}},render:f}}(KINOUT)}).call(this);
