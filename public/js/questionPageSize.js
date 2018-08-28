function GetTextboxCordinates() {
            var txt = document.getElementById("txtText");
            var p = GetScreenCordinates(txt);
            alert("X:" + p.x + " Y:" + p.y);
        }

function GetScreenCordinates(obj) {
    var p = {};
    p.x = obj.offsetLeft;
    p.y = obj.offsetTop;
    while (obj.offsetParent) {
        p.x = p.x + obj.offsetParent.offsetLeft;
        p.y = p.y + obj.offsetParent.offsetTop;
        if (obj == document.getElementsByTagName("body")[0]) {
            break;
        }
        else {
            obj = obj.offsetParent;
        }
    }
    // console.log(p);
    // console.log(window.innerHeight);
    // var newHeight = window.innerHeight - p.y - 10;
   	// newHeightStyle = "height: " + newHeight.toString() + 'px;';
   	// console.log(newHeightStyle);
    // document.getElementById('qqq').setAttribute("style",newHeightStyle);

	var newHeight = window.innerHeight - p.y - 10;
    newHeightStyle = "height: " + newHeight.toString() + 'px;';
    console.log(newHeightStyle);
    obj.setAttribute("style", newHeightStyle);
}

function getNewHeightStyle(obj) {
	var p = {};
    p.x = obj.offsetLeft;
    p.y = obj.offsetTop;
    while (obj.offsetParent) {
        p.x = p.x + obj.offsetParent.offsetLeft;
        p.y = p.y + obj.offsetParent.offsetTop;
        if (obj == document.getElementsByTagName("body")[0]) {
            break;
        }
        else {
            obj = obj.offsetParent;
        }
    }

	var newHeight = window.innerHeight - p.y - 25;
    newHeightStyle = "height: " + newHeight.toString() + 'px;';
    return newHeightStyle;
}

function updateHeights() {
	var element = document.getElementById('sidebarDiv');
	element.setAttribute("style", getNewHeightStyle(element));
    // var element2 = document.getElementById('forceSignIn');
    // element2.setAttribute("style", getNewHeightStyle(element2));
    // var element3 = document.getElementsByClassName('cn')[0];
    // element3.setAttribute("style", getNewHeightStyle(element3));
}

window.onload = function () { updateHeights(); }
updateHeights();
window.onresize = updateHeights;