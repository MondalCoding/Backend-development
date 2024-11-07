(function ($) {
    $.fn.multiStepForm = function(args) {
        if(args === null || typeof args !== 'object' || $.isArray(args))
            throw  " : Called with Invalid argument";
            var form = this;
            var tabs = form.find('.tab');
            var steps = form.find('.step');
            steps.each(function(i, e){
                $(e).on('click', function(ev){
                });
            });
            form.navigateTo = function (i) {/*index*/
            /*Mark the current section with the class 'current'*/
            tabs.removeClass('current').eq(i).addClass('current');
            // Show only the navigation buttons that make sense for the current section:
            form.find('.previous').toggle(i > 0);
            atTheEnd = i >= tabs.length - 1;
            form.find('.next').toggle(!atTheEnd);
            form.find('.submit').toggle(atTheEnd);
            form.find('.dwnld').toggle(atTheEnd);
            fixStepIndicator(curIndex());
            return form;
        }
        function curIndex() {
            /*Return the current index by looking at which section has the class 'current'*/
            return tabs.index(tabs.filter('.current'));
        }
        function fixStepIndicator(n) {
            steps.each(function(i, e){
                i == n ? $(e).addClass('active') : $(e).removeClass('active');
            });
        }
        /* Previous button is easy, just go back */
        form.find('.previous').click(function() {
            $(':input', '#myForm')
                .not(':button, :submit, :reset, :hidden')
                //.val('')
                .prop('checked', true)
                .prop('selected', true);
            form.navigateTo(curIndex() - 1);
        });
        /* Next button goes forward iff current block validates */
        form.find('.next').click(function() {
            localStorage.setItem("fname", $('#fname').val());
            localStorage.setItem("lname", $('#lname').val());
            localStorage.setItem("email", $('#email').val());
            localStorage.setItem("address", $('#address').val());
            localStorage.setItem("fathername", $('#fathername').val());
            localStorage.setItem("phone", $('#phone').val());
            localStorage.setItem("password", $('#pswrd').val());
            localStorage.setItem("conf_password", $('#cp').val());
            localStorage.setItem("dob", $('#dob').val());
            localStorage.setItem("country", $('#country').val());
            localStorage.setItem("city", $('#city').val());
            localStorage.setItem("state", $('#state').val());
            localStorage.setItem("pin", $('#pin').val());
            localStorage.setItem("gender", $('#gender').val());
            if('validations' in args && typeof args.validations === 'object' && !$.isArray(args.validations)){
                if(!('noValidate' in args) || (typeof args.noValidate === 'boolean' && !args.noValidate)){
                    form.validate(args.validations);
                    if(form.valid() == true){
                        form.navigateTo(curIndex() + 1);
                        return true;
                    }
                    return false; 
                }
            }
            form.navigateTo(curIndex() + 1);
        }); 
        form.find('.submit').on('click', function(e) {
            e.preventDefault();
        
            // Ensure the form is valid and CAPTCHA is completed
            if (typeof args.validations === 'object' && form.valid() == true) {
                var captchaResponse = grecaptcha.getResponse(); // Get reCAPTCHA response
        
                if (captchaResponse.length == 0) {
                    // CAPTCHA is not completed, show error
                    alert("Please complete the CAPTCHA");
                } else {
                    // CAPTCHA completed, proceed with form submission
                    var formData = form.serialize(); // Serialize form data
                    $.ajax({
                        type: "POST",
                        url: "submit.php",
                        data: formData + "&save_data=true", // Append save_data parameter
                        success: function(response) {
                            response = jQuery.parseJSON(response);
                            if (response.status == 422) {
                                alert("Error in saving data");
                            } else if (response.status == 200) {
                                window.location.href = "result.html"; // Redirect to result page
                            }
                        }
                    });
                }
            }
        });        
        
        form.find('.dwnld').click(function() {
            if('validations' in args && typeof args.validations === 'object' && !$.isArray(args.validations)){
                if(!('noValidate' in args) || (typeof args.noValidate === 'boolean' && !args.noValidate)){
                    form.validate(args.validations);
                    if(form.valid() == true){
                        var fname = $("#fname").val();
                        var lname = $("#lname").val();
                        var fathername = $("#fathername").val();
                        var email = $("#email").val();
                        var phone = $("#phone").val();
                        var gender = $("#gender").val();
                        var dob = $("#dob").val();
                        var address = $("#address").val();
                        var country = $("#country").val();
                        var city = $("#city").val();
                        var state = $("#state").val();
                        var pin = $("#pin").val();
                        let data = 
                        '\r First Name: ' + fname + ' \r\n ' + 
                        'Last Name: ' + lname + ' \r\n ' +
                        'Father Name: ' + fathername + ' \r\n ' +
                        'Email: ' +email + ' \r\n ' + 
                        'Phone Number: ' + phone + ' \r\n ' +
                        'Gender: ' + gender + ' \r\n ' +
                        'Date of Birth: ' + dob + ' \r\n ' + 
                        'Address: ' + address + ' \r\n ' +
                        'Country: ' + country + ' \r\n ' +
                        'City: ' + city + ' \r\n ' +
                        'State: ' + state + ' \r\n ' + 
                        'Pin: ' + pin;
                        const textToBLOB = new Blob([data], { type: 'text/plain' });
                        const sFileName = 'formData.txt';	   // The file to save the data.
                        let newLink = document.createElement("a");
                        newLink.download = sFileName;
                        if (window.webkitURL != null) 
                            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
                        else {
                            newLink.href = window.URL.createObjectURL(textToBLOB);
                            newLink.style.display = "none";
                            document.body.appendChild(newLink);
                        }
                        newLink.click();
                    } else
                        alert("Please Validate & fill all fields to download data !");
                }
            }
        });
        /*By default navigate to the tab 0, if it is being set using defaultStep property*/
        typeof args.defaultStep === 'number' ? form.navigateTo(args.defaultStep) : null;
        form.noValidate = function() {
        }
        return form;
    };
}(jQuery));