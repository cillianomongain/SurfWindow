Template.week.helpers({
    column: function () {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) return latestData.waveHeight;
    },
    date: function () {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) return latestData.date;
    },
    swell: function (index) {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        var spots = Spots.find();
        var spotArray = [];
        spots.forEach(function (spot) {
            if (latestData.waveHeight[index] >= spot.swellSizeMin &&
                latestData.waveHeight[index] <= spot.swellSizeMax &&
                latestData.waveDirection[index] >= spot.swellDirMin &&
                latestData.waveDirection[index] <= spot.swellDirMax &&
                latestData.windDirection[index] >= spot.windDirMin &&
                latestData.windDirection[index] <= spot.windDirMax &&
                latestData.windSpeed[index] >= spot.windStrengthMin &&
                latestData.windSpeed[index] <= spot.windStrengthMax
            ) {
                spotArray.push(spot.colour);
            } else {
                spotArray.push("blank");
            }
        });
        return spotArray;
    },
    days: function () {
            var obj = getDates();
            var c = [];
            for(var i in obj){
                if(obj.hasOwnProperty(i)){
                    var day = {date:i, cols:obj[i]};
                    c.push(day);
                }
            }
            return c;
    },
    spots: function () {
        return Spots.find();
    },
    dayName: function (index) {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) {
            var dt = moment(latestData.initDate, "YYYY-MM-DD HH:mm:ss").add(index, 'd');
            return dt.format('dddd');
        }
    }
});

getDates = function() {
    var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
    if (latestData) {
        var days = latestData.date;
        var obj = {};
        for (var i = 0, j = days.length; i < j; i++) {
            if (obj[days[i]]) {
                obj[days[i]]++;
            }
            else {
                obj[days[i]] = 1;
            }
        }
        return obj
    }
};
