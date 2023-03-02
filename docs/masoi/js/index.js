/*
 * The JS file that sets up the UI and initiates everything 
 */
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
});

//the data instance shared
var data = Object.create(Data.prototype);

document.addEventListener("touchstart", function() {},false); // add this junk to make iOS observe the :active state for touch

jQuery(document).ready(function(){
	fix_multiple();
	load_card("cards/setup.html", "cards/setup.js");
});

function load_card(url_to_html, url_to_js){
	jQuery.get(url_to_html, function(data){
		jQuery("#swipe-wrap").append(data);
		swiper = new Swiper('.swiper-container', {
		    pagination: '.swiper-pagination',
		    paginationClickable: true,
		});
		if (url_to_js!=""){
			jQuery.getScript(url_to_js);
		}
	});	
}

function fix_multiple(){
   jQuery('select').on('mousedown touchstart MSPointerDown', function(e){
           e.stopPropagation();
   }); 
}

function load_card_html(html, url_to_js){
	jQuery("#swipe-wrap").append(html);
	if (url_to_js!=""){
		jQuery.getScript(url_to_js);
	}
}

function remove_card(card_css){
	swiper.slideTo(0);//reset the swiper
	jQuery(card_css).remove();
	swiper.destroy();//destroy the old swiper
}