Meteor.publish('Spots', function() {
    return Spots.find();
});