function ajaxCall() {
    this.send = function(data, url, method, success, type) {
        type = 'json';
        var successRes = function(data) {
            success(data);
        }
        var errorRes = function(xhr, ajaxOptions, thrownError) {
            console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
        jQuery.ajax({
            url: url,
            type: method,
            data: data,
            success: successRes,
            error: errorRes,
            dataType: type,
            timeout: 60000
        });
    }
}
function locationInfo() {
    var rootUrl = "https://geodata.phplift.net/api/index.php";
    var call = new ajaxCall();
    this.getCities = function(id) {
        jQuery(".city option:gt(0)").remove();
        //get additional fields
        var url = rootUrl+'?type=getCities&countryId='+ '&stateId=' + id;
        var method = "post";
        var data = {};
        jQuery('.city').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.city').find("option:eq(0)").html("Select City");
                var listlen = Object.keys(data['result']).length;
                if(listlen > 0)
                {
                    jQuery.each(data['result'], function(key, val) {
                        var option = jQuery('<option />');
                        option.attr('value', val.name).text(val.name);
                        jQuery('.city').append(option);
                        localStorage.setItem("cities", JSON.stringify(data.result));
                        //localStorage.setItem("city", $('#city').val());
                    });
                }
                jQuery(".city").prop("disabled",false);
        });
    };
    this.getStates = function(id) {
        jQuery(".state option:gt(0)").remove();
        jQuery(".city option:gt(0)").remove();
        //get additional fields
        var stateClasses = jQuery('#state').attr('class');
        var url = rootUrl+'?type=getStates&countryId=' + id;
        var method = "post";
        var data = {};
        jQuery('.state').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.state').find("option:eq(0)").html("Select State");
                jQuery.each(data['result'], function(key, val) {
                    var option = jQuery('<option />');
                    option.attr('value', val.name).text(val.name);
                    option.attr('state', val.id);
                    jQuery('.state').append(option);
                    localStorage.setItem("states", JSON.stringify(data.result));
                    //localStorage.setItem("state", $('#state').val());
                });
                jQuery(".state").prop("disabled",false);
        });
    };
    this.getCountries = function() {
        var url = rootUrl+'?type=getCountries';
        var method = "post";
        var data = {};
        jQuery('.country').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.country').find("option:eq(0)").html("Select Country");
            jQuery.each(data['result'], function(key, val) {
                var option = jQuery('<option />');
                option.attr('value', val.name).text(val.name);
                option.attr('country', val.id);
                jQuery('.country').append(option);
                localStorage.setItem("countries", JSON.stringify(data.result));
            }); 
        });
    };
}
jQuery(function() {
    var loc = new locationInfo();
    loc.getCountries();
    jQuery(".country").on("change", function(ev) {
        var countryId = jQuery("option:selected", this).attr('country');
        if(countryId != ''){
            loc.getStates(countryId);
            console.log(countryId);
            //localStorage.setItem("selectedCountry", countryId);
        }
        else{
            jQuery(".state option:gt(0)").remove();
            //localStorage.removeItem("selectedCountry");
        }
    });
    jQuery(".state").on("change", function(ev) {
        var stateId = jQuery("option:selected", this).attr('state');
        if(stateId != ''){
            loc.getCities(stateId);
            console.log(stateId);
            //localStorage.setItem("selectedState", stateId);
        }
        else{
            jQuery(".city option:gt(0)").remove();
            //localStorage.removeItem("selectedState");
        }
    });
});