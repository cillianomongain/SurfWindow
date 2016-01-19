Template.addSpot.events({
    'click button#add-spot-submit': function (event) {
        event.preventDefault();
        var swellDirection = $("#swell-direction-circle").val();
        var windDirection = $("#wind-direction-circle").val();

        var spot = {
            name: $('input#name').val(),
            swellDirMin: swellDirection.split(";")[0],
            swellDirMax: swellDirection.split(";")[1],
            swellSizeMin: $('#swell-size-min').text(),
            swellSizeMax: $('#swell-size-max').text(),
            windStrengthMin: $('#wind-min').text(),
            windStrengthMax: $('#wind-max').text(),
            windDirMin: windDirection.split(";")[0],
            windDirMax: windDirection.split(";")[1],
            colour: Session.get("selectedColour")
        };
        Meteor.call("addSpot", spot);
        console.log("Added");
        $("#add-spot").fadeOut();
        $("#main-page").css("transform", "scale(0.9)").fadeIn().css("transform", "scale(1.0)");
    },
    'click .overlay': function () {
        $("#add-spot").fadeOut();
        $("#main-page").css("transform", "scale(0.9)").fadeIn().css("transform", "scale(1.0)");
    },
    'click .colour-select': function (event) {
        $(".colour-select").removeClass("selected");
        $(event.target).addClass("selected");
        var colour = $(event.target).data("colour");
        Session.set("selectedColour", colour);

        //Set colour of wave/wind gauges
        //$(".noUi-connect").addClass(colour);
        //$(".selected-range").addClass(colour);

    }

});

Template.addSpot.helpers({
    currentColour: function() {
        if (Session.get("selectedColour")) {
            return Session.get("selectedColour");
        } else {
            return "colour1";
        }
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