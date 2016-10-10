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
            default:
                $("#credit-card").hide();
                $("#paypal").hide();
                $("#bitcoin").show();
                break;
        }
    });



});

























