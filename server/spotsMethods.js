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
            colour: spot.colour

        });
        console.log(spotId);
    }
});

