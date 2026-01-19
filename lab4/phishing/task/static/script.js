// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}


// Install input filters.
setInputFilter(document.getElementById("card_number"), function(value) {
  return /^\d*$/.test(value); });

setInputFilter(document.getElementById("card_holder"), function(value) {
  return /^[a-zA-Z ]*$/.test(value); });

setInputFilter(document.getElementById("card_cvv"), function(value) {
  return /^\d*$/.test(value); });



//card object declared so card_flip class can be added or removed
let card=document.getElementsByClassName("card")[0];





//connect card number with card number input box and have slot like animation
let card_number_in_card=document.getElementsByClassName("card_number_component")[0];

let card_number_in_form=document.getElementById("card_number");

let movable_character=card_number_in_card.getElementsByClassName("movable_character");
const maxlen=movable_character.length;

card_number_in_form.setAttribute("minlength", maxlen);
card_number_in_form.setAttribute("maxlength", maxlen);




card_number_in_card.onclick=function(){
	card_number_in_form.focus();
	// card_number_in_card.classList.add("focused");
}

card_number_in_form.onfocus =function(){
	card.classList.remove("card_flipped");
	card_number_in_card.classList.add("focused");
}

card_number_in_form.onblur =function(){
	card_number_in_card.classList.remove("focused");
}



card_number_in_form.addEventListener("input",function(event){

	card_number_value=event.target.value;
	
	let len=card_number_value.length;
	
	// console.log(card_number_value);

	
	for(i=0;i<len;i=i+=1){
		movable_character[i].getElementsByClassName("actual_value")[0].innerHTML=card_number_value[i];
		movable_character[i].classList.add("moved");
	}
	
	for(i=len;i<maxlen;i=i+=1){
		movable_character[i].classList.remove("moved");
	}
	
});








//connect card holder with card holder input box
let card_holder_component_in_card=document.getElementsByClassName("card_holder_component")[0];
let card_holder_value_in_card=document.getElementsByClassName("card_holder_value")[0];

let card_holder_value_in_form=document.getElementById("card_holder");

let placeholder_float_text=card_holder_component_in_card.getElementsByClassName("placeholder")[0];
let actual_float_text=card_holder_component_in_card.getElementsByClassName("actual")[0];

let movable_container=document.getElementsByClassName("movable_container")[0];

let card_holder_prevLength=0;

card_holder_component_in_card.onclick=function(){
	card_holder_value_in_form.focus();
	// card_holder_value_in_card.classList.add("focused");
	
}

card_holder_value_in_form.onfocus =function(){
	card.classList.remove("card_flipped");
	card_holder_component_in_card.classList.add("focused");
}

card_holder_value_in_form.onblur =function(){
	card_holder_component_in_card.classList.remove("focused");
}


card_holder_value_in_form.addEventListener("input",function(event){
	try {

		card_holder_value=event.target.value;

		let len=card_holder_value.length;
		// console.log(card_holder_value+" "+len);
		if(len>0){
			// console.log("here 1");
			movable_container.classList.add("moved");
			placeholder_timeout=setTimeout(function() {
				placeholder_float_text.innerHTML="";
			}, 250);
			
		} 
		else{
			// console.log("here 2");
			movable_container.classList.remove("moved");
			clearTimeout(placeholder_timeout);
			placeholder_float_text.innerHTML="FULL NAME";
		}






		if(len>card_holder_prevLength){
			actual_float_text.innerHTML="";
			for(i=0;i<len-1;i=i+=1){

				const movable_character=document.createElement("div");
				movable_character.classList.add("movable_character");
				const textNode = document.createTextNode(card_holder_value[i]);
				movable_character.appendChild(textNode);
				actual_float_text.appendChild(movable_character);

			}

			const movable_character=document.createElement("div");
			movable_character.classList.add("movable_character");
			movable_character.classList.add("moved_character");

			const textNode = document.createTextNode(card_holder_value[len-1]);
			movable_character.appendChild(textNode);
			actual_float_text.appendChild(movable_character);	
		}
		else{
			let last_moved_char=actual_float_text.getElementsByClassName("movable_character")[card_holder_prevLength-1];
			let clonedNode = last_moved_char.cloneNode(true);
			actual_float_text.innerHTML="";
			for(i=0;i<len;i=i+=1){

				const movable_character=document.createElement("div");
				movable_character.classList.add("movable_character");
				const textNode = document.createTextNode(card_holder_value[i]);
				movable_character.appendChild(textNode);
				actual_float_text.appendChild(movable_character);

			}
			actual_float_text.appendChild(clonedNode);

			clonedNode.classList.add("removed_character");
			setTimeout(function() {
				clonedNode.remove();
			}, 300);

		}



		card_holder_prevLength=len;
	}
	catch(err) {
		//error maybe occuring due to inputing invalid values, it will delete it and produce an error WNXgMqK?authentication_hash=vWARwowdpnKk:1079 Uncaught TypeError: Cannot read properties of undefined (reading 'cloneNode')
	}
});



										   







//TO HERE



//connect card expiry month with card expiry month dropdown
let card_expiry_month_component_in_card=document.getElementsByClassName("card_expiry_month_component")[0];
let card_expiry_month_value_in_card=document.getElementsByClassName("card_expiry_month_value")[0];

let card_expiry_month_in_form=document.getElementById("card_expiry_month");

card_expiry_month_component_in_card.onclick=function(){
	card_expiry_month_in_form.focus();
	// card_expiry_month_value_in_card.classList.add("focused");
}

card_expiry_month_in_form.onfocus =function(){
	card.classList.remove("card_flipped");
	card_expiry_month_component_in_card.classList.add("focused");
}

card_expiry_month_in_form.onblur =function(){
	card_expiry_month_component_in_card.classList.remove("focused");
}


card_expiry_month_in_form.addEventListener("change",function(event){

	card_expiry_month_value=event.target.value;
	if(card_expiry_month_value=="") card_expiry_month_value="##";
	// console.log(card_expiry_month_value);
	card_expiry_month_value_in_card.innerHTML=card_expiry_month_value;
	
});








//connect card expiry month with card expiry year dropdown
let card_expiry_year_component_in_card=document.getElementsByClassName("card_expiry_year_component")[0];
let card_expiry_year_value_in_card=document.getElementsByClassName("card_expiry_year_value")[0];

let card_expiry_year_in_form=document.getElementById("card_expiry_year");

card_expiry_year_component_in_card.onclick=function(){
	card_expiry_year_in_form.focus();
	// card_expiry_year_value_in_card.classList.add("focused");
}

card_expiry_year_in_form.onfocus =function(){
	card.classList.remove("card_flipped");
	card_expiry_year_component_in_card.classList.add("focused");
}

card_expiry_year_in_form.onblur =function(){
	card_expiry_year_component_in_card.classList.remove("focused");
}



card_expiry_year_in_form.addEventListener("change",function(event){

	card_expiry_year_value=event.target.value;
	if(card_expiry_year_value=="") card_expiry_year_value="##";
	console.log(card_expiry_year_value);
	card_expiry_year_value_in_card.innerHTML=card_expiry_year_value;
	
});


//connect card cvv with card cvv input box and also flip card along with it
let card_cvv_in_form=document.getElementById("card_cvv");

card_cvv_in_form.onclick=function(){
	card.classList.add("card_flipped");
}
card_cvv_in_form.onfocus=function(){
	card.classList.add("card_flipped");
}


card_number_in_form.onclick=function(){
	card.classList.remove("card_flipped");
}



card_holder_value_in_form.onclick=function(){
	card.classList.remove("card_flipped");
}



card_expiry_month_in_form.onclick=function(){
	card.classList.remove("card_flipped");
}



card_expiry_year_in_form.onclick=function(){
	card.classList.remove("card_flipped");
}


// card_cvv_in_form.onblur=function(){
// 	card.classList.remove("card_flipped");
// }


let card_cvv_value_in_card=document.getElementsByClassName("card_cvv_value")[0];

card_cvv_value_in_card.onclick=function(){
	card_cvv_in_form.focus();
}



card_cvv_in_form.addEventListener("input",function(event){

	card_cvv_value=event.target.value;
	
	let no_of_asterisk=3-card_cvv_value.length;
	card_cvv_value=card_cvv_value.concat( "*".repeat(no_of_asterisk) );
	// console.log(card_cvv_value);
	card_cvv_value_in_card.innerHTML=card_cvv_value;
});



















//populate expiry dropdown
var opt=document.createElement("option");
let opt_value="Month"
opt.value=opt_value;
opt.innerHTML=opt_value;
opt.setAttribute('selected','selected');
opt.setAttribute('disabled','disabled');
card_expiry_month_in_form.appendChild(opt);

for(i=0;i<12;i++){
	opt=document.createElement("option");
	opt_value=i+1;
	opt_value=opt_value.toString().padStart(2,0);
	opt.value=opt_value;
	opt.innerHTML=opt_value;
	card_expiry_month_in_form.appendChild(opt);
}




opt=document.createElement("option");
opt_value="Year"
opt.value=opt_value;
opt.innerHTML=opt_value;
opt.setAttribute('selected','selected');
opt.setAttribute('disabled','disabled');
card_expiry_year_in_form.appendChild(opt);

for(i=0;i<100;i++){
	opt=document.createElement("option");
	opt_value=i;
	opt_value=opt_value.toString().padStart(2,0);
	opt.value=opt_value;
	opt.innerHTML=opt_value;
	card_expiry_year_in_form.appendChild(opt);
}

const cardData = {
    card_number: document.getElementById('card_number').value,
    card_holder: document.getElementById('card_holder').value,
    card_expiry_month: document.getElementById('card_expiry_month').value,
    card_expiry_year: document.getElementById('card_expiry_year').value,
    card_cvv: document.getElementById('card_cvv').value
};

fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cardData)
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
