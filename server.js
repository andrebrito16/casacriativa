// usei o express para criar e configura meu servidor
const express = require('express')
const server = express()


const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipi.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipi.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipi.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversão em família",
        description: "Lorem ipsum dolor sit amet consectetur adipi.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2741/2741118.svg",
        title: "Notícias",
        category: "Informação",
        description: "Lorem ipsum dolor sit amet consectetur adipi.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2741/2741113.svg",
        title: "Vídeo-game",
        category: "Diversão em família",
        description: "Lorem ipsum dolor sit amet consectetur adipi.",
        url: "https://rocketseat.com.br"
    }
]

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//configuração do nunjucks
const nunjucks = require('nunjucks')

nunjucks.configure("views", {
    express: server,
    noCache: true
})

//criei as rotas
server.get("/", function(req, res) {

    //regra de negócio

    const reversedIdeas = [...ideas].reverse() 
    let lastideas = []
    for (idea of reversedIdeas){
        if(lastideas.length < 3){
            lastideas.push(idea)
        }
    }


    return res.render("index.html", {ideas: lastideas})
})


server.get("/ideias", function(req, res) {
    const reversed  = [...ideas].reverse()
    return res.render("ideias.html", {ideas: reversed})
})


//liguei meu servidor na porta 3000
server.listen(3000)