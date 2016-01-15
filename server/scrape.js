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

                var entryId = Data.insert({
                    windSpeed: three["WINDSPD"],
                    windGust: three["GUST"],
                    windDirection: three["WINDDIR"],
                    waveHeight: three["HTSGW"],
                    wavePeriod: three["PERPW"],
                    waveDirection: three["DIRPW"],
                    temperature: three["TMP"],
                    rain: three["APCP"],
                    highCloud: three["HCDC"],
                    midCloud: three["MCDC"],
                    lowCloud: three["LCDC"],
                    time: three["hr_h"],
                    date: three["hr_d"],
                    initDate: three["initdate"]
                });

                return entryId;

            }
        }
    );

});
