
module.exports = function (app, db) {
  var ObjectID = require('mongodb').ObjectID;

  Players = [
  {
    PlayerName: 'ShiZhao',
      Gender: 'Male',
      Age: '23',
      GameLiketoPlay:'Arknights',
      AnimeLiketoWatch:'Relife',
      Gaminglife:'Over 10 years',
    AnimeLife:'Over 15 years'

  },
  {
      PlayerName: 'Angelina',
      Gender: 'Female',
      Age: 'unknow',
      GameLiketoPlay:'unknow',
      AnimeLiketoWatch:'unknow',
      Gaminglife:'unknow',
      AnimeLife:'unknow'
    }


  ]


  app.get('/', function (req, res) {
    res.sendFile('mySPA.html', { root: __dirname });
  });
  

  app.get('/playerlist', function (req, res) {
    try {

        Players.sort(compare);
      res.send(Players);
    }
    catch (err) {
      console.log('get all failed');
      console.error(err);
    }
  });


  function compare(a, b) {
    if (a.PlayerName < b.PlayerName) {
      return -1;
    }
    if (a.PlayerName > b.PlayerName) {
      return 1;
    }
    return 0;
  }

  app.post('/addPlayer/', (req, res) => {

    var newPlayerName = req.body
      Players.push(newPlayerName);
    console.log(Players);
    res.sendStatus(200)

  });

  app.get('/findPlayer/:id', (req, res) => {    // was app.post)
    var whichPlayerName = req.params.id;

      for (var i = 0; i < Players.length; i++) {
        if (Players[i].PlayerName === whichPlayerName) {
          res.send(Players[i]);
        }
      }
  });

  app.delete('/deletePlayer/:id', (req, res) => {
    const id = req.params.id;
    for (var i = 0; i < Players.length; i++) {
      if (Players[i].PlayerName === id) {
          Players.splice(i, 1);
        res.send('success');
      }
    }
  });
};