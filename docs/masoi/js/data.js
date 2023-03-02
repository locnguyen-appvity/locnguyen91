/*
 * The data object to store data of Werewolves
 */

var Data = function(){}

Data.prototype.role_count = {
	god:0,
	werewolf:0,
	people:0
}

Data.prototype.roles = {
	witch: "女巫",
	werewolf: "狼人", 
	hunter: "猎人", 
	prophet: "预言家", 
	cupid: "丘比特",
	villager: "村民",
	police: "警长"
};

Data.prototype.active_roles = {
	werewolf: [], 
	villager: [],
	god: {
	  witch: [],//must have
	  hunter:[],//must have
	  prophet:[], //must have
	}
};

Data.prototype.players = [];

//count the number of rounds in the game
Data.prototype.roundCount = 0;

var Player = function (role){
	this.role = role; 
	this.live_status = true;
	this.killed_by = -2; 
	this.saved_by = -2;
	this.police = false; 
	this.bring_to_hell = -2; 
	this.die = function(murderer){
		this.live_status = false; 
		this.killed_by = murderer;
	}
	this.reset = function(){
		this.live_status = true; 
		this.killed_by = -1;		
	}
	this.save_live = function(hero){
		this.live_status = true;
		this.saved_by = hero;
	}
}
