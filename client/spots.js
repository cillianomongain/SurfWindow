Template.spots.helpers({

});

Template.spots.events({
    'click #add-spot-modal': function (event) {
        Session.set("selectedSpot", null);
        showSpotModal();
    }
});
