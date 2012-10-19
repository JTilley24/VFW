//Justin Tilley
//Project 4
//VFW Term 1210

window.addEventListener("DOMContentLoaded", function(){

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
	
	function saveData(key){
		if(!key){
			var id = Math.floor(Math.random()*1000001);
		}else{
			id = key;
		}
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
			alert("No Data! Default data was added.");
			autoData();
		};
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
			var makeLi = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var object = JSON.parse(value);
			var makeSublist = document.createElement("ul");
			makeLi.appendChild(makeSublist);
			getImage(object.region[1], makeSublist);
			for(var a in object){
				var makeSubli = document.createElement("li");
				makeSublist.appendChild(makeSubli);
				var optSubText = object[a][0] + " " + object[a][1];
				makeSubli.innerHTML = optSubText;
				makeSublist.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	
	}
	
	function autoData(){
		for(var n in json){
			var id = Math.floor(Math.random()*1000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function getImage(imgName, makeSublist){
		var imageLi = document.createElement("li");
		makeSublist.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/" + imgName + ".png");
		imageLi.appendChild(newImg);
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Repair";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Repair";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		 var value = localStorage.getItem(this.key);
		 var item = JSON.parse(value);
		 
		 toggle("off");
		 $("groups").value = item.group[1];
		 $("make").value = item.make[1];
		 $("model").value = item.model[1];
		 $("year").value = item.year[1];
		 $("date").value = item.date[1];
		 $("comments").value = item.comments[1]
		 var radios = document.forms[0].region;
		 for(var i=0; i<radios.length; i++){
		 	if(radios[i].value == "Domestic" && item.region[1] == "Domestic"){
		 		radios[i].setAttribute("checked", "checked");
		 	}else if(radios[i].value == "Asian" && item.region[1] == "Asian"){
		 		radios[i].setAttribute("checked", "checked");
		 	}else if(radios[i].value == "European" && item.region[1] == "European"){
		 		radios[i].setAttribute("checked", "checked");
		 	}
		 };
		 
		 save.removeEventListener("click", saveData);
		 $("submit").value = "Edit Repair";
		 var editSubmit = $("submit");
		 editSubmit.addEventListener("click", validate);
		 editSubmit.key = this.key;
	
	}
	
	function validate(e){
		var getGroup = $("groups");
		var getMake = $("make");
		var getModel = $("model");
		var messageAry = [];
		
		errMsg.innerHTML = "";
		getGroup.style.border = "none";
		getMake.style.border = "none";
		getModel.style.border = "none";

		
		
		if(getGroup.value === "--Choose The Parts Category--"){
			var groupError = "Please choose a category.";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
		if(getMake.value === "" ){
			var makeError = "Please enter the make of the vehicle."
			getMake.style.border = "1px solid red";
			messageAry.push(makeError);
		}	
		if(getModel.value === "" ){
			var modelError = "Please enter the model of the vehicle."
			getModel.style.border = "1px solid red";
			messageAry.push(modelError);
		}	
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var errorTxt = document.createElement("li");
				errorTxt.innerHTML = messageAry[i];
				errorTxt.style.color = "red"
				errMsg.appendChild(errorTxt);
			}
			e.preventDefault();
			return false;
		}else{
			saveData(this.key);
		}	
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Repair was deleted.")
			window.location.reload();
		}else{
			alert("Repair was NOT deleted.")
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
		
	var partsGroup = ["--Choose The Parts Category--","Drivetrain", "Body", "Chassis"],
		regionValue,
		errMsg = $("errors")
		;
	partCats();

	var display = $("display");
	display.addEventListener("click", getData);
	
	var clear = $("clear");
	clear.addEventListener("click", clearData);
	
	var save = $("submit");
	save.addEventListener("click", validate);

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