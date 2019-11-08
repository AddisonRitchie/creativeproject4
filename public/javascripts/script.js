// creativeproject4

var app = new Vue({
  el: '#app',
  data: {
    cities: [],
    prefix: '',
    
    wordPrefix: '',
    defenition: '',
    defenitionArray: [],
    wordinformation: '',
    
    completeImagesArray: [],
  },
  methods: {
    
    
    //CITY FIND
    fetchREST() {
      console.log("In Fetch " + this.prefix);
      
      // var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=" + this.prefix;
      var url = "getcity?q=" + this.prefix;


      console.log("URL " + url);
      fetch(url)
        .then((data) => {
          return (data.json());
        })
        .then((imagesArray) => {
          console.log("ImagesFromServer");
          console.log(imagesArray);
          
          this.completeImagesArray = imagesArray;
          
          
          // this.cities = [];
          // for (let i = 0; i < imagesArray.length; i++) {
          //   console.log(imagesArray[i].city);
          //   this.cities.push({ name: imagesArray[i].title });
          // };
          // console.log("Got Citylist");
        });
    },
    
    //OWL DICTIONARY
        proxyREST() {
      console.log("In OwlFetch " + this.wordPrefix);
      
      // var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=" + this.prefix;
      
      // var url = "https://owlbot.info/api/v1/dictionary/" + this.wordPrefix + "?format=json";
      
      var url = "getdictionary?q=" + this.wordPrefix;
            // var url = "dictionary/test";

      
      // var url = "dictionary/" + this.wordPrefix + "?format=json";


      console.log("URL " + url);
      fetch(url)
        .then((data) => {
          return (data.json());
        })
        .then((owlWords) => {
          console.log("WordDefinition");
          // console.log(citylist);
          this.defenition = "";
          console.log("what is owlWords?: " + owlWords);
          console.log(owlWords);

          this.defenitionArray = [];
          for(let i = 0; i < owlWords.length; i++) {
            var myDef = owlWords[i].defenition;
            console.log(myDef);
            
            
            // this.definitionArray.push(beginning)
            this.defenitionArray.push(myDef);
          }
          this.wordinformation = JSON.parse(owlWords);
          
          
          
          
          // for (let i = 0; i < citylist.length; i++) {
          //   console.log(citylist[i].city);
          //   this.cities.push({ name: citylist[i].city });
          // };
          console.log("Got WordDefinition");
        });
    },
  },
});
