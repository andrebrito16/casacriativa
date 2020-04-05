// usei o express para criar e configura meu servidor
const express = require('express')
const server = express()

const db = require("./db.js")


//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//habilitar uso do req.body teste

server.use(express.urlencoded({ extended: true}))

//configuração do nunjucks
const nunjucks = require('nunjucks')

nunjucks.configure("views", {
    express: server,
    noCache: true
})

//criei as rotas
server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

      const reversedIdeas = [...rows].reverse() 
      let lastideas = []
      for (idea of reversedIdeas){
          if(lastideas.length < 3){
              lastideas.push(idea)
          }
      }
  
  
      return res.render("index.html", {ideas: lastideas})

    
    })

    
})


server.get("/ideias", function(req, res) {

    
    
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

    const reversed  = [...rows].reverse()
    return res.render("ideias.html", {ideas: reversed})

    })

    
})

server.post("/", function(req, res){
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description, 
        link
    ) VALUES(?,?,?,?,?); 
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/ideias")

        console.log(this)
    })
})


//liguei meu servidor na porta 3000
server.listen(3000)