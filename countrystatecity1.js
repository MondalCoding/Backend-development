function ajaxCall() {
    this.send = function (data, url, method, success, type) {
        type = 'json';
        var successRes = function (data) {
            success(data);
        };
        var errorRes = function (xhr, ajaxOptions, thrownError) {
            console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        };
        fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(successRes)
            .catch(errorRes);
    };
}

function locationInfo() {
    var rootUrl = "https://geodata.phplift.net/api/index.php";
    var call = new ajaxCall();

    this.getCountries = function () {
        var url = rootUrl + '?type=getCountries';
        var method = "post";
        var data = {};
        call.send(data, url, method, function (data) {
            localStorage.setItem("countries", JSON.stringify(data.result));
            // Populate the country dropdown here if needed
        });
    };

    this.getStates = function (countryId) {
        var url = rootUrl + '?type=getStates&countryId=' + countryId;
        var method = "post";
        var data = {};
        call.send(data, url, method, function (data) {
            localStorage.setItem("states", JSON.stringify(data.result));
            // Populate the state dropdown here if needed
        });
    };

    this.getCities = function (stateId) {
        var url = rootUrl + '?type=getCities&stateId=' + stateId;
        var method = "post";
        var data = {};
        call.send(data, url, method, function (data) {
            localStorage.setItem("cities", JSON.stringify(data.result));
            // Populate the city dropdown here if needed
        });
    };
}

jQuery(function () {
    var loc = new locationInfo();
    
    // Fetch and save countries on page load
    loc.getCountries();

    jQuery(".country").on("change", function (ev) {
        var countryId = jQuery("option:selected", this).attr('country');
        if (countryId !== '') {
            loc.getStates(countryId);
            localStorage.setItem("selectedCountry", countryId);
        } else {
            jQuery(".state option:gt(0)").remove();
            localStorage.removeItem("selectedCountry");
        }
    });

    jQuery(".state").on("change", function (ev) {
        var stateId = jQuery("option:selected", this).attr('state');
        if (stateId !== '') {
            loc.getCities(stateId);
            localStorage.setItem("selectedState", stateId);
        } else {
            jQuery(".city option:gt(0)").remove();
            localStorage.removeItem("selectedState");
        }
    });
});
