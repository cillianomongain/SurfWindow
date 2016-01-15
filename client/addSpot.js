Template.addSpot.events({
    'click button#add-spot-submit': function (event) {
        event.preventDefault();
        var swellDirection = $("#swell-direction-circle").val();
        var windDirection = $("#wind-direction-circle").val();

        var spot = {
            name: $('input#name').val(),
            swellDirMin: swellDirection.split(";")[0],
            swellDirMax: swellDirection.split(";")[1],
            swellSizeMin: $('input#swellSizeMin').val(),
            swellSizeMax: $('input#swellSizeMax').val(),
            windStrengthMin: $('input#windStrengthMin').val(),
            windStrengthMax: $('input#windStrengthMax').val(),
            windDirMin: windDirection.split(";")[0],
            windDirMax: windDirection.split(";")[1],
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

Template.addSpot.onRendered(function () {
    this.$('#swell-size-range').noUiSlider({
        start: [0.5,4],
        connect: true,
        step: 0,
        format: wNumb({
            decimals: 1
        }),
        range: {
            'min': 0,
            'max': 10
        }
    });
    this.$('#swell-size-range').Link('lower').to(this.$('#swell-size-min'));
    this.$('#swell-size-range').Link('upper').to(this.$('#swell-size-max'));

    this.$('#wind-range').noUiSlider({
        start: [0,20],
        connect: true,
        step: 0,
        format: wNumb({
            decimals: 0
        }),
        range: {
            'min': 0,
            'max': 65
        }
    });
    this.$('#wind-range').Link('lower').to(this.$('#wind-min'));
    this.$('#wind-range').Link('upper').to(this.$('#wind-max'));

});