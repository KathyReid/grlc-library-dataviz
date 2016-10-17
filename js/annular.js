

var color = d3.scaleOrdinal()
    .range([
        "#59d134",
        "#4CCA62",
        "#40C28F",
        "#33bbbd",
        "#36AFC7",
        "#3b98da",
        "#427DC9",
        "#5148a6",
        "#8647A8",
        "#BC47A9",
        "#f146ab",
        "#F03E85",
        "#F0355E",
        "#f0431e",
        "#F8880F",
        "#FFCC00",
        "#ACCF1A"
      ])
    .domain([
        "Geelong",
        "Belmont",
        "Corio",
        "Geelong West",
        "Waurn Ponds",
        "Ocean Grove",
        "Newcomb",
        "Torquay",
        "Drysdale",
        "Lara",
        "Bannockburn",
        "Queenscliff",
        "Chilwell",
        "Highton",
        "Mobile Libraries",
        "Barwon Heads",
        "Western Heights College"
    ]);


var CollectionArcSequence = 0;
var LoansArcSequence      = 1;
var MembersArcSequence    = 2;
var EventsArcSequence     = 3;
var VisitsArcSequence     = 4;
var WirelessArcSequence   = 5;
var InternetArcSequence   = 6;

var width = 1024,
    height = 768,
    radius = Math.min(width, height) / 2;

var annularXOffset  = 100; // how much to shift the annulars horizontally from centre
var annularYOffset  = 0; // how much to shift the annulars vertically from centre
var annularSpacing  = 26; // space between different annulars
var annularWidth    = 22; // width of each annular
var annularMargin   = 70; // margin between annulars and canvas
var padAngle        = 0.027; // amount that each segment of an annular is padded
var cornerRadius    = 4; // amount that the sectors are rounded

var titleOffSet     = 16; // amount in pixels that the title arc inner and outer radii are offset from the dataset arc that they are labelling
var titleRotationOffSet = -14; // amount in percent that the title is rotated from the 180 degree mark
var endAngle        = 0; // end angle for title arcs

/* Variables used in displaying the legend */
var legendWidth       = 40; // size of each rectangle for the legend
var legendHeight      = 35; // size of each rectangle for the legend
var legendXSpacing    = 7; // x offset for series values
var legendYSpacing    = 10;  // y offset for series values
var legendPlacementX  = 360 // x co-ordinate for legend placement
var legendPlacementY  = ((height/2*-1) + (annularMargin)); // y co-ordinate for legend placement
var legendStrokeColor = '#000';

/* Variables used with the d3.tip tooltips */

var tipXOffSet = 0; // x offset for tooltip display in pixels
var tipYOffSet = 0; // y offset for tooltip display in pixels

/*
  Main arcs for each data set
*/

var CollectionArc = d3.arc()
    .outerRadius(radius - (annularMargin + ((CollectionArcSequence - 1) *   annularWidth + ((CollectionArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - (annularMargin + (CollectionArcSequence * annularWidth + ((CollectionArcSequence - 1) * annularSpacing))))
    .padAngle(padAngle)
    .cornerRadius(cornerRadius);

var CollectionTitleArc = d3.arc()
    .outerRadius(radius + titleOffSet - (annularMargin + ((CollectionArcSequence - 1) *   annularWidth + ((CollectionArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - titleOffSet - (annularMargin + (CollectionArcSequence * annularWidth + ((CollectionArcSequence - 1) * annularSpacing))))
    .startAngle(Math.PI-(Math.PI/100*titleRotationOffSet))
    .endAngle(endAngle);

var LoansArc = d3.arc()
    .outerRadius(radius - (annularMargin + ((LoansArcSequence - 1) *   annularWidth + ((LoansArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - (annularMargin + (LoansArcSequence * annularWidth + ((LoansArcSequence - 1) * annularSpacing))))
    .padAngle(padAngle)
    .cornerRadius(cornerRadius)

var LoansTitleArc = d3.arc()
    .outerRadius(radius + titleOffSet - (annularMargin + ((LoansArcSequence - 1) *   annularWidth + ((LoansArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - titleOffSet - (annularMargin + (LoansArcSequence * annularWidth + ((LoansArcSequence - 1) * annularSpacing))))
    .startAngle(Math.PI-(Math.PI/100*titleRotationOffSet))
    .endAngle(endAngle);

var MembersArc = d3.arc()
    .outerRadius(radius - (annularMargin + ((MembersArcSequence - 1) *   annularWidth + ((MembersArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - (annularMargin + (MembersArcSequence * annularWidth + ((MembersArcSequence - 1) * annularSpacing))))
    .padAngle(padAngle)
    .cornerRadius(cornerRadius)

var MembersTitleArc = d3.arc()
    .outerRadius(radius + titleOffSet - (annularMargin + ((MembersArcSequence - 1) *   annularWidth + ((MembersArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - titleOffSet - (annularMargin + (MembersArcSequence * annularWidth + ((MembersArcSequence - 1) * annularSpacing))))
    .startAngle(Math.PI-(Math.PI/100*titleRotationOffSet))
    .endAngle(endAngle);

var EventsArc = d3.arc()
    .outerRadius(radius - (annularMargin + ((EventsArcSequence - 1) *   annularWidth + ((EventsArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - (annularMargin + (EventsArcSequence * annularWidth + ((EventsArcSequence - 1) * annularSpacing))))
    .padAngle(padAngle)
    .cornerRadius(cornerRadius)

var EventsTitleArc = d3.arc()
    .outerRadius(radius + titleOffSet - (annularMargin + ((EventsArcSequence - 1) *   annularWidth + ((EventsArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - titleOffSet - (annularMargin + (EventsArcSequence * annularWidth + ((EventsArcSequence - 1) * annularSpacing))))
    .startAngle(Math.PI-(Math.PI/100*titleRotationOffSet))
    .endAngle(endAngle);

var VisitsArc = d3.arc()
    .outerRadius(radius - (annularMargin + ((VisitsArcSequence - 1) *   annularWidth + ((VisitsArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - (annularMargin + (VisitsArcSequence * annularWidth + ((VisitsArcSequence - 1) * annularSpacing))))
    .padAngle(padAngle)
    .cornerRadius(cornerRadius)

var VisitsTitleArc = d3.arc()
    .outerRadius(radius + titleOffSet - (annularMargin + ((VisitsArcSequence - 1) *   annularWidth + ((VisitsArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - titleOffSet - (annularMargin + (VisitsArcSequence * annularWidth + ((VisitsArcSequence - 1) * annularSpacing))))
    .startAngle(Math.PI-(Math.PI/100*titleRotationOffSet))
    .endAngle(endAngle);

var WirelessArc = d3.arc()
    .outerRadius(radius - (annularMargin + ((WirelessArcSequence - 1) *   annularWidth + ((WirelessArcSequence - 1) * annularSpacing))))
      .innerRadius(radius - (annularMargin + (WirelessArcSequence * annularWidth + ((WirelessArcSequence - 1) * annularSpacing))))
    .padAngle(padAngle)
    .cornerRadius(cornerRadius)

var WirelessTitleArc = d3.arc()
    .outerRadius(radius + titleOffSet - (annularMargin + ((WirelessArcSequence - 1) *   annularWidth + ((WirelessArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - titleOffSet - (annularMargin + (WirelessArcSequence * annularWidth + ((WirelessArcSequence - 1) * annularSpacing))))
    .startAngle(Math.PI-(Math.PI/100*titleRotationOffSet))
    .endAngle(endAngle);

var InternetArc = d3.arc()
    .outerRadius(radius - (annularMargin + ((InternetArcSequence - 1) *   annularWidth + ((InternetArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - (annularMargin + (InternetArcSequence * annularWidth + ((InternetArcSequence - 1) * annularSpacing))))
    .padAngle(padAngle)
    .cornerRadius(cornerRadius)

var InternetTitleArc = d3.arc()
    .outerRadius(radius + titleOffSet - (annularMargin + ((InternetArcSequence - 1) *   annularWidth + ((InternetArcSequence - 1) * annularSpacing))))
    .innerRadius(radius - titleOffSet - (annularMargin + (InternetArcSequence * annularWidth + ((InternetArcSequence - 1) * annularSpacing))))
    .startAngle(Math.PI-(Math.PI/100*titleRotationOffSet))
    .endAngle(endAngle);

/*
  Pie shapes for each data set
*/

var CollectionPie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Items; });

var LoansPie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Loans;});

var MembersPie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Members;});

var EventsPie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Attendance;});

var VisitsPie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Visits;});

var WirelessPie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Sessions;});

var InternetPie = d3.pie()
    .sort(null)
    .value(function(d) { return d.InternetSessions;});

/*
  SVG object - each annular is added as a layer / group
*/

var BaseSvg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + (width / 2 - annularXOffset) + "," + (height / 2 - annularYOffset) + ")");

/*
  Layers for each annular
*/

var CollectionLayer = BaseSvg.append('g');
var LoansLayer      = BaseSvg.append('g');
var MembersLayer    = BaseSvg.append('g');
var EventsLayer     = BaseSvg.append('g');
var VisitsLayer     = BaseSvg.append('g');
var WirelessLayer   = BaseSvg.append('g');
var InternetLayer   = BaseSvg.append('g');
var InternetLayer   = BaseSvg.append('g');
var TitleLayer      = BaseSvg.append('g');
var LegendLayer     = BaseSvg.append('g');

/*
  CSV calls for each data set
*/

d3.csv("data/grlccollection1516.csv", CollectionType, function(error, CollectionData) {
  if (error) throw error;



/*
var expensesByName = d3.nest()
  .key(function(d) { return d.name; })
  .entries(expenses);

  var expensesCount = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return v.length; })
  .entries(expenses);
console.log(JSON.stringify(expensesCount));


var expenseMetrics = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return {
    count: v.length,
    total: d3.sum(v, function(d) { return d.amount; }),
    avg: d3.mean(v, function(d) { return d.amount; })
  }; })
  .entries(expenses);
console.log(JSON.stringify(expenseMetrics))

*/

  var CollectionItemCount = d3.nest()
  .rollup(function (v) { return d3.sum(v, function(d) { return d.Items})})
  .entries(CollectionData);

  var g = CollectionLayer.selectAll(".arc")
      .data(CollectionPie(CollectionData))
      .enter().append("g")
      .attr("class", "CollectionArc");

  var CollectionTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([tipXOffSet, tipYOffSet])
      .html(function(d) {
        return d.data.Library +  " - "  + (d3.format(",.1%")(d.data.Items / CollectionItemCount)) +  " - " +  (d3.format(",d")(d.data.Items)) + " items" ;})

  CollectionLayer.call(CollectionTip);

  g.append("path")
      .attr("d", CollectionArc)
      .style("fill", function(d) { return color(d.data.Library); })
      .on('mouseover', CollectionTip.show)
      .on('mouseout', CollectionTip.hide);

});

d3.csv("data/grlcloans1516.csv", LoansType, function(error, LoansData) {
  if (error) throw error;

  var g = LoansLayer.selectAll(".arc")
      .data(LoansPie(LoansData))
      .enter().append("g")
      .attr("class", "LoansArc");

  var LoansTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([tipXOffSet, tipYOffSet])
      .html(function(d) { return d.data.Library + " - " + d.data.Loans + " loans" ;})

  LoansLayer.call(LoansTip);

  g.append("path")
      .attr("d", LoansArc)
      .style("fill", function(d) { return color(d.data.Library); })
      .on('mouseover', LoansTip.show)
      .on('mouseout', LoansTip.hide);

});

d3.csv("data/grlcmembers1516.csv", MembersType, function(error, MembersData) {
  if (error) throw error;

  var g = MembersLayer.selectAll(".arc")
      .data(MembersPie(MembersData))
      .enter().append("g")
      .attr("class", "MembersArc");

  var MembersTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([tipXOffSet, tipYOffSet])
      .html(function(d) { return d.data.Library +  " - " + d.data.Members + " members" ;})

      LoansLayer.call(MembersTip);

  g.append("path")
      .attr("d", MembersArc)
      .style("fill", function(d) { return color(d.data.Library); })
      .on('mouseover', MembersTip.show)
      .on('mouseout', MembersTip.hide);
});

d3.csv("data/grlcprogramsevents1516.csv", EventsType, function(error, EventsData) {
  if (error) throw error;

  var g = EventsLayer.selectAll(".arc")
      .data(EventsPie(EventsData))
      .enter().append("g")
      .attr("class", "EventsArc");

  var EventsTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([tipXOffSet, tipYOffSet])
      .html(function(d) { return d.data.Library +  " - " + d.data.Attendance + " attendees" ;})

  EventsLayer.call(EventsTip);

  g.append("path")
      .attr("d", EventsArc)
      .style("fill", function(d) { return color(d.data.Library); })
      .on('mouseover', EventsTip.show)
      .on('mouseout', EventsTip.hide);
});

d3.csv("data/grlcvisits1516.csv", VisitsType, function(error, VisitsData) {
  if (error) throw error;

  var g = VisitsLayer.selectAll(".arc")
      .data(VisitsPie(VisitsData))
      .enter().append("g")
      .attr("class", "VisitsArc");

  var VisitsTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([tipXOffSet, tipYOffSet])
      .html(function(d) { return d.data.Library +  " - " + d.data.Visits + " visits" ;})

  VisitsLayer.call(VisitsTip);

  g.append("path")
      .attr("d", VisitsArc)
      .style("fill", function(d) { return color(d.data.Library); })
      .on('mouseover', VisitsTip.show)
      .on('mouseout', VisitsTip.hide);
});

d3.csv("data/grlcwirelesssessions1516.csv", WirelessType, function(error, WirelessData) {
  if (error) throw error;

  var g = WirelessLayer.selectAll(".arc")
      .data(WirelessPie(WirelessData))
      .enter().append("g")
      .attr("class", "WirelessArc");

  var WirelessTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([tipXOffSet, tipYOffSet])
      .html(function(d) { return d.data.Library +  " - " + d.data.Sessions + " sessions" ;})

  WirelessLayer.call(WirelessTip);

  g.append("path")
      .attr("d", WirelessArc)
      .style("fill", function(d) { return color(d.data.Library); })
      .on('mouseover', WirelessTip.show)
      .on('mouseout', WirelessTip.hide);
});

d3.csv("data/grlcpublicaccessinternetsessions1516.csv", InternetType, function(error, InternetData) {
  if (error) throw error;

  var g = InternetLayer.selectAll(".arc")
      .data(InternetPie(InternetData))
      .enter().append("g")
      .attr("class", "InternetArc");

  var InternetTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([tipXOffSet, tipYOffSet])
      .html(function(d) { return d.data.Library +  " - " + d.data.InternetSessions + " sessions" ;})

      InternetLayer.call(InternetTip);

  g.append("path")
      .attr("d", InternetArc)
      .style("fill", function(d) { return color(d.data.Library); })
      .on('mouseover', InternetTip.show)
      .on('mouseout', InternetTip.hide);
});

/*
  Add the titles to each annular
*/

var CollectionTitleText   = 'Items';
var LoansTitleText        = 'Loans';
var MembersTitleText      = 'Members';
var EventsTitleText       = 'Event Attendance';
var VisitsTitleText       = 'Branch Visits';
var WirelessTitleText     = 'Wireless Sessions';
var InternetTitleText     = 'Internet Sessions';

TitleLayer.append("path")
      .attr("d", CollectionTitleArc)
      .attr("id", "CollectionTitle")
      .attr("class", "TitlePath");

TitleLayer.append("text")
      .attr("id", "CollectionTitleText")
      .append("textPath")
      .attr("xlink:href", "#CollectionTitle") //place the ID of the path here
      .attr("class", "Title")
    //  .attr("startOffset", "25%")
      .text(CollectionTitleText);

TitleLayer.append("path")
      .attr("d", LoansTitleArc)
      .attr("id", "LoansTitle")
      .attr("class", "TitlePath");

TitleLayer.append("text")
      .attr("id", "LoansTitleText")
      .append("textPath")
      .attr("xlink:href", "#LoansTitle") //place the ID of the path here
      .attr("class", "Title")
  //    .attr("startOffset", "25%")
      .text(LoansTitleText);

TitleLayer.append("path")
      .attr("d", MembersTitleArc)
      .attr("id", "MembersTitle")
      .attr("class", "TitlePath");

TitleLayer.append("text")
      .attr("id", "MembersTitleText")
      .append("textPath")
      .attr("xlink:href", "#MembersTitle") //place the ID of the path here
      .attr("class", "Title")
  //    .attr("startOffset", "25%")
      .text(MembersTitleText);

TitleLayer.append("path")
      .attr("d", EventsTitleArc)
      .attr("id", "EventsTitle")
      .attr("class", "TitlePath");

TitleLayer.append("text")
      .attr("id", "EventsTitleText")
      .append("textPath")
      .attr("xlink:href", "#EventsTitle") //place the ID of the path here
      .attr("class", "Title")
  //    .attr("startOffset", "25%")
      .text(EventsTitleText);

TitleLayer.append("path")
      .attr("d", VisitsTitleArc)
      .attr("id", "VisitsTitle")
      .attr("class", "TitlePath");

TitleLayer.append("text")
      .attr("id", "VisitsTitleText")
      .append("textPath")
      .attr("xlink:href", "#VisitsTitle") //place the ID of the path here
      .attr("class", "Title")
    //  .attr("startOffset", "25%")
      .text(VisitsTitleText);

TitleLayer.append("path")
      .attr("d", WirelessTitleArc)
      .attr("id", "WirelessTitle")
      .attr("class", "TitlePath");

TitleLayer.append("text")
      .attr("id", "WirelessTitleText")
      .append("textPath")
      .attr("xlink:href", "#WirelessTitle") //place the ID of the path here
      .attr("class", "Title")
  //    .attr("startOffset", "25%")
      .text(WirelessTitleText);

TitleLayer.append("path")
      .attr("d", InternetTitleArc)
      .attr("id", "InternetTitle")
      .attr("class", "TitlePath");

TitleLayer.append("text")
      .attr("id", "InternetTitleText")
      .append("textPath")
      .attr("xlink:href", "#InternetTitle") //place the ID of the path here
      .attr("class", "Title")
  //    .attr("startOffset", "25%")
      .text(InternetTitleText);

/*
  Add a Legend
  http://www.competa.com/blog/2015/07/d3-js-part-7-of-9-adding-a-legend-to-explain-the-data/
*/

var legend = LegendLayer.selectAll("g")
    .data(color.domain())
    .enter()
    .append('g')
    .attr('x', legendPlacementX)
    .attr('y', legendPlacementY)
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
        return 'translate(' + (legendPlacementX + legendWidth) + ',' + (legendPlacementY + (i * legendHeight)) + ')';
});

legend.append('rect')
    .attr('width', legendWidth)
    .attr('height', legendHeight)
    .attr('class', 'legendRect')
    .style('fill', color)
    .style('stroke', legendStrokeColor);

legend.append('text')
    .attr('x', legendWidth + legendXSpacing)
    .attr('y', legendHeight - legendYSpacing)
    .attr('class', 'legendText')
    .text(function(d) { return d; });

/*
  Glorious functions of deliciousness
*/

function CollectionType(d) {
  d.Items = +d.Items;
  return d;
}
function LoansType(d) {
  d.Items = +d.Items;
  return d;
}
function MembersType(d) {
  d.Members = +d.Members;
  return d;
}
function EventsType(d) {
  d.Attendance = +d.Attendance;
  return d;
}
function VisitsType(d) {
  d.Visits = +d.Visits;
  return d;
}
function WirelessType(d) {
  d.Sessions = +d.Sessions;
  return d;
}
function InternetType(d) {
  d.InternetSessions = +d.InternetSessions;
  return d;
}
