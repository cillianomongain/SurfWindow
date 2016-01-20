Meteor.methods({
    addSpot: function (spot) {
        var spotId = Spots.insert({
            name: spot.name,
            swellSizeMin: spot.swellSizeMin,
            swellSizeMax: spot.swellSizeMax,
            swellDirMin: spot.swellDirMin,
            swellDirMax: spot.swellDirMax,
            windStrengthMin: spot.windStrengthMin,
            windStrengthMax: spot.windStrengthMax,
            windDirMin: spot.windDirMin,
            windDirMax: spot.windDirMax,
            colour: spot.colour,
            created: new Date()
        });
        console.log(spotId);
    },
    updateSpot: function (spot) {
        Spots.update(spot._id, {
            $set: {
                name: spot.name,
                swellSizeMin: spot.swellSizeMin,
                swellSizeMax: spot.swellSizeMax,
                swellDirMin: spot.swellDirMin,
                swellDirMax: spot.swellDirMax,
                windStrengthMin: spot.windStrengthMin,
                windStrengthMax: spot.windStrengthMax,
                windDirMin: spot.windDirMin,
                windDirMax: spot.windDirMax,
                colour: spot.colour,
                modified: new Date()
            }
        });
        console.log("updated spot: " + spot._id);
    },
    deleteSpot: function (spot) {
        console.log("removed spot: " + spot._id);
        Spots.remove(spot._id);

    }
});

