Template.week.helpers({
    column: function () {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) return latestData.waveHeight;
    },
    waveHeight: function () {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) return latestData.waveHeight;
    },
    wavePeriod: function () {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) return latestData.wavePeriod;
    },
    waveDirection: function () {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) return latestData.waveDirection;
    },
    wind: function () {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) return latestData.windSpeed;
    },
    windDirection: function () {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) return latestData.windDirection;
    },
    parseInt: function (number) {
          return parseInt(number);
    },
    waveDirectionOpacity: function (index) {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) {
            var number = latestData.waveHeight[index];
            return (number/10)*2;
        }

    },
    waveOpacity: function (number) {
        return (number/10)*2;
    },
    wavePeriodOpacity: function (number) {
        return (number-10)*0.1;
    },
    windDirectionOpacity: function (index) {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) {
            var number = latestData.windSpeed[index];
            return number*0.03;
        }

    },
    windOpacity: function (number) {
        return number*0.04;
    },
    date: function () {
        var latestData = Data.find({}, {sort: {initDate: -1}, limit: 1}).fetch().pop();
        if (latestData) return latestData.date;
    },
    dots: function (index) {
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
Template.week.events({
    'click #update-forecast': function () {
        Meteor.call("getGuru", function (error, result) {
            if (error) {
                consol.log(error);
            }
            rotateArrows();
            console.log("Result: " + result);
        });
    },
    'click .spot-title': function () {
        console.log(this);
        Session.set("selectedSpot", this);
        showSpotModal();
    }

});

Template.week.onCreated(function () {
    console.log("created");
    setTimeout(function(){ rotateArrows(); }, 3000);
});

rotateArrows = function() {
    $('img.arrow').each(function () {
        var deg = $(this).data('rotate') || 0;
        var rotate = 'rotate(' + $(this).data('rotate') + 'deg)';
        $(this).css({
            '-webkit-transform': rotate,
            '-moz-transform': rotate,
            '-o-transform': rotate,
            '-ms-transform': rotate,
            'transform': rotate
        });
    });
};

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
