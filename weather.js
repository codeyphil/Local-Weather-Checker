$(document).ready(function() {
  
 navigator.geolocation.getCurrentPosition(onPositionUpdate);

adjustTempType();
});

function onPositionUpdate(position) {
   
var lat = position.coords.latitude;
var lon = position.coords.longitude;
  
 var appId = "17cff86725839226";
  
 $.ajax({
    url: 
 'http://api.wunderground.com/api/'+appId+'/conditions/q/'+lat+','+lon+'.json',
    dataType: 'jsonp',
    success: function(results){
  
      var lastUpdate = results['current_observation']['observation_time'];
      var conditions = results['current_observation']['weather'];
      var imageIcon = results['current_observation']['icon'];
      var conditionImage = "http://icons.wxug.com/i/c/c/"+imageIcon+".gif";
      var tempF = results['current_observation']['temp_f'];
      var tempC = results['current_observation']['temp_c'];
      var windChillF = results['current_observation']['windchill_f'];
      var windChillC = results['current_observation']['windchill_c'];
      var city = results['current_observation']['display_location']['city'];
      var state = results['current_observation']['display_location']['state_name'];
     var windString = results['current_observation']['wind_string'];
     var visibility = results['current_observation']['visibility_mi'];
      var humidityInfo = results['current_observation']['relative_humidity'];
      var feelsLikeF = results['current_observation']['feelslike_f'];
      var feelsLikeC = results['current_observation']['feelslike_c'];
      var precip = results['current_observation']['precip_today_in'];
      var UV = results['current_observation']['UV'];
      var heatIndexString = results['current_observation']['heat_index_string'];
      var imageHolder = document.getElementById('weatherThumb');
      imageHolder.src = conditionImage;
      
//HTML updates      
      $('#lastUpdate').html(lastUpdate);
      $('#cityInfo').html("<i>" + city + ", " + state + "</i>");
      $('#conditionInfo').html("<b>Conditions: </b>" + "<i>" + conditions + "</i>");
      $('#tempInfo').html(tempF + "&deg;F");
      $('#cloudCover').html("<b>Visibility: </b>" + "<i>" + visibility + " " + "miles.</i>");
      $('#windInfo').html("<b>Winds: </b>" + "<i>" +windString + "</i>");
      $('#humidity').html("<b>Humidity: </b>" + "<i>" + humidityInfo + "</i>");
      $('#feelsLike').html("<b>Wind Chill:</b> " + "<i>" + feelsLikeF + "&deg;F" + " " + "(" + feelsLikeC + "&deg;C" + ")" + "</i>");
    $('#precipitation').html("<b>Precipitation: </b>" + "<i>" + precip + " " + "inches</i>");
      $('#uvIndex').html("<b>UV Index: </b>" + "<i>" + UV + "</i>");
      
 //Click Events
      $('#openMore').on('click', function() {
 document.getElementById('additionalInfo').style.visibility='visible';
        $('#openMore').hide();
      });
      
      $('#tempInfo').on('click', function() {
        if($('#tempInfo').data('measure') === "F") {
          $('#tempInfo').html("<i>" + tempC + "&deg;C</i>");
          $('#tempInfo').data('measure', "C");
        }
        else if($('#tempInfo').data('measure') === "C") {
          $('#tempInfo').html("<i>" + tempF + "&deg;F</i>");
          $('#tempInfo').data('measure', "F");
         }
      });
 //     
      if(heatIndexString !== "NA") {
      $('#heatIndex').html("<b>Heat Index: </b>" + "<i>" + heatIndexString + "</i>");
      }
      else if(heatIndexString === "NA") {
        $('#heatIndex').html("<b>Heat Index: </b>" +  "<i>" + "Not available!" + "</i>");
      }
    }
  });
} 

function adjustTempType() {
  var hoverMessage = $('#hoverMessage');
  
$('#tempHolder').on('mouseover', function() {
 hoverMessage.html("Click the temperature to toggle between F&deg; and C&deg;.");
});

$('#tempHolder').on('mouseleave', function() {
  hoverMessage.empty();
});
}
