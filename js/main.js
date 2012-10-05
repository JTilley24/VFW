//Justin Tilley
//Project 2
//VFW Term 1210

window.addEventListener("DOMContentLoaded", function(){
	//alert(localStorage.value(0))
	function $(x){
		var element = document.getElementById(x);
		return element;
	}

	function partCats(){
		var selectLi = $("select");
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "groups");
		for(var i=0, j=partsGroup.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = partsGroup[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	function getSelectedRadio(){
		var radios = document.forms[0].region;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				regionValue = radios[i].value;
			}
		}
	}
	
	function toggle(n){
		switch(n){
			case "on":
				$("carForm").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("carForm").style.display = "block";
				$("clear").style.display = "inline";
				$("display").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		
		}
	
	}
	
	function saveData(){
		var id = Math.floor(Math.random()*1000001);
		getSelectedRadio();
		var item = {};
			item.region = ["Region:", regionValue];
			item.make = ["Make:", $("make").value];
			item.model = ["Model:", $("model").value];
			item.year = ["Year:", $("year").value];
			item.group = ["Part:", $("groups").value];
			item.date = ["Date for repair:", $("date").value];
			item.comments = ["Description:", $("comments").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Data Saved!");
	}
	
	function getData(){
		toggle("on");
		if(localStorage.length === 0){
			alert("No Data!");
		};
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
			var makeLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var object = JSON.parse(value);
			var makeSublist = document.createElement("ul");
			makeLi.appendChild(makeSublist);
			for(var a in object){
				var makeSubli = document.createElement("li");
				makeSublist.appendChild(makeSubli);
				var optSubText = object[a][0] + " " + object[a][1];
				makeSubli.innerHTML = optSubText
			}
		}
	
	}
	
	function clearData(){
		if(localStorage.length === 0){
			alert("No Data!");
		}else{
			localStorage.clear();
			alert("Data Cleared!")
			window.location.reload();
			return false;
		}
	}
	
	function showValue(){
           result.innerHTML = $("year").value;
  	}   
  	var result = document.getElementById('year');   
  	showValue(); 

	
	var partsGroup = ["Drivetrain", "Body", "Chassis"],
		regionValue
		;
	partCats();

	var display = $("display");
	display.addEventListener("click", getData);
	
	var clear = $("clear");
	clear.addEventListener("click", clearData);
	
	var save = $("submit");
	save.addEventListener("click", saveData);

});

function $(x){
	var element = document.getElementById(x);
	return element;
};
 
function showValue(){
           result.innerHTML = $("year").value;
};   

var result = document.getElementById('result');   
showValue(); 