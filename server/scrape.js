Meteor.startup(function () {
    //var cheerio = Meteor.npmRequire("cheerio");

    Meteor.methods({
            getGuru: function () {
                var result = Meteor.http.get("http://www.windguru.cz/int/index.php?sc=5688&sty=m_spot");
                //result = result.replace(/(//<![CDATA[)/g, "");

                //console.log(result);
                $ = cheerio.load(result.content);
                var data;
                $('script').each(function (i, elem) {
                    var script = $(this).html();
                    script = script.replace("//<![CDATA[", "");
                    script = script.replace("//]]>", "");
                    script = script.replace(";", "");
                    if (script.indexOf("wg_fcst_tab_data_1") >= 0) {
                        script = script.replace("var wg_fcst_tab_data_1 = ", "");
                        script = script.substring(0, script.indexOf('var wgopts_1'));
                        //console.log(script);
                        data = script;
                    }
                });
                data = JSON.parse(data);
                var forecast = data.fcst;
                var three = forecast["3"];
                //console.log(three);

                var totalPoints = 56;

                var entryId = Data.insert({
                    windSpeed: three["WINDSPD"].slice(0, totalPoints),
                    windGust: three["GUST"].slice(0, totalPoints),
                    windDirection: three["WINDDIR"].slice(0, totalPoints),
                    waveHeight: three["HTSGW"].slice(0, totalPoints),
                    wavePeriod: three["PERPW"].slice(0, totalPoints),
                    waveDirection: three["DIRPW"].slice(0, totalPoints),
                    temperature: three["TMP"].slice(0, totalPoints),
                    rain: three["APCP"].slice(0, totalPoints),
                    highCloud: three["HCDC"].slice(0, totalPoints),
                    midCloud: three["MCDC"].slice(0, totalPoints),
                    lowCloud: three["LCDC"].slice(0, totalPoints),
                    time: three["hr_h"].slice(0, totalPoints),
                    date: three["hr_d"].slice(0, totalPoints),
                    initDate: three["initdate"]
                });

                return entryId;

            },
            getWaves: function (lat, lon) {
                if (lon < 0) {
                    lon = 360+lon;
                }
                var x = (lat + 78)/1;
                var y = (lon - 0)/1.25;

                var date = moment(new Date());
                var date = date.format("YYYYMMDD");

                console.log(date);
                var result = Meteor.http.get("http://nomads.ncep.noaa.gov:9090/dods/wave/nww3/nww3"+date+"/nww3"+date+"_00z.ascii?htsgwsfc[0:60]["+x+"]["+y+"]");
                //result = result.replace(/(//<![CDATA[)/g, "");

                //console.log(result.content);
                var data;

                var script = result.content;
                script = script.replace("htsgwsfc, [61][1][1]", "{waveHeight:[");
                script = script.replace(/\[\d*\]\[\d*\]/g, "");
                script = script.replace("time, [61]", "], time: [");
                script = script.replace("lat, [1]", "], lat: ");
                script = script.replace("lon, [1]", ", lon: ");
                script = script.concat("}");

                data = JSON.stringify(eval('('+script+')'));
                data = JSON.parse(data);
                //data = data.replace(/(\r\n|\n|\r)/gm,"");
                console.log(data.waveHeight);

                var waveHeightArray = data.waveHeight;
                waveHeightArray.shift();

                var entryId = Data2.insert({
                    waveHeight: waveHeightArray,
                    lat: data.lat,
                    lon: data.lon,
                    initDate: new Date()
                });

            }
        }
    );

});
