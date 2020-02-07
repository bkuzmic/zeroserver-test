const sqlite3 = require('sqlite3').verbose();

module.exports = (req, res) => {       
    let db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });

    let languages = ['C++', 'Python', 'Java', 'C#', 'Go'];
    let placeholders = languages.map((language) => '(?)').join(',');
    let sql = 'INSERT INTO langs(name) VALUES ' + placeholders;    
 
    var langs = [];
    db.serialize(function() {
        db.run('CREATE TABLE langs(name text)');
        db.run(sql, languages, function(err) {
            if (err) {
                return console.error(err.message);
            }        
        });    
        db.each("SELECT name FROM langs", function(err, row) {
            langs.push({name: row.name})
        }, function() {            
            res.send({langs: langs});
        })
    })  

    // close the database connection
    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
    });     
}