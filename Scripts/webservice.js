// jQuery functions to manipulate the main page and handle communication with
// the films web service via Ajax.

//get films from database and display the visualizations
function getAllFilms()
{
    $.ajax({
        url: '/100488290_IMDB_VISUALIZATIONS/films',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createFilmsTable(data);
            getVisualization(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("no good")
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}


//create the table containing the films data
function createFilmsTable(films)
{
    var strResult = '<div class="col-md-12">' +
        '<table class="table table-bordered table-hover">' +
        '<thead>' +
        '<tr>' +
        '<th>Title</th>' +
        '<th>Genre</th>' +
        '<th>Year</th>' +
        '<th>IMDB Vote</th>' +
        '<th>&nbsp;</th>' +
        '<th>&nbsp;</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';
    $.each(films, function (index, film)
    {
        strResult += "<tr><td>" + film.Title + "</td><td> " + film.Genre + "</td><td>" + film.Year + "</td><td>"+ film.AverageVote + "</td><td>";
        strResult += '<input type="button" value="Edit Film" class="btn btn-sm btn-primary" onclick="editFilm(' + film.TitleID + ');" />';
        strResult += '</td><td>';
        strResult += '<input type="button" value="Delete Film" class="btn btn-sm btn-primary" onclick="deleteFilm(' + film.TitleID + ');" />';
        strResult += "</td></tr>";
    });
    strResult += "</tbody></table>";

    $("#allfilms").html(strResult);
}


//create the form to insert a new film
function createNewFilmForm()
{
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';
    strResult += '<div class="form-group"><label for="filmtitle" class="col-md-3 control-label">Film Title</label><div class="col-md-9"><input type="text" class="form-control" id="filmtitle"></div></div>';
    strResult += '<div class="form-group"><label for="filmyear" class="col-md-3 control-label">Film Year</label><div class="col-md-9"><input type="text" class="form-control" id="filmyear"></div></div>';
    strResult += '<div class="form-group"><label for="filmgenre" class="col-md-3 control-label">Genre</label><div class="col-md-9"><input type="text" class="form-control" id="filmgenre"></div></div>';
    strResult += '<div class="form-group"><label for="filmduration" class="col-md-3 control-label">Duration</label><div class="col-md-9"><input type="text" class="form-control" id="filmduration"></div></div>';
    strResult += '<div class="form-group"><label for="filmcountry" class="col-md-3 control-label">Country</label><div class="col-md-9"><input type="text" class="form-control" id="filmcountry"></div></div>';
    strResult += '<div class="form-group"><label for="filmlanguage" class="col-md-3 control-label">Language</label><div class="col-md-9"><input type="text" class="form-control" id="filmlanguage"></div></div>';
    strResult += '<div class="form-group"><label for="filmdirector" class="col-md-3 control-label">Director</label><div class="col-md-9"><input type="text" class="form-control" id="filmdirector"></div></div>';
    strResult += '<div class="form-group"><label for="filmwriter" class="col-md-3 control-label">Writer</label><div class="col-md-9"><input type="text" class="form-control" id="filmwriter"></div></div>';
    strResult += '<div class="form-group"><label for="filmproduction" class="col-md-3 control-label">Production</label><div class="col-md-9"><input type="text" class="form-control" id="filmproduction"></div></div>';
    strResult += '<div class="form-group"><label for="filmdescription" class="col-md-3 control-label">Description</label><div class="col-md-9"><input type="text" class="form-control" id="filmdescription"></div></div>';
    strResult += '<div class="form-group"><label for="filmaveragevote" class="col-md-3 control-label">Average Vote</label><div class="col-md-9"><input type="text" class="form-control" id="filmaveragevote"></div></div>';
    strResult += '<div class="form-group"><label for="filmvotes" class="col-md-3 control-label">Votes</label><div class="col-md-9"><input type="text" class="form-control" id="filmvotes"></div></div>';
    strResult += '<div class="form-group"><label for="filmbudget" class="col-md-3 control-label">Budget</label><div class="col-md-9"><input type="text" class="form-control" id="filmbudget"></div></div>';
    strResult += '<div class="form-group"><label for="filmUSAincome" class="col-md-3 control-label">USA Income</label><div class="col-md-9"><input type="text" class="form-control" id="filmUSAincome"></div></div>';
    strResult += '<div class="form-group"><label for="filmworldwideincome" class="col-md-3 control-label">Worldwide income</label><div class="col-md-9"><input type="text" class="form-control" id="filmworldwideincome"></div></div>';
    strResult += '<div class="form-group"><label for="filmmetascore" class="col-md-3 control-label">Metascore</label><div class="col-md-9"><input type="text" class="form-control" id="filmmetascore"></div></div>';
    strResult += '<div class="form-group"><label for="filmuserreview" class="col-md-3 control-label">Users review</label><div class="col-md-9"><input type="text" class="form-control" id="filmuserreview"></div></div>';
    strResult += '<div class="form-group"><label for="filmcriticreview" class="col-md-3 control-label">Critics review</label><div class="col-md-9"><input type="text" class="form-control" id="filmcriticreview"></div></div>';
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Add Film" class="btn btn-sm btn-primary" onclick="addFilm();" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeFilm();" /></div></div>';
    strResult += '</form></div>';
    $("#newfilmform").html(strResult);

}

//add a new film into the database
function addFilm()
{
    var film = {


        TitleID: 0,
        Title: $('#filmtitle').val(),
        Year: $('#filmyear').val(),
        Genre: $('#filmgenre').val(),
        Duration: $('#filmduration').val(),
        Country: $('#filmcountry').val(),
        Language: $('#filmlanguage').val(),
        Director: $('#filmdirector').val(),
        Writer: $('#filmwriter').val(),
        ProductionCompany: $('#filmproduction').val(),
        Description: $('#filmdescription').val(),
        AverageVote: $('#filmaveragevote').val(),
        Votes: $('#filmvotes').val(),
        Budget: $('#filmbudget').val(),
        USA_Income: $('#filmUSAincome').val(),
        Worldwide_Income: $('#filmworldwideincome').val(),
        Metascore: $('#filmmetascore').val(),
        UsersReview: $('#filmuserreview').val(),
        CriticsReview:$('#filmcriticreview').val()
    };

    $.ajax({
        url: '/100488290_IMDB_VISUALIZATIONS/films',
        type: 'POST',
        data: JSON.stringify(film),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            getAllFilms();
            alert("success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    $("#newfilmform").html("");
}


//edit a film using its ID
function editFilm(TitleId)
{
    //alert(TitleId);
    $.ajax({
        url: '/100488290_IMDB_VISUALIZATIONS/films/' + TitleId,
        type: 'GET',
        cache: false,
        dataType: 'json',

        success: function (data) {

            createEditFilmForm(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('problem');
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//edit the various field of a film
function editFilmValues(filmId)
{
    var film = {
        TitleID: filmId ,
        Title: $('#filmtitle').val(),
        Year: $('#filmyear').val(),
        Genre: $('#filmgenre').val(),
        Duration: $('#filmduration').val(),
        Country: $('#filmcountry').val(),
        Language: $('#filmlanguage').val(),
        Director: $('#filmdirector').val(),
        Writer: $('#filmwriter').val(),
        ProductionCompany: $('#filmproduction').val(),
        Description: $('#filmdescription').val(),
        AverageVote: $('#filmaveragevote').val(),
        Votes: $('#filmvotes').val(),
        Budget: $('#filmbudget').val(),
        USA_Income: $('#filmUSAincome').val(),
        Worldwide_Income: $('#filmworldwideincome').val(),
        Metascore: $('#filmmetascore').val(),
        UsersReview: $('#filmuserreview').val(),
        CriticsReview:$('#filmcriticreview').val()
    };

    $.ajax({
        url: '/100488290_IMDB_VISUALIZATIONS/films',
        type: 'PUT',
        data: JSON.stringify(film),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            getAllFilms();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    $("#newfilmform").html("");

}

//create the form to edit a film containing the existing data of that film
function createEditFilmForm(film)
{
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';
    strResult += '<div class="form-group"><label for="filmtitle" class="col-md-3 control-label">Film Title</label><div class="col-md-9"><input type="text" class="form-control" id="filmtitle" value="' + film.Title + '" ></div></div>';
    strResult += '<div class="form-group"><label for="filmyear" class="col-md-3 control-label">Film Year</label><div class="col-md-9"><input type="text" class="form-control" id="filmyear" value="' + film.Year + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmgenre" class="col-md-3 control-label">Genre</label><div class="col-md-9"><input type="text" class="form-control" id="filmgenre" value="' + film.Genre + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmduration" class="col-md-3 control-label">Duration</label><div class="col-md-9"><input type="text" class="form-control" id="filmduration" value="' + film.Duration + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmcountry" class="col-md-3 control-label">Country</label><div class="col-md-9"><input type="text" class="form-control" id="filmcountry" value="' + film.Country + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmlanguage" class="col-md-3 control-label">Language</label><div class="col-md-9"><input type="text" class="form-control" id="filmlanguage" value="' + film.Language + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmdirector" class="col-md-3 control-label">Director</label><div class="col-md-9"><input type="text" class="form-control" id="filmdirector" value="' + film.Director + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmwriter" class="col-md-3 control-label">Writer</label><div class="col-md-9"><input type="text" class="form-control" id="filmwriter" value="' + film.Writer + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmproduction" class="col-md-3 control-label">Production</label><div class="col-md-9"><input type="text" class="form-control" id="filmproduction" value="' + film.ProductionCompany + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmdescription" class="col-md-3 control-label">Description</label><div class="col-md-9"><input type="text" class="form-control" id="filmdescription" value="' + film.Description + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmaveragevote" class="col-md-3 control-label">Average Vote</label><div class="col-md-9"><input type="text" class="form-control" id="filmaveragevote" value="' + film.AverageVote + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmvotes" class="col-md-3 control-label">Votes</label><div class="col-md-9"><input type="text" class="form-control" id="filmvotes" value="' + film.Votes + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmbudget" class="col-md-3 control-label">Budget</label><div class="col-md-9"><input type="text" class="form-control" id="filmbudget" value="' + film.Budget + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmUSAincome" class="col-md-3 control-label">USA Income</label><div class="col-md-9"><input type="text" class="form-control" id="filmUSAincome" value="' + film.USA_Income + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmworldwideincome" class="col-md-3 control-label">Worldwide income</label><div class="col-md-9"><input type="text" class="form-control" id="filmworldwideincome" value="' + film.Worldwide_Income + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmmetascore" class="col-md-3 control-label">Metascore</label><div class="col-md-9"><input type="text" class="form-control" id="filmmetascore" value="' + film.Metascore + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmuserreview" class="col-md-3 control-label">Users review</label><div class="col-md-9"><input type="text" class="form-control" id="filmuserreview" value="' + film.UsersReview + '"></div></div>';
    strResult += '<div class="form-group"><label for="filmcriticreview" class="col-md-3 control-label">Critics review</label><div class="col-md-9"><input type="text" class="form-control" id="filmcriticreview" value="' + film.CriticsReview + '"></div></div>';
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Edit Film" class="btn btn-sm btn-primary" onclick="editFilmValues(' + film.TitleID + ');" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeFilm();" /></div></div>';
    strResult += '</form></div>';
    $("#newfilmform").html(strResult);

}

//delete a film from the database
function deleteFilm(filmId)
{
    $.ajax({
        url: '/100488290_IMDB_VISUALIZATIONS/films/' + filmId,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            getAllFilms();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

//remove the form created with add or edit a film
function cancelChangeFilm()
{
    $("#newfilmform").html("");
}


//display all the visualizations based on the data extracted from the database
function getVisualization(data)
{
    data.forEach(function(d) {

        d.title_year =+d.Year;
        d.gross =+d.USA_Income;
        d.budget =+d.Budget;
        d.genre = d.Genre;
        d.imdb_score =+d.AverageVote;
        d.num_voted_users =+d.Votes;

    });
    //  alert(d);
    // var titledisplay = JSON.stringify(d.title_year);

    var ndx = crossfilter(data),
        // x dimension for histogram
        yearDim = ndx.dimension(function(d) { return +d.title_year; }),
        movieCountHisto = yearDim.group().reduceCount(),

        mpaaDim = ndx.dimension(function(d) { return d.genre; }),
        mpaaCountPie = mpaaDim.group().reduceCount(),

        imdbDim = ndx.dimension(function(d) { return +d.imdb_score; }),
        imdbCountHisto = imdbDim.group().reduceCount(),

        // scatterplot dimensions
        scatterDim = ndx.dimension(function(d) { return [+d.budget, +d.gross]; }),


        // heatmap
        imdbMpaaDim = ndx.dimension(function(d) { return [+d.imdb_score, d.genre]; }),
        grossHeat = imdbMpaaDim.group().reduceCount();

    // series chart
    mpaaYearDim = ndx.dimension(function(d) { return [d.genre, +d.title_year]; }),
        imdbGroupSeries = mpaaYearDim.group().reduce(
            /* callback for when data is added to the current filter results */
            function (p, v) {
                ++p.count;
                p.sum+= +v.imdb_score;
                p.average = (p.sum / p.count);
                return p;
            },
            /* callback for when data is removed from the current filter results */
            function (p, v) {
                --p.count;
                p.sum-= +v.imdb_score;
                p.average = (p.sum / p.count);
                return p;
            },
            /* initialize p */
            function () {
                return {
                    count: 0,
                    sum: 0,
                    average: 0
                };
            }
        ),

        // composite chart
        imdbDim2 = ndx.dimension(function(d) { return +d.imdb_score; }),
        grossCompLine = imdbDim2.group().reduce(
            /* callback for when data is added to the current filter results */
            function (p, v) {
                ++p.count;
                p.sum+= +v.gross;
                p.average = (p.sum / p.count);
                return p;
            },
            /* callback for when data is removed from the current filter results */
            function (p, v) {
                --p.count;
                p.sum-= +v.gross;
                p.average = (p.sum / p.count);
                return p;
            },
            /* initialize p */
            function () {
                return {
                    count: 0,
                    sum: 0,
                    average: 0
                };
            }
        ),
        numVotersCompLine = imdbDim2.group().reduce(
            /* callback for when data is added to the current filter results */
            function (p, v) {
                ++p.count;
                p.sum+= +v.num_voted_users;
                p.average = (p.sum / p.count);
                return p;
            },
            /* callback for when data is removed from the current filter results */
            function (p, v) {
                --p.count;
                p.sum-= +v.num_voted_users;
                p.average = (p.sum / p.count);
                return p;
            },
            /* initialize p */
            function () {
                return {
                    count: 0,
                    sum: 0,
                    average: 0
                };
            }
        );

    var allData = ndx.groupAll();

    // count all the facts
    dc.dataCount(".dc-data-count")
        .dimension(ndx)
        .group(allData);


    // histogram attributes
    myHistogram
        .width(1400)
        .height(400)
        .margins({top: 0, right: 50, bottom: 40, left: 40})
        .x(d3.scale.linear().domain([1916, 2022]))
        .xAxisLabel("Year")
        .yAxisLabel("Number of Movies")
        .brushOn(false)
        .elasticY(true) // scales y axis values from interactions
        .dimension(yearDim)
        .group(movieCountHisto)
        .centerBar(false)
        .controlsUseVisibility(true)
        .ordinalColors(["#126eb5"])
        .renderHorizontalGridLines(true)
        .title(function(d) { // probing
            return 'Year: ' + d.key + '\n'
                + 'Number of Movies: ' + d.value;
        })
        .xAxis().tickFormat(d3.format("d"));


    myHistogram2
        .width(1400)
        .height(400)
        .margins({top: 0, right: 50, bottom: 40, left: 40})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("IMDb Score")
        .yAxisLabel("Number of Movies")
        .brushOn(false) // disable select/brushing
        .elasticY(true) // scales y axis values from interactions
        .dimension(imdbDim)
        .group(imdbCountHisto)
        .centerBar(false)
        .controlsUseVisibility(true)
        .ordinalColors(["#22dece"])
        .renderHorizontalGridLines(true)
        .title(function(d) { // probing
            return 'IMDb Score: ' + d.key + '\n'
                + 'Number of Movies: ' + d.value;
        })
        .xAxis().tickFormat(d3.format(".1f"));;


    myPiechart
        .width(800)
        .height(500)
        .innerRadius(100)
        .dimension(mpaaDim)
        .group(mpaaCountPie)
        .colors(d3.scale.category20())
        .legend(dc.legend().itemHeight(20));


    // Values next to items in legend
    // from http://stackoverflow.com/questions/38430632/how-can-we-add-legends-value-beside-of-legend-with-proper-alignment-and-differe
    myPiechart.on('pretransition', function(chart) {
        myPiechart.selectAll('.dc-legend-item text')
            .text('')
            .append('tspan')
            .text(function(d) { return d.name; })
            .append('tspan')
            .attr('x', 100)
            .attr('text-anchor', 'end')
            .text(function(d) { return d.data; });
    });


    // scatterplot attributes
    myScatterplot // brushOn is true by default
        .width(1400)
        .height(500)
        .margins({top: 10, right: 50, bottom: 40, left: 80})
        .y(d3.scale.linear().domain([0, 1000000000]))
        .x(d3.scale.linear().domain([0, 400000000]))
        .xAxisLabel("Budget (USD)")
        .yAxisLabel("Domestic Box Office Gross (USD)")
        .clipPadding(10)
        .dimension(scatterDim)
        .group(scatterDim.group())
        .ordinalColors(["#22de7d"]) // change color to red
        .excludedOpacity(0.7)
        .excludedColor("#aaa") // deselected values change to gray


    // **heatmap legend data, resource used:
    // http://stackoverflow.com/questions/31441536/is-there-a-way-to-make-a-key-or-legend-for-a-heat-map-with-dc-js

    // set min and max heat values, find range value
    var heatMaxValue = 100;
    var heatMinValue = 0;
    var heatRangeValue = heatMaxValue - heatMinValue;

    // get each value for probing the legend
    var heatValues = [];
    for (var i = 0; i < 45; i++) {
        heatValues.push( {
            val: heatMinValue + i / 44 * heatRangeValue,
            index: i
        });
    }

    var heat = crossfilter(heatValues);

    var heatmapLegendDim = heat.dimension(function(d) {
        return [d.index, 1];
    });

    var heatmapLegendGroup = heatmapLegendDim.group().reduceSum(function(d) {
        return d.val;
    });

    // create a color mapping for heatmap of min and max value of domains to range between set of colors
    var heatmapColorMap = function(d) {
        return d3.scale.linear().domain([heatMinValue, heatMaxValue]).range(["#de8322", "#12b515"])(d);
    };

    heatmapColorMap.domain = function() {
        return [heatMinValue, heatMaxValue];
    };
    // **end heatmap legend data

    // heatmap attributes
    myHeatmap
        .width(1400)
        .height(400)
        .margins({top: 0, right: 50, bottom: 20, left: 70})
        .dimension(imdbMpaaDim)
        .group(grossHeat)
        .xBorderRadius(0) // 0 gets full rectangles
        .yBorderRadius(0)
        .keyAccessor(function(d) { return +d.key[0]; })
        .valueAccessor(function(d) { return d.key[1]; })
        .colorAccessor(function(d) { return +d.value; })
        .title(function(d) { // probing
            return 'IMDb Score: ' + d.key[0] + '\n'
                + 'Genre: ' + d.key[1] + '\n'
                + 'Films: ' + d.value; })
        .colors(heatmapColorMap)
        .calculateColorDomain();

    // heatmap legend attributes
    myHeatmapLegend
        .width(1400)
        .height(40)
        .margins({top: 0, right: 50, bottom: 10, left: 70})
        .dimension(heatmapLegendDim)
        .group(heatmapLegendGroup)
        .xBorderRadius(0) // 0 gets full rectangles
        .yBorderRadius(0)
        .boxOnClick(function(d) { return; }) // Disable clicking
        .rowsLabel(function(d) { return "Color Legend"; })
        .colsLabel(function(d){ return null; })
        .keyAccessor(function(d) { return d.key[0]; })
        .valueAccessor(function(d) { return d.key[1]; })
        .colorAccessor(function(d) { return d.value; })
        .title(function(d) { // probing
            return 'Films number: ' + Math.round(d.value); })
        .colors(heatmapColorMap)
        .calculateColorDomain();


    // render everything
    dc.renderAll();



}


