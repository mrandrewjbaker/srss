
var date = new Date(),

    srss = {
    
        user: {
            
            UTCtime: {
                full: "",
                
                hours: "",
                
                hoursInMinutes: "",
                
                minutes: "",
                
                totalMinutes: "",
                
                getUTCOffset: function(){
                    //srss.user.UTCtime.getUTCOffset();
                    if(srss.user.time.totalMinutes > srss.user.UTCtime.totalMinutes){
                        console.log("User's time is ahead of UTC");
                        
                        srss.user.time.sunrise.withUTCOffset = srss.user.time.sunrise.totalMinutes + srss.user.time.UTCoffset;
                        srss.user.time.sunset.withUTCOffset = srss.user.time.sunset.totalMinutes + srss.user.time.UTCoffset;
                        
                        if(srss.user.time.sunset.withUTCOffset < 0){
                            
                            console.log("time is midnight");
                            
                            srss.user.time.sunset.withUTCOffset = 1440 + srss.user.time.sunset.withUTCOffset;
                            
                        }
                        
                        
                        
                    }else if(srss.user.time.totalMinutes < srss.user.UTCtime.totalMinutes){
                        console.log("User's time is behind UTC");
                        
                        srss.user.time.sunrise.withUTCOffset = srss.user.time.sunrise.totalMinutes - srss.user.time.UTCoffset;
                        srss.user.time.sunset.withUTCOffset = srss.user.time.sunset.totalMinutes - srss.user.time.UTCoffset;
                    
                    
                        srss.user.time.sunset.withUTCOffset = 1440 + srss.user.time.sunset.withUTCOffset;
                        
                    }
                    
                    
                }
                
                
                
            },
        
            time: {
                
                full: "",
                
                hours: "",
                
                hoursInMinutes: "",
                
                minutes: "",
                
                totalMinutes: "",
                
                lastTotalMinutes: "",
                
                UTCoffset: "",
                
                timeWithOffset: "",
                
                meridiem: "",
                
                midnightAdjust: "",
                
                isNight: false,
                
                isDay: false,
                
                sunrise: {
                    
                    full: "",
                    
                    array: " ",
                    
                    hours: "",
                    
                    hoursInMinutes: "",
                    
                    minutes: "",
                    
                    totalMinutes: "",
                    
                    meridiem: "",
                    
                    withUTCOffset: ""
                    
                    
                    
                },
                
                sunset: {
                    
                    full: "",
                    
                    array: " ",
                    
                    hours: "",
                    
                    hoursInMinutes: "",
                    
                    minutes: "",
                    
                    totalMinutes: "",
                    
                    meridiem: "",
                    
                    withUTCOffset: ""
                    
                },
                
                //srss.user.time.get();
                get: function(){
                    
                    date = new Date(); //update time object
                    srss.user.UTCtime.hours = date.getUTCHours(); //assign hours
                    srss.user.UTCtime.hoursInMinutes = srss.user.UTCtime.hours * 60; //assign minnutes
                    srss.user.UTCtime.minutes = date.getUTCMinutes(); //assign hours
                    srss.user.UTCtime.totalMinutes = srss.user.UTCtime.hoursInMinutes + srss.user.UTCtime.minutes;
                    
                    srss.user.time.hours = date.getHours(),
                    srss.user.time.hoursInMinutes = srss.user.time.hours * 60,
                    srss.user.time.minutes = date.getMinutes(),
                    srss.user.time.totalMinutes = srss.user.time.hoursInMinutes + srss.user.time.minutes;
                    console.log("srss.user.time.totalMinutes - time.get(): " + srss.user.time.totalMinutes);
                    srss.user.time.UTCoffset = date.getTimezoneOffset();
                    
                    srss.user.time.full = srss.user.time.hours + ":" + srss.user.time.minutes;
                    
                
                    
                },
                
                checkTime: function(){
                    
                    
                    
                    srss.user.time.lastTotalMinutes = srss.user.time.totalMinutes;
                    
                    console.log("srss.user.time.lastTotalMinutes - checkTime(): " + srss.user.time.lastTotalMinutes);
                    console.log("srss.user.time.sunrise - checkTime(): " + srss.user.time.sunrise.withUTCOffset);
                    console.log("srss.user.time.sunset - checkTime(): " + srss.user.time.sunset.withUTCOffset);
                    
                    srss.user.time.get();
                    
                    console.log("srss.user.time.totalMinutes - checkTime(): " + srss.user.time.totalMinutes);
                    
                    
                    if(srss.user.time.totalMinutes >= 1440){
                        srss.user.time.totalMinutes = (srss.user.time.totalMinutes - 1440);
                        console.log("time.user.midnightAdjust: " + srss.user.time.totalMinutes);
                        
                        
                    }
                    
                    
                    if(srss.user.time.totalMinutes >= srss.user.time.sunrise.withUTCOffset){
                        console.log("The users time is greater than the sunrise");
                        
                        if(srss.user.time.totalMinutes < srss.user.time.sunset.withUTCOffset){
                            console.log("The users time is less than the sunset");
                            $("#night-shade").addClass("shade-inactive");
                            
                            srss.user.time.isDay = true;
                            srss.user.time.isNight = false;
                            
                        }else if(srss.user.time.totalMinutes >= srss.user.time.sunset.withUTCOffset){
                            console.log("The users time is greater than the sunset");
                            $("#night-shade").addClass("shade-active");
                            
                            
                            srss.user.time.isDay = false;
                            srss.user.time.isNight = true;
                            
                        }
                        
                        
                    }else if(srss.user.time.totalMinutes < srss.user.time.sunset.withUTCOffset){
                        console.log("The users time is less than the sunset");
                        
                        if(srss.user.time.totalMinutes < srss.user.time.sunrise.withUTCOffset){
                            console.log("The users time is more than the sunrise");
                            $("#night-shade").addClass("shade-active");
                        }else if(srss.user.time.totalMinutes > srss.user.time.sunrise.withUTCOffset){
                            console.log("The users time is more than the sunrise");
                            $("#night-shade").addClass("shade-inactive");
                        
                        }
                        
                        srss.user.time.isDay = true;
                        srss.user.time.isNight = false;
                        
                    }
                 
                    
                }
                
            },
        
            location: {
                
                lat: "",
                lng:"",
                
                get: function(){
                    if (navigator.geolocation){
                        navigator.geolocation.getCurrentPosition(srss.get);
                    }else {
                        console.log("Geolocation is not supported by this browser");
                    }
                }
            }
        },
    
        url: "",
        
        
        
        get: function(location){
            
            srss.user.location.lat = location.coords.latitude;
            srss.user.location.lng = location.coords.longitude;
            
            srss.url = "https://api.sunrise-sunset.org/json?lat=" + srss.user.location.lat + "&lng=" + srss.user.location.lng;
            
            
            
            $.getJSON(srss.url, function(response){
                
                console.log("LAT:" + srss.user.location.lat, "LNG:" + srss.user.location.lng);
                
            }).then(function(response){
                
                
                //Sunrise Variables
                
                srss.user.time.sunrise.full = response.results.sunrise,
                
                srss.user.time.sunrise.array = srss.user.time.sunrise.full.split(":");
                srss.user.time.sunrise.array[0] = parseInt(srss.user.time.sunrise.array[0]);
                srss.user.time.sunrise.array[1] = parseInt(srss.user.time.sunrise.array[1]);
                srss.user.time.sunrise.array[2] = srss.user.time.sunrise.array[2].split(" ");
                srss.user.time.sunrise.array[2][0] = parseInt(srss.user.time.sunrise.array[2][0]);
                
                
                
                srss.user.time.sunrise.hours = srss.user.time.sunrise.array[0],
                srss.user.time.sunrise.hoursInMinutes = srss.user.time.sunrise.hours * 60,
                
                
                
                
                srss.user.time.sunrise.minutes = srss.user.time.sunrise.array[1];
                
                srss.user.time.sunrise.totalMinutes = srss.user.time.sunrise.hoursInMinutes + srss.user.time.sunrise.minutes,
                
                
                srss.user.time.sunrise.meridiem = srss.user.time.sunrise.array[2][1];
                
                
                //Sunset Variables
                
                srss.user.time.sunset.full = response.results.sunset,
                
                srss.user.time.sunset.array = srss.user.time.sunset.full.split(":");
                srss.user.time.sunset.array[0] = parseInt(srss.user.time.sunset.array[0]);
                srss.user.time.sunset.array[1] = parseInt(srss.user.time.sunset.array[1]);
                srss.user.time.sunset.array[2] = srss.user.time.sunset.array[2].split(" ");
                srss.user.time.sunset.array[2][0] = parseInt(srss.user.time.sunset.array[2][0]);
                
                
                srss.user.time.sunset.hours = srss.user.time.sunset.array[0],
                srss.user.time.sunset.hoursInMinutes = srss.user.time.sunset.hours * 60;
                
                
                
                srss.user.time.sunset.minutes = srss.user.time.sunset.array[1];
                
                
                srss.user.time.sunset.totalMinutes = srss.user.time.sunset.hoursInMinutes + srss.user.time.sunset.minutes;
                
                
                
                
                srss.user.UTCtime.getUTCOffset();
                
                
                
                console.log(srss.user.time.sunrise);
                 
                console.log(srss.user.time.sunset);
            });
        }
    };
    
    
function initCheckTime(){
    
    srss.user.time.checkTime();

    setInterval(function(){
        srss.user.time.checkTime();
    }, 60000);

}


srss.user.location.get();


srss.user.time.get();

setTimeout(function(){

    initCheckTime();

}, 2500);