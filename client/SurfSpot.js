Meteor.startup(function () {
    Meteor.subscribe("Spots");
    $(".dial").knob();
});
