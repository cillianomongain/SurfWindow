Template.spots.helpers({

});

Template.spots.events({
    'click #add-spot-modal': function (event) {
        $("#add-spot").fadeIn();
        $("#main-page").css("transform", "scale(0.9)").fadeOut();
        //$("#main-page").fadeOut();

    }
});