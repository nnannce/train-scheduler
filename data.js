$( document ).ready(function() {


var config = {
    apiKey: "AIzaSyDUHCADkbjlVhKWoXvvtlaZVMAXwj-8TKc",
    authDomain: "train-1b1a9.firebaseapp.com",
    databaseURL: "https://train-1b1a9.firebaseio.com",
    projectId: "train-1b1a9",
    storageBucket: "train-1b1a9.appspot.com",
    messagingSenderId: "838689581634"
};
firebase.initializeApp(config);

var database = firebase.database();
console.log(database, "test");

var minsAway = 0;

$("#addTrain").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    console.log(trainName);
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("HH:mm a");
    var frequency = $("#frequency-input").val().trim();


    var newTrain = {
        tName: trainName,
        tDestination: destination,
        tFirstTimeTrain: firstTrain,
        tFrequency: frequency,
    };

    database.ref().push(newTrain);

    console.log(newTrain.tName, "ok");

    
    alert("Train successfully added");

 
    $("#name-input").val("")
    $("#destination").val("")
    $("#first-train").val("")
    $("#frequency-input").val("")

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
     console.log(childSnapshot.val());

     var trainName = childSnapshot.val().tName;
     var destination = childSnapshot.val().tDestination;
     var firstTrain = childSnapshot.val().tFirstTimeTrain;
     var frequency = childSnapshot.val().tFrequency;

     $("#newtrain-data").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + firstTrain + "</td><td>" + minsAway + "</td></tr>")
}); 
});
