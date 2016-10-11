function validateCCNum(ccNum) {
    var isNum = /^\d+$/.test(ccNum);
    if(!isNum || isNum.length < 16 || isNum.length > 16) {
        return false;
    }
    var numArr = ccNum.split("");
    var numArrLess1E = [];
    for(var i = 0; i < numArr.length - 1; i++) {
        numArrLess1E[numArr.length - i - 2] = parseInt(numArr[i]);
    }
    var sum = 0;
    for(var i = 0; i < numArrLess1E.length; i++) {
        if(i % 2 == 0) {
            numArrLess1E[i] = numArrLess1E[i] * 2;
        }
        if(numArrLess1E[i] > 9) {
            numArrLess1E[i] = numArrLess1E[i] - 9;
        }
        sum += numArrLess1E[i];
    }
    return (sum % 10 === parseInt(ccNum.charAt(ccNum.length - 1)));

}

function validatePostalCode(postalCode, countryCode) {
    switch (countryCode) {
        case "US":
            postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
            break;
        case "CA":
            postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
            break;
        default:
            postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    }
    return postalCodeRegex.test(postalCode);
}

function validateCVV(cvv) {
    return (/^\d+$/.test(cvv) && cvv.length === 3);
}


$(document).ready(function() {
    /*
     *   Set focus on the first text field
     */
    $("#name").focus();

    $("#other-title").hide();

    $("#colors-js-puns").hide();

    var total = 0;
    $("#cost").html(total);

    $("#payment").val("credit card");
    $("#paypal").hide();
    $("#bitcoin").hide();

    $("#nameErr").html("This field is required");
    $("#nameErr").hide();
    $("#emailErr").html("A valid email address is required");
    $("#emailErr").hide();
    var regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    $("#activityErr").html("At least one activity is required");
    $("#activityErr").hide();
    var next = 0;

    $("#paymentErr").html("Payment option must be selected");
    $("#paymentErr").hide();



    /*
     *   Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
     */
    $("#title").on("change", function() {
        var value = $("#title").val();
        if(value === "other") {
            $("#other-title").show();
        } else {
            $("#other-title").hide();
        }
    });

    /*
     *    Only display the options that match the design selected in the "Design" menu
     */
    $("#design").on("change", function() {
        var value = $("#design").val();
        switch(value) {
            case "js puns":
                $("#color").val($("#colors-js-puns option:eq(0)").val());
                $("#colors-js-puns option:gt(2)").hide();
                $("#colors-js-puns option:lt(3)").show();
                $("#colors-js-puns").show();
                break;
            case "heart js":
                $("#color").val($("#colors-js-puns option:eq(3)").val());
                $("#colors-js-puns option:lt(3)").hide();
                $("#colors-js-puns option:gt(2)").show();
                $("#colors-js-puns").show();
                break;
            default:
                $("#colors-js-puns").hide();
                break;
        }
    });

    /*
     *    User cannot select two activities that are at the same time
     *    Total cost of selected activities is calculated and displayed below the list of activities
     */
    $(".activities input[type=checkbox]").on("change", function() {
        var name = $(this).attr("name");
        var checked = $(this).prop("checked");
        switch(name) {
            case "js-frameworks":
                $(".activities input[name=express]").prop("disabled", checked);
                break;
            case "express":
                $(".activities input[name=js-frameworks]").prop("disabled", checked);
                break;
            case "js-libs":
                $(".activities input[name=node]").prop("disabled", checked);
                break;
            case "node":
                $(".activities input[name=js-libs]").prop("disabled", checked);
                break;
            default:
                break;
        }
        if(checked) {
            if(name === "all") {
                total += 200;
            } else {
                total += 100;
            }
        } else {
            if(name === "all") {
                total -= 200;
            } else {
                total -= 100;
            }
        }
        $("#cost").html(total);
    });

    /*
     *    Display payment sections based on chosen payment option
     */
    $("#payment").on("change", function() {
        var value = $("#payment").val();
        switch(value) {
            case "credit card":
                $("#credit-card").show();
                $("#paypal").hide();
                $("#bitcoin").hide();
                break;
            case "paypal":
                $("#credit-card").hide();
                $("#paypal").show();
                $("#bitcoin").hide();
                break;
            case "bitcoin":
                $("#credit-card").hide();
                $("#paypal").hide();
                $("#bitcoin").show();
                break;
            default:
                $("#credit-card").hide();
                $("#paypal").hide();
                $("#bitcoin").hide();
                break;
        }
    });

    /*
     *   Form validation
     */
     $("button[type=submit]").click(function(event) {
        var name = $("#name").val();
        if(!name) {
            $("#nameErr").show();
            $("#name").css("border-color", "red");
        } else {
            $("#name").css("border-color", "#c1deeb");
            $("#nameErr").hide();
            next++;
        }
        var email = $("#mail").val();
        if(email == '' || !regex.test(email)) {
            $("#emailErr").show();
            $("#mail").css("border-color", "red");
        } else {
            $("#mail").css("border-color", "#c1deeb");
            $("#emailErr").hide();
            next++;
        }
        if(total < 100) {
            $("#activityErr").show();
        } else {
            $("#activityErr").hide();
            next++;
        }
        var payment = $("#payment").val();
        if(payment === "select_method") {
            $("#paymentErr").show();
        } else {
            $("#paymentErr").hide();
            next++;
        }

        event.preventDefault();

        if(payment === "credit card") {
            var ccNum = $("#cc-num").val();
            var isCC = validateCCNum(ccNum);
            var postalCode = $("#zip").val();
            var isPC = validatePostalCode(postalCode, "CA");
            var cvv = $("#cvv").val();
            var isCVV = validateCVV(cvv);
            if(isCC && isPC && isCVV) {
                next++;
            } else {
                var errMsgs = [];
                if(!isCC) {
                    var str = "Valid credit card number is required";
                    $("#cc-num").css("border-color", "red");
                    errMsgs.push(str);
                } else {
                    $("#cc-num").css("border-color", "#c1deeb");
                }
                if(!isPC) {
                    var str = "Valid postal code is required";
                    $("#zip").css("border-color", "red");
                    errMsgs.push(str);
                } else {
                     $("#zip").css("border-color", "#c1deeb");
                }
                if(!isCVV) {
                    var str = "Valid CVV is required"
                    $("#cvv").css("border-color", "red");
                    errMsgs.push(str);
                } else {
                    $("#cvv").css("border-color", "#c1deeb");
                }
                var errMsg = "";
                for(var i = 0; i < errMsgs.length; i++) {
                    errMsg = errMsg + (i+1) + ") " + errMsgs[i] + " ";
                }
                $("#ccErr").html(errMsg);
            }


        }

        if(next === 5) {
             $("form").submit(function() {
                alert("Form validated.");
            });
        } else {
            event.preventDefault();
            next = 0;
        }

     });


});

























