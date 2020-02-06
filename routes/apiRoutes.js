
const notes = require("../db/notes.json");
const fs = require("fs");

module.exports = function(app) {
  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });
  app.get("/api/notes/:id", (req, res) => {
      const note = notes.find(c => c.id === parseInt(req.params.id));
      if (!note) return res.status(404).send('This note was not found');
  });
  app.post('/api/notes', (req, res) => {
      if (!req.body.title) res.status(404).send(`A new note is required`);
      const note = {
          id: notes.length + 1,
          title: req.body.title,
          text: req.body.text
      };
      notes.push(note);
      fs.writeFile("./db/notes.json", JSON.stringify(notes), function (err) {
        if (err) throw err;
        console.log("Writing to json file");
      });
      res.send(note);
  });
  app.delete("/api/notes/:id", (req, res) => {
    var note = notes.find(c => c.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('This note was not found');
    const index = notes.indexOf(note);
    notes.splice(index,1);
    fs.writeFile("./db/notes.json", JSON.stringify(notes), function (err) {
        if (err) throw err;
        console.log("Deleting note from json file");
        res.end();
      });
    res.send(note);  
});
};