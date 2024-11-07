<?php

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['save_data'])) {
    // Database connection
    $host = 'localhost'; 
    $db = 'testdb'; 
    $user = 'root'; 
    $pass = ''; 

    $conn = new mysqli($host, $user, $pass, $db);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Sanitize form data
    $fname = $conn->real_escape_string($_POST['fname']);
    $lname = $conn->real_escape_string($_POST['lname']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $address = $conn->real_escape_string($_POST['address']);
    $fathername = $conn->real_escape_string($_POST['fathername']);
    $dob = $conn->real_escape_string($_POST['dob']);
    $gender = $conn->real_escape_string($_POST['gender']);
    $country = $conn->real_escape_string($_POST['country']);
    $state = $conn->real_escape_string($_POST['state']);
    $city = $conn->real_escape_string($_POST['city']);
    $pin = $conn->real_escape_string($_POST['pin']);

    // Insert data into database
    $sql = "INSERT INTO users (fname, lname, email, phone, address, fathername, dob, gender, country, state, city, pin) 
            VALUES ('$fname', '$lname', '$email', '$phone', '$address', '$fathername', '$dob', '$gender', '$country', '$state', '$city', '$pin')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 200, 'message' => 'Data saved successfully']);
    } else {
        echo json_encode(['status' => 422, 'message' => 'Error saving data: ' . $conn->error]);
    }

    $conn->close();
}
?>
