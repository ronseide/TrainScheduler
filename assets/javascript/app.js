
var recordCount = 0;
var config = {
    apiKey: "AIzaSyBlcF9JMz1bWgN3abPWvFYSkqFoKuXTzYw",
    authDomain: "all-aboard-d1bc2.firebaseapp.com",
    databaseURL: "https://all-aboard-d1bc2.firebaseio.com",
    projectId: "all-aboard-d1bc2",
    storageBucket: "all-aboard-d1bc2.appspot.com",
    messagingSenderId: "423900298244"
};
firebase.initializeApp(config);
var database = firebase.database();
$(document).ready(function () {
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#first-train-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        database.ref().push({
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });
        alert("Train successfully added");
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
    });
    database.ref().on("child_added", function (document) {
        recordCount += 1;
        console.log(document.key);
        console.log("OLD STYLE:" + document['key'] );
        console.log(document.val());
        var name = document.val().name;
        var destination = document.val().destination;
        var frequency = document.val().frequency;
        var firstTrain = document.val().firstTrain;
        var arrivalMinutes;
        var arrivalTime;
        var trainTime = moment(firstTrain, "hh:mm").subtract(1, "years");
        var minuteDifference = moment().diff(moment(trainTime), "minutes");
        var remainder = minuteDifference % frequency;
        arrivalMinutes = frequency - remainder;
        var nextTrain = moment().add(arrivalMinutes, "minutes");
        arrivalTime = moment(nextTrain).format("hh:mm");
        $("#train-table > tbody").append(
            $("<tr>").append(
                $("<td>").text(name),
                $("<td>").text(destination),
                $("<td>").text(frequency),
                $("<td>").text(arrivalTime),
                $("<td>").text(arrivalMinutes)
            )
        );
    });
});

