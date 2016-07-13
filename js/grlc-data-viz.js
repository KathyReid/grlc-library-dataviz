/* This is a really quick nd dirty visualisation of GRLC open data */

    var iconWidthModifier = 0.0012;

    /* Specify the mapbox token */
    L.mapbox.accessToken = 'pk.eyJ1Ijoia2F0aHlyZWlkIiwiYSI6Ik9Dbl9JeDAifQ.ujJagjjsojv4iIEzpRQCfA';

    /* declare the map itself */
    var map = L.mapbox.map('map').setView([-38.147059, 144.357184], 11);

    /* define the tile layer */
    var tileLayer = L.mapbox.tileLayer('mapbox.streets');

    /* define the style layer */
    var styleLayer = L.mapbox.styleLayer('mapbox://styles/kathyreid/ciqei42lx000ccgm59z1u85c7').addTo(map);

    /* iterate through the json file and place markers for each of the libraries */
    $(document).ready(function() {

        var icons   = Array();
        var markers = Array();
        var popups  = Array();

        $.getJSON('data/grlc-library-locations.json', function( data ) {

          /* now we iterate on the json data and place the markers */
          //console.log(data);
          $.each(data, function(key, val){
          //  console.log(val['Items']);
          //  console.log(val['LGA']);
          //  console.log(val['Library']);
          //  console.log(val['Lat']);
          //  console.log(val['Long']);
          //  console.log(key);


          /* Create and position the markers */

          // determine how big the icon should be

          var iconWidth   = parseInt(val['Items'] * iconWidthModifier);
          //console.log('iconWidth is ' + iconWidth);

          var iconAnchor  = parseInt(iconWidth/2);
          //console.log('iconAnchor is ' + iconAnchor);

          icons[key]    = new L.icon({
                                      iconUrl:'images/circle-icon.svg',
                                      iconSize: [iconWidth, iconWidth],
                                      shadowSize: [iconWidth, iconWidth],
                                      iconAnchor: [iconAnchor, iconAnchor]
                                    });

        //  console.log(markers[key]);

          markers[key] = L.marker([val['Lat'], val['Long']], {icon: icons[key]});
          markers[key].addTo(map);

          // create a popup and populate with the other information
          popups[key] = L.popup({className:'popup'}).
                                  setContent(val['Items'] + ' items'+ '<br>' + '<strong>' + val['Library'] + '<br>' + '</strong>' + val['LGA']);
          markers[key].bindPopup(popups[key]);
        });

        $.getJSON('data/grlc-library-locations-supplemental.json', function( data2 ) {
          $.each(data2, function(key2, val2){
            // console.log(val2['Items']);
            // console.log(val2['LGA']);
          //  console.log(val2['Library']);
          //  console.log(val2['Lat']);
          //  console.log(val2['Long']);
          //  console.log(key2);

            // determine how big the list item image should be
            var imageWidth   = parseInt(val2['Items'] * iconWidthModifier);
            $( "#legend" ).append('<li>' + '<img src="images/circle-icon.svg" width="' + imageWidth + 'px"> ' + val2['Library'] + ' - <br><strong>' + val2['Items'] + '</strong> items' );
          });


        });
      });
    });
