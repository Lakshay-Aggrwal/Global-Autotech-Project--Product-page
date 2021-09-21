$(document).ready(function() {

    // SEND CONTACT MAIL FUNCTION
    $("#sendQueryMail").click(function() {
        var nameId = $("#namequeryVal").val();
        var mailId = $("#emailqueryVal").val();
        var typequeryId = $("#typequeryVal").val();
        var desc = $("#descqueryVal").val();
        if ((nameId == null) || (nameId == "")) {
            $(".changeQueryMsg").html("Please Enter your Name");
            return false
        }
        if ((mailId == null) || (mailId == "")) {
            $(".changeQueryMsg").html("Please Enter your Email ID");
            return false
        }
        if (echeckquery(mailId) == false) {
            mailId = ""
            return false
        }
        if ((typequeryId == null) || (typequeryId == "")) {
            $(".changeQueryMsg").html("Please Select your Email ID");
            return false
        }
        if ((desc == null) || (desc == "")) {
            $(".changeQueryMsg").html("Please Description your Email ID");
            return false
        }
        var mail = encodeURIComponent(mailId);
        $.ajax({
            url: "sendquery.php?name=" + nameId + "&emailId=" + mail + "&desc=" + desc + "&typequery=" + typequeryId,
            method: "GET",
            dataType: "json",
            beforeSend: function() {
                $(".changeQueryMsg").html("Sending...");
            },
            success: function(data) {
                setTimeout(function() {
                    $(".changeQueryMsg").html("Successfully Sent");
                }, 9000);
                $("#descqueryVal, #emailqueryVal, #namequeryVal, #typequeryVal").val("");
            },
            error: function(data) {
                $(".changeQueryMsg").html("Error");
                setTimeout(function() {
                    $(".changeQueryMsg").html("");
                }, 9000);
                $("#descqueryVal, #emailqueryVal, #namequeryVal, #typequeryVal").val("");
            }
        });
    });


});

function echeckquery(str) {
    var at = "@"
    var dot = "."
    var lat = str.indexOf(at)
    var lstr = str.length
    var ldot = str.indexOf(dot)
    if (str.indexOf(at) == -1) {
        // alert("Invalid E-mail ID");
        $(".changeQueryMsg").html("Invalid E-mail ID");
        return false
    }
    if (str.indexOf(at) == -1 || str.indexOf(at) == 0 || str.indexOf(at) == lstr) {
        // alert("Invalid E-mail ID");
        $(".changeQueryMsg").html("Invalid E-mail ID");
        return false
    }
    if (str.indexOf(dot) == -1 || str.indexOf(dot) == 0 || str.indexOf(dot) == lstr) {
        //alert("Invalid E-mail ID");
        $(".changeQueryMsg").html("Invalid E-mail ID");
        return false
    }
    if (str.indexOf(at, (lat + 1)) != -1) {
        //alert("Invalid E-mail ID");
        $(".changeQueryMsg").html("Invalid E-mail ID");
        return false
    }
    if (str.substring(lat - 1, lat) == dot || str.substring(lat + 1, lat + 2) == dot) {
        //alert("Invalid E-mail ID");
        $(".changeQueryMsg").html("Invalid E-mail ID");
        return false
    }
    if (str.indexOf(dot, (lat + 2)) == -1) {
        //alert("Invalid E-mail ID");
        $(".changeQueryMsg").html("Invalid E-mail ID");
        return false
    }
    if (str.indexOf(" ") != -1) {
        //alert("Invalid E-mail ID");
        $(".changeQueryMsg").html("Invalid E-mail ID");
        return false
    }
    return true
}