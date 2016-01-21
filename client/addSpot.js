Template.addSpot.events({
    'click button#add-spot-submit': function (event) {
        event.preventDefault();
        var swellDirection = $("#swell-direction-circle").val();
        var windDirection = $("#wind-direction-circle").val();
        var id;
        if (Session.get("selectedSpot")) id = Session.get("selectedSpot")._id;
        var spot = {
            _id: id,
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
        if (Session.get("selectedSpot")) {
            Meteor.call("updateSpot", spot);
        } else {
            Meteor.call("addSpot", spot);
        }

        console.log("Added");
        hideSpotModal();
    },
    'click .overlay': function () {
        hideSpotModal();
    },
    'click .colour-select': function (event) {
        $(".colour-select").removeClass("selected");
        $(event.target).addClass("selected");
        var colour = $(event.target).data("colour");
        Session.set("selectedColour", colour);

        //Set colour of wave/wind gauges
        //$(".noUi-connect").addClass(colour);
        //$(".selected-range").addClass(colour);

    },
    'click #delete-spot': function () {
        var r = confirm("Are you sure you want to delete " + Session.get("selectedSpot").name + "?");
        if (r == true) {
            Meteor.call("deleteSpot", Session.get("selectedSpot"));
            hideSpotModal();
        } else {

        }
    }

});

Template.addSpot.helpers({
    currentColour: function () {
        if (Session.get("selectedColour")) {
            return Session.get("selectedColour");
        } else {
            return "colour1";
        }
    },
    swellRange: function () {
        if (Session.get("swellDirectionRange")) {
            console.log(Session.get("swellDirectionRange"));
            return Session.get("swellDirectionRange");
        } else {
            return "20;100";
        }

    },
    spotExists: function () {
        if (Session.get("selectedSpot")) return true;
    }
});

Template.addSpot.onRendered(function () {

    // Set spot defaults
    var swellMin = 0.5;
    var swellMax = 4;
    var windMin = 0;
    var windMax = 20;
    $('input#name').val("");
    $('#add-spot-submit').val(Session.get("Add Spot"));


    this.$('#swell-range').noUiSlider({
        start: [swellMin, swellMax],
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
    this.$('#swell-range').Link('lower').to(this.$('#swell-size-min'));
    this.$('#swell-range').Link('upper').to(this.$('#swell-size-max'));

    this.$('#wind-range').noUiSlider({
        start: [windMin, windMax],
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


showSpotModal = function () {
    //var circleView = Blaze.getView(document.getElementsByClassName("circle-range-select-wrapper")[0]);
    //Blaze.remove(circleView);
    //$('#swell-direction-circle').lcnCircleRangeSelect();

    if (Session.get("selectedSpot")) {
        // Get current spot parameters
        var spot = Session.get("selectedSpot");
        $('input#name').val(spot.name);
        $('#add-spot-submit').val(Session.get("Save"));
        $('#swell-range').val([spot.swellSizeMin, spot.swellSizeMax]);
        $('#wind-range').val([spot.windStrengthMin, spot.windStrengthMax]);

        //set new values on circles
        $('#swell-direction-circle').val(spot.swellDirMin+";"+spot.swellDirMax).trigger('change');
        $('#wind-direction-circle').val(spot.windDirMin+";"+spot.windDirMax).trigger('change');

        $(".colour-select").removeClass("selected");
        $(".colour-select." + spot.colour).addClass("selected");
        Session.set("selectedColour", spot.colour);

    } else {
        $('input#name').val("");
        $('#add-spot-submit').val(Session.get("Add Spot"));
        $('#swell-range').val([1, 4]);
        $('#wind-range').val([0, 20]);

        //set new values on circles
        $('#swell-direction-circle').val("240;300").trigger('change');
        $('#wind-direction-circle').val("60;120").trigger('change');

        $(".colour-select").removeClass("selected");
        $(".colour-select.colour3").addClass("selected");
        Session.set("selectedColour", "colour3");
    }

    $("#add-spot").fadeIn();
    $("#main-page").css("transform", "scale(0.9)").fadeOut();

};

hideSpotModal = function () {
    $("#add-spot").fadeOut();
    $("#main-page").css("transform", "scale(0.9)").fadeIn().css("transform", "scale(1.0)");
    Session.set("selectedSpot", null);
};