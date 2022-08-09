const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const port = 3000;

app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));




// --------------Home Route---------------
app.get("/", function(req, res){

  const ffClanId = "10908"
  const url = "https://ev.io/group/" + ffClanId + "?_format=json"

      // --Ev.io Server Request--
  // const url = "https://ev.io/user/411395?_format=json"
  https.get(url, function(response){
    var dataV1 = []
    response.on("data", function(data){
      dataV1.push(data)
    })
    response.on("end", function(){
      console.log("response ended");
      // console.log(dataV1);
      var dataV2 = JSON.parse(Buffer.concat(dataV1));
      // const userName = dataV2.name[0].value
      // console.log(dataV2);
      // console.log(dataV2.field_deployed);

      var userObjects = []
      for (var i = 0; i < dataV2.field_deployed.length; i++){
        currentUserId = dataV2.field_deployed[i].target_id;
        // userObjects.push(returnUserObject(currentUserId));
        returnUserObject(userObjects, currentUserId);
      }
      // console.log(Object.keys(userObjects[0]));


      res.render("index", {username1: "userName"});
    })
  })




})








app.listen(port, function(){
  console.log("Server running on port " + port);
})








function returnUserObject(objectList, userId){


  const url = "https://ev.io/user/" + userId + "?_format=json";
  https.get(url, function(response){
    var dataV1 = [];
    response.on("data", function(data){
      dataV1.push(data);
    })
    response.on("end", function(){
      var dataV2 = JSON.parse(Buffer.concat(dataV1));
      // console.log(dataV2.name[0].value);
      var userObject = {
        username: dataV2.name[0].value,
        brWins: dataV2.field_battle_royale_wins[0].value,
        brWinsWeekly: dataV2.field_battle_royale_wins_weekly[0].value,
        // bestSurvTime: dataV2.field_best_survival_time[0].value,
        totalKills: dataV2.field_kills[0].value,
        kdRatio: dataV2.field_k_d[0].value,
      }
      console.log(userObject.username);
      userObjects.push(userObject);
      return userObject;
    })
  })
}
