const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){

    //criar a tabela


    db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT, 
        title TEXT,
        category TEXT,
        description TEXT,
        link TEXT
    );
    `)

/* inserir um dado na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    )VALUEWS (?,?,?,?,?);
    `

    db.run(query, [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Inserir um dado",
        "Estudo",
        "Descrição",
        "https://google.com.br"

    ])

    */
   




//DELETAR
/*
    db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
        if(err) return console.log(err)

        console.log("DELETEI", this)
    })

*/
})


module.exports = db