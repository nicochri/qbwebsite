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

	var newHeight = window.innerHeight - p.y - 20;
    newHeightStyle = "height: " + newHeight.toString() + 'px;';
    return newHeightStyle;
}

function getNewHeight(obj) {
    console.log('thats my baoy');
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

    return window.innerHeight - p.y - 20;
}

// function updateHeights() {
//     if (currentChapterGlobal == 1) {
//     	var element = document.getElementById('sidebarDiv');
//     	element.setAttribute("style", getNewHeightStyle(element));
//         var element2 = document.getElementById('questionStats');
//         element2.setAttribute("style", getNewHeightStyle(element2) + ' overflow-y: auto; max-height: 234px;');

//         //Set the other sidebars to the same height as well
//         var elements = document.getElementsByClassName('fillScreenHeight');
//         for (var i = 0; i < elements.length; i++) {
//             elements[i].setAttribute("style", elements[i].style.cssText + ' ' + getNewHeightStyle(element));
//         }

//         var signIns = document.getElementsByClassName('forceSignIn');
//         for (var i = 0; i < signIns.length; i++) {
//             signIns[i].setAttribute("style", signIns[i].style.cssText + ' ' + getNewHeightStyle(element));
//         }
//     }

//     else if (currentChapterGlobal == 2) {
//         console.log('yes boy');
//         //Set the other sidebars to the same height as well
//         var elements = document.getElementsByClassName('fillScreenHeight');
//         for (var i = 0; i < elements.length; i++) {
//             elements[i].setAttribute("style", elements[i].style.cssText + ' ' + getNewHeightStyle(elements[i]));
//         }

//         var element = document.getElementById('sidebarDiv');
//         element.setAttribute("style", getNewHeightStyle(elements[0]));

//         var element2 = document.getElementById('questionStats');
//         element2.setAttribute("style", getNewHeightStyle(element2) + ' overflow-y: auto; max-height: 234px;');

//         var signIns = document.getElementsByClassName('forceSignIn');
//         for (var i = 0; i < signIns.length; i++) {
//             signIns[i].setAttribute("style", signIns[i].style.cssText + ' ' + getNewHeightStyle(elements[0]));
//         }
 
//     }
// }

function consoleWidth() {
    if (window.innerWidth >= 1200) {
        console.log('xl: ' + window.innerWidth.toString());
    }
    else if (window.innerWidth < 1200 && window.innerWidth >= 992) {
        console.log('lg: ' + window.innerWidth.toString());
    }
    else if (window.innerWidth < 992 && window.innerWidth >= 768) {
        console.log('md: ' + window.innerWidth.toString());
    }
    else if (window.innerWidth < 768 && window.innerWidth >= 576) {
        console.log('sm: ' + window.innerWidth.toString());
    }
    else if (window.innerWidth < 576) {
        console.log('xs: ' + window.innerWidth.toString());
    }
};

function updateQuestionStatsBorder() {
    if (getScreenWidth() >= 3) {
        //Change the borders on the stat box
        document.getElementById('timesAnseredListElement-chapter' + currentChapterGlobal).setAttribute("style", "");
        document.getElementById('statBorderBottom-chapter' + currentChapterGlobal).setAttribute("style", "border-top: 1px solid #dfdfdf; font-size: 34px;");
    } 

    else {
        document.getElementById('timesAnseredListElement-chapter' + currentChapterGlobal).setAttribute("style", "border-right: 1px solid #dfdfdf; border-bottom-right-radius: 0px; border-top-right-radius: 0px;");
        document.getElementById('statBorderBottom-chapter' + currentChapterGlobal).setAttribute("style", "");
    }
}

function modernUpdateHeights() {
    if (getScreenWidth() > 3) {
        var mainElement = document.getElementById('list-tab-chapter' + currentChapterGlobal);
        var newHeightStyle = getNewHeightStyle(mainElement);

        document.getElementById('list-tab-chapter1').setAttribute("style", newHeightStyle);
        document.getElementById('list-tab-chapter2').setAttribute("style", newHeightStyle);
        document.getElementById('list-tab-chapter3').setAttribute("style", newHeightStyle);
        document.getElementById('list-tab-chapter4').setAttribute("style", newHeightStyle);
        document.getElementById('list-tab-chapter5').setAttribute("style", newHeightStyle);
        document.getElementById('list-tab-chapter6').setAttribute("style", newHeightStyle);
    }

    else {
        document.getElementById('list-tab-chapter1').setAttribute("style", "height: 50px;");
        document.getElementById('list-tab-chapter2').setAttribute("style", "height: 50px;");
        document.getElementById('list-tab-chapter3').setAttribute("style", "height: 50px;");
        document.getElementById('list-tab-chapter4').setAttribute("style", "height: 50px;");
        document.getElementById('list-tab-chapter5').setAttribute("style", "height: 50px;");
        document.getElementById('list-tab-chapter6').setAttribute("style", "height: 50px;");
    }

    updateQuestionStatsBorder();
}

window.onload = function () { modernUpdateHeights(); }
window.onresize = modernUpdateHeights;