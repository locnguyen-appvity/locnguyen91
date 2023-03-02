//the javascript for the game logic
jQuery(document).ready(function(){

	swiper = new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
	    paginationClickable: true,
	    onTransitionEnd: function(){
			proceedGame();
		}
	});

	//add the game status button
	jQuery.get("cards/status.html", function(data){
		jQuery('body').append(data);
		console.log(data);
	});

	//load the status html popup
	//add the game status button
	jQuery.get("cards/status_display.html", function(data){
		jQuery('body').append(data);
		console.log(data);
	});

	jQuery('body').on('click', '.game_butt', function () {
		nextPage();
	});

	jQuery('body').on('click', '#wolf_butt', function(){
		var arr =  jQuery('#wolf_identity').val();
		//set the identity of the wolf 
		for (var i =0 ; i < arr.length; i++){
			data.players[arr[i]-1].role = "werewolf";
		}
		//set the target to kill
		var to_kill = parseInt(jQuery("#wolf_kill").val());
		killPlayer(to_kill, arr);
	});

	jQuery('body').on('click', '#prophet_butt', function(){
		var play_id = jQuery("#prophet_check").val();
		if (data.players[play_id-1].role =="werewolf"){
			alert("这玩家是坏人");
		}else{
			alert("这玩家是好人");
		}
	});

	jQuery('body').on('click', '#hunter_butt', function(){
		var play_id = parseInt(jQuery("#hunter_identity").val());
		data.players[play_id].role="hunter";
	});

	jQuery('body').on('click','#witch_butt', function(){
		var witch_id = parseInt(jQuery("#witch_identity").val());
		var witch_action = jQuery("#witch_drug").val();
		var witch_target = jQuery("#witch_save_kill").val();
		if(witch_action=="save"){
			savePlayer(witch_target, witch_id);
		} else {
			killPlayer(witch_target, witch_id);
		}
	});

	jQuery('#witch_drug').change(function(){
		if(jQuery("#witch_drug").val()=="save"){
			jQuery("#witch_line").html("请选择女巫要救的玩家");
		} else {
			jQuery("#witch_line").html("请选择女巫要毒的玩家");
		}
	});	

	jQuery('body').on('click', '#game_status', function(){
		document.getElementById('light').style.display='block';
		document.getElementById('fade').style.display='block';
		jQuery("#wolf_count").html("狼 "+data.role_count.werewolf);
		jQuery("#god_count").html("神 "+data.role_count.god);
		jQuery("#people_count").html("民 "+data.role_count.people);
	});

	jQuery('body').on('click', "#morning_next_round", function(){
		nextRound();
	});
});

function killPlayer(target, murderer){
	if(data.players[target].live_status!=false) {
		data.role_count[data.players[target].role]--;
	}
	data.players[target].die(murderer);
}

function savePlayer(target, hero){
	if(data.players[target].live_status==false) {
		data.role_count[data.players[target].role]++;
	}
	data.players[target].save_live(hero);
}

function activeCardName(){
	return jQuery('.swiper-slide-active')[0].className;
}

function nextPage(){
	swiper.slideNext();
}

function proceedGame(){
	num_wolf = data.role_count.werewolf;
	num_god = data.role_count.god; 
	num_people = data.role_count.people;
	num_total = parseInt(num_wolf)+ parseInt(num_god) + parseInt(num_people);
	if(activeCardName().includes("wolf")){
		if(data.roundCount==0){
			//we are at the wolf page
			//count the numeber of wolves and populate the option box
			document.getElementById('wolf_identity').innerHTML = "<optgroup disabled hidden></optgroup>";
			document.getElementById('wolf_kill').innerHTML = "";
			for (var i=0;i<num_total;i++){
			    var opt = document.createElement('option');
			    opt.value = i+1;
			    opt.innerHTML = (i+1).toString() + " 号";
			 	document.getElementById('wolf_identity').appendChild(opt);
			}
			for (var i=0;i<num_total;i++){
			    var opt = document.createElement('option');
			    opt.value = i+1;
			    opt.innerHTML = (i+1).toString() + " 号";
			 	document.getElementById('wolf_kill').appendChild(opt);
			}
		}
	} else if (activeCardName().includes("witch")){
		if(data.roundCount==0) {
			//we are at the witch page
			document.getElementById('witch_identity').innerHTML = "";
			document.getElementById('witch_drug').innerHTML = "";
			document.getElementById('witch_save_kill').innerHTML = "";
			for (var i=0;i<num_total;i++){
			    var opt = document.createElement('option');
			    opt.value = i+1;
			    opt.innerHTML = (i+1).toString() + " 号";
			 	document.getElementById('witch_identity').appendChild(opt);
			}		
		    var opt = document.createElement('option');
		    opt.value = "kill";
		    opt.innerHTML =  "毒药";
		 	document.getElementById('witch_drug').appendChild(opt);
		    var opt = document.createElement('option');
		    opt.value = "save";
		    opt.innerHTML = "解药";
		 	document.getElementById('witch_drug').appendChild(opt);		 	
			for (var i=0;i<num_total;i++){
			    var opt = document.createElement('option');
			    opt.value = i+1;
			    opt.innerHTML = (i+1).toString() + " 号";
			 	document.getElementById('witch_save_kill').appendChild(opt);
			}
		}		
	} else if (activeCardName().includes("prophet")) {
		if(data.roundCount==0) {
			document.getElementById('prophet_identity').innerHTML = "";		
			document.getElementById('prophet_check').innerHTML = "";	
			console.log(num_total);
			for (var i=0;i<num_total;i++){
			    var opt = document.createElement('option');
			    opt.value = i+1;
			    opt.innerHTML = (i+1).toString() + " 号";
			 	document.getElementById('prophet_identity').appendChild(opt);
			}
			for (var i=0;i<num_total;i++){
			    var opt = document.createElement('option');
			    opt.value = i+1;
			    opt.innerHTML = (i+1).toString() + " 号";
			 	document.getElementById('prophet_check').appendChild(opt);
			}
		}
	} else if (activeCardName().includes("hunter"))  {
		if(data.roundCount==0){
			document.getElementById('hunter_identity').innerHTML = "";
			for (var i=0;i<num_total;i++){
			    var opt = document.createElement('option');
			    opt.value = i+1;
			    opt.innerHTML = (i+1).toString() + " 号";
			 	document.getElementById('hunter_identity').appendChild(opt);
			}
		}			
	}
}

/*
 * The function to move the game to next round and check if the game is over
 */
function nextRound(){
	if(ifGameOver()){
		alert("游戏结束!");
	} else {
		data.roundCount++;
		jQuery(".setup_hidden").hide();
		swiper.slideTo("0");
	}
}

/*
 * The function to check if the game is over
 */
function ifGameOver(){

	return false;
}
