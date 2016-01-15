Template.addSpot.events({
    'click button#add-spot-submit': function (event) {
        event.preventDefault();
        var spot = {
            name: $('input#name').val(),
            swellSizeMin: $('input#swellSizeMin').val(),
            swellSizeMax: $('input#swellSizeMax').val(),
            swellDirMin: $('input#swellDirMin').val(),
            swellDirMax: $('input#swellDirMax').val(),
            windStrengthMin: $('input#windStrengthMin').val(),
            windStrengthMax: $('input#windStrengthMax').val(),
            windDirMin: $('input#windDirMin').val(),
            windDirMax: $('input#windDirMax').val(),
            colour: $('select#colour').val()
        };
        Meteor.call("addSpot", spot);
        console.log("Added");
        $("#add-spot").fadeOut();
    },
    'click button': function () {
        Meteor.call("getGuru", function (error, result) {
            if (error) {
                consol.log(error);
            }
            console.log("Result: " + result);
            Session.set("latestWind", result);
        });
    },
    'click .overlay': function () {
        $("#add-spot").fadeOut();
    }

});