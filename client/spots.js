Template.spots.helpers({
    spots: function () {
        return Spots.find();
    }
});

Template.spots.events({
    'click #add-spot-modal': function (event) {
        $("#add-spot").fadeIn();
    }
});