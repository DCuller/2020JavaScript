"use strict";
var $ = function (id) {
    return document.getElementById(id);
};

var onCategoryChange = function () {
    // Hint:
    // 1. Retrieve the category dropdown's selection ("value").
    var category = $("category");
    var value = category.options[category.selectedIndex].value;
    // 2. Depends on the selection, load the image and price.        
    //    sample code:
    //    $("...").src = ".\\img\\tv1.jpg";
    //    $("...").innerHTML = "$400";
    
    // arrays of appliance’s price according to the provided chart
    // img tag and price tag are start from 1
    // and array start from 0
    // so we put a dummy value to index 0 of all array 
    var tvPrice = [0, 400, 500, 600];
    var fridgePrice = [0, 700, 800, 900];
    var washerPrice = [0, 1000, 1100, 1200];
    
    // assume the tv is selected 
    var price = tvPrice;
    // check value to get the right type of appliance 
    if (value == "fridge") {
        price = fridgePrice;
    } else if (value == "washer") {
        price = washerPrice;
    }
    
    // update image and price of appliance    
    for (var i = 1; i <= 3; i++) {
        
        // generate id of the img tag
        var name = "img" + i.toString();
        $(name).src = ".\\img\\" + value + i.toString() + ".jpg";
        
        // generate id of the price tag
        name = "price" + i.toString();
        $(name).innerHTML = "$" + price[i];
    }
    // 3. Make all 3 images' border to be black by change the image's className.
    for (var i = 1; i <= 3; i++) {
        
        // generate id of the img tag
        var name = "img" + i.toString();
        $(name).className = "black-border";
    }
};

var onTDClick = function (option) {
    // Hint:
    // 1. Make all 3 images' border to be black by change the image's className.
    for (var i = 1; i <= 3; i++) {
        
        // generate id of the img tag
        var name = "img" + i.toString();
        $(name).className = "black-border";
    }

    // 2. The option will be 1, 2, or 3 to indicate which image was clicked.
    //    Change the clicked image's border to red by change the image's className.
    var name = "img" + option.toString();
    $(name).className = "red-border";
    // 3. Retrieve the corresponding price ($(...).innerHTML).
    name = "price" + option.toString();
    var price = $(name).innerHTML;
    // 4. Set selectedPrice's "value" to price in step 3.
    $("selectedPrice").value = price;
};

var onClickCalculate = function () {
    // Hint:
    // 1. Verify selectedPrice is valued (client has selected an appliance).
    //    If no selection, then prompt user.
    var selectedPrice = $("selectedPrice").value;
    
    //    no selection <=> selectedPrice is null or be an empty string 
    if (selectedPrice == null || selectedPrice == "") {
        alert("You have to select an appliance");
        return;
    }
    // 2. Verify shipping option is selected by using document.getElementsByName.
    //    This function will return an array of objects, loop through the array
    //    to verify if any is "checked". If no selection, then prompt user.
    var elements = document.getElementsByName("shipping");
    var shippingValue = -1;
    // iterate over array of options 
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            // get value of the checked shipping option
            shippingValue = elements[i].value;
            break;
        }
    }
    
    // verify if any is "checked". If no selection, then prompt user.
    if (shippingValue < 0) {
        alert("You have to select a shipping option");
        return;
    }

    // 3. Verify "state" is selected by checking the "value" of "state".
    //    If no selection, then prompt user.
    var state = $("state");    
    var stateValue = state.options[state.selectedIndex].value;
    
    //   no selection <=> stateValue is null or be an empty string 
    if (stateValue == null || stateValue == "") {
        alert("You have to select a state tax option");
        return;
    }    
    // 4. Calculate the total if all required fields are valued.
    // remove $ off the string
    selectedPrice = selectedPrice.substring(1);
    
    // turn all string value to float value 
    var price = parseFloat(selectedPrice);
    var shippingCost = parseFloat(shippingValue);
    var tax = parseFloat(stateValue);
    
    //  caculate the total 
    var total = (price + shippingCost) * (1 + tax);
    
    // 5. Display the total value in "total" tag.
    $("total").innerHTML = total;
};

window.onload = function () {
    $("category").onclick = onCategoryChange;
    $("td1").onclick = function () {
        onTDClick(1)
    };
    $("td2").onclick = function () {
        onTDClick(2)
    };
    $("td3").onclick = function () {
        onTDClick(3)
    };
    $("calculate").onclick = onClickCalculate;
    $("category").focus();
};