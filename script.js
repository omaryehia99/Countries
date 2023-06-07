var eventsMediator = {
    events: {},
    on: function (eventName, callbackfn) {
      this.events[eventName] = this.events[eventName]
        ? this.events[eventName]
        : [];
      this.events[eventName].push(callbackfn);
    },
    emit: function (eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function (callBackfn) {
          callBackfn(data);
        });
      }
    },
  };


var countries_model = {

    
    array: [
   {

        name: 'egypt',
        url : 'https://newsapi.org/v2/top-headlines?country=eg&apiKey=9b00408414134cc9b9837386d669c676',

    } ,

   {
        name: 'argentina',
        url : 'https://newsapi.org/v2/top-headlines?country=ar&apiKey=6800e16ec0a047f0b21a53891efea814',

    },
    {

        name  : 'morocco',
        url : 'https://newsapi.org/v2/top-headlines?country=ma&apiKey=6800e16ec0a047f0b21a53891efea814',
    },
    ]
}


function getNews(country)

{
   

    document.getElementById("news").innerHTML = ""
    fetch(country)

    .then(data => data.json())

    .then(resp =>

    {

        for(var i=0;i<resp.articles.length;i++)

        {
            
            document.getElementById("news").innerHTML += "<div style='padding-top:20px; 'class= 'card'>'<h1>"+resp.articles[i].title+"</h1>"+resp.articles[i].source.name+" <a href='"+resp.articles[i].url+"'target='_blank'>"+resp.articles[i].url+"</a></div>";

        }

    }

)}


document.addEventListener("DOMContentLoaded", function(){

get_country.init();

var countries = document.getElementsByClassName("carousel-item");

for(var i =0 ; i<countries.length;i++){

    var country = countries[i];
    country.addEventListener('click',function(e){

        var country_id = e.target.closest("img").id
      
        eventsMediator.emit("country_clicked",country_id)

    })
}


});



var get_country = {

    init : function(){

    eventsMediator.on("country_clicked", function(country_id){
        
        for (var i = 0; i<countries_model.array.length;i++){
            if(country_id == countries_model.array[i].name){

                getNews(countries_model.array[i].url)
            }
        }
       

    })


    },

}