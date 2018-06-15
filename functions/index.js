'use strict';

const functions = require('firebase-functions');
//const functions = require('module-js');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  //var googleMaps = {
    //googleMaps: "https://www.google.com/maps/dir/?api=1",
    //origin: "&origin=",
    //destination: "&destination=1200 Federal Blvd., Denver, CO 80204",
    //URL: function (useraddress) {
 	  //  return encodeURI(this.googleMaps + this.origin + useraddress + this.destination);
    //}
  //};
 //var req_temp=JSON.stringify(request.body);
 //var address_req=JSON.parse(req_temp);
 //console.log('Address is ' + address_req.queryResult.parameters['street-address']);
 //console.log('City is ' + address_req.queryResult.parameters['geo-city-us']);
 //console.log('State is ' + address_req.queryResult.parameters['geo-state-us']);
 //var address=address_req.queryResult.parameters['street-address'];
 //var city=address_req.queryResult.parameters['geo-city-us'];
// var state=address_req.queryResult.parameters['geo-state-us'];
 
  //var userCurrentLocation = address+' '+city+' '+state;

/*var date_temp=JSON.stringify(request.body);
var date_req=JSON.parse(date_temp);
 console.log('Date is ' + date_req.queryResult.parameters.date);
 
 var finaldate=date_req.queryResult.parameters.date;
 var finaldate_temp=finaldate.substr(0,10);
 var dt = new Date(finaldate_temp);
 dt.setDate(dt.getDate() + 90);
 const today = new Date();
 var output_date='';
 if (dt < today) {
    output_date='Unfortunately you are not eligible to change your application now. You were eligible till '+ dt;
} else {
    output_date='You are eligible for a change in application till '+ dt;
}*/
 //var date_f=new Date(finaldate_temp);
 
 //var finaldate_t=new Date();
 //finaldate_t=Date.parse(finaldate);
 //finaldate_t.setDate(finaldate_t.getDate() + 90);
//console.log('FinalDate is ' + dt);
   // Uncomment and edit to make your own intent handler
  // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // below to get this funciton to be run when a Dialogflow intent is matched
  /*function returnNearestLocation(agent) {
    agent.add(`Please select the button below to display directions to the nearest office location near your address.`);
    agent.add('Once you are finished viewing the directions, please let me know if you have any additional questions.')
    agent.add(new Card({
        title: `Nearest County Office Location`,
        imageUrl: 'https://www.google.com/maps/about/images/home/home-maps-icon.svg?mmfb=de7ec406c933d20ac2caf9114c2434a9',
        text: `This button will open Google Maps to display directions to the nearest county office location.`,
        buttonText: 'Open Google Maps',
        buttonUrl: googleMaps.URL(userCurrentLocation),
      })
    );
    agent.add(new Suggestion(`Ask Another Question`));
    agent.add(new Suggestion(`No Questions`));
    agent.setContext({ name: 'additional-requests', lifespan: 1});
  }*/
  function sendemail(agent) {
      //var email_add_temp=JSON.stringify(request.body);
      console.log('I am in step 1');
      var api_key='cb04baa5121072d3d7c90d613d0b03ee-b6183ad4-3eadd000';
      var domain='sandbox6bf4b74381234f988edd407136c7b3de.mailgun.org';
      console.log('I am in step 2');
      var mailgun=require('mailgun-js')({apiKey:api_key, domain: domain});
      console.log('I am in step 3');
      // console.log('Email is ' + email_add_temp.queryResult.parameters.address);
      
//var request = require('request');
//var file = request("https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png");
 
var data = {
  from: 'Health First Colorado <postmaster@sandbox6bf4b74381234f988edd407136c7b3de.mailgun.org>',
  to: 'chitresh.mathur1@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!',
  //attachment: file
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
      
      
      
      
      
      
//var date_req=JSON.parse(date_temp);
 //console.log('Date is ' + date_req.queryResult.parameters.date);
 
// var finaldate=date_req.queryResult.parameters.date;
 //var finaldate_temp=finaldate.substr(0,10);
 //var dt = new Date(finaldate_temp);
 //dt.setDate(dt.getDate() + 90);
 //const today = new Date();
 //var output_date='';
 //if (dt < today) {
   // output_date='Unfortunately you are not eligible to change your application now. You were eligible till '+ dt;
//} else {
  //  output_date='You are eligible for a change in application till '+ dt;
}
      
      
      
    //agent.add(`You are eligible to change the application till 90 days of your application date.`);
    //agent.add(new Card({
      //  title: `Your eligible Date`,
        //imageUrl: '',
        //text: output_date,
        //buttonText: 'Open Google Maps',
        //buttonUrl: googleMaps.URL(userCurrentLocation),
      //})
    //);
   // agent.add(new Suggestion(`Quick Reply`));
    // agent.add(new Suggestion(`Suggestion`));
    // agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
 // }
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  //intentMap.set('how-to-apply - in-person - display-closest-location', returnNearestLocation);
  intentMap.set('address', sendemail);
  // intentMap.set('your intent name here', yourFunctionHandler);
  agent.handleRequest(intentMap);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
