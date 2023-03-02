jQuery(document).ready(function(){
	jQuery('body').on('click', '#intro_button', function () {
		data.role_count.god = parseInt(jQuery("#num_god").val());
		data.role_count.witch = parseInt(jQuery("#witch").val());
		data.role_count.people = parseInt(jQuery("#num_people").val());
		nextPageSetup();
	});
	jQuery('body').on('click','#game_start', function(){
		launchGame();
	});
	init_roles();
});

function nextPageSetup(){
	swiper.slideNext();
}

//initialize the roles in database and set the roles to null
function init_roles(){
	data.players = []; // re-empty the array
	var num_god = parseInt(jQuery("#num_god").val());
	var num_people = parseInt(jQuery("#num_people").val());
	var num_wolf = parseInt(jQuery("#num_wolf").val());
	data.role_count.god = num_god;
	data.role_count.werewolf = num_wolf;
	data.role_count.people = num_people;
	var total_num = parseInt(num_god) + parseInt(num_people) + parseInt(num_wolf);
	for (var i=0;i<total_num;i++){
		var player = new Player("people");
		data.players.push(player);
	}
}

function launchGame(){
	var num_god = jQuery("#num_god").val();
	//prepare the set of cards and launch the game
	remove_card(".card_setup");
	if ('cupid' in data.active_roles.god){
		//insert the cupid card at first
		jQuery.get("cards/cupid.html", function(data){
			var arr = [data];
			gameCards(arr);
		});	
	} else {
		gameCards();
	}
}

function gameCards(params){
	//load the charactercards
	jQuery.get("cards/darkness.html", function(data){
		if(params != null && params.length>0){
			for(var i=0;i<params.length;i++){
				data += params[i];
			}
		}
		//load the fixed charactoers 
		jQuery.get("cards/wolf.html", function(wolf){
			data+=wolf;
			jQuery.get("cards/witch.html", function(witch){
				data+=witch;
				jQuery.get("cards/prophets.html", function(prophet){
					data+=prophet;
					jQuery.get("cards/hunter.html", function(hunter){
						data+=hunter;
						jQuery.get("cards/morning.html",function(morning){
							data+=morning;
							load_card_html(data, "cards/game.js");
						})
					});
				});
			});
		});
	});
}

function role_select(ele){
	if (ele.style.backgroundColor=="cornflowerblue"){
		ele.style.backgroundColor="white";
		delete data.active_roles.god.cupid;
	} else {
		ele.style.backgroundColor="cornflowerblue";
		data.active_roles.god.cupid = [];
	}
}