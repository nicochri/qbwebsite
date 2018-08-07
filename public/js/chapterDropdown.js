function showDiv(){
	var myStringArray = document.getElementsByClassName('chapterDropdown');
	var arrayLength = myStringArray.length;
	for (var i = 0; i < arrayLength; i++) {
		if (myStringArray[i].style.display === "none"){
			myStringArray[i].style.display = "block";
		}
		else{
			myStringArray[i].style.display = "none";
		}
	}
}