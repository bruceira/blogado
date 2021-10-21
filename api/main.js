const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Article = require("./src/model/articleModel")
const controllers = require("./src/controllers/controller")
const User = require("./src/model/userModel")
const { protect, protectTokenByAdmin } = require("./src/middleware/auth")

dotenv.config()


function server() {
  const app = express()
  const PORT = process.env.PORT || 8001

  // mongodb connection
  mongoose.connect(process.env.MONGODB_URI, {}).then(console.log('DB connected')).catch(error => console.log("error: ", error))

  // middlewares
  app.use(express.json())

  // get all articles
  app.get("/api/allArticle", async (req, res) => {
    const article = await Article.find()
    res.json({
      status: "success", data: {
        results: article.length, article
      }
    })
  })


  //get one article
  app.get("/api/article/:id", protect, protectTokenByAdmin("admin"), async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.json(article)
  })


  // add new article
  app.post("/api/newArticle", protect, async (req, res) => {

    const article = await new Article(req.body)

    if (!article.title || !article.description) {
      res.send("plz provide title and description")
    }
    article.save()

    res.status(201).json({ status: "success", data: { article } })


  })

  // delete article

  app.delete("/api/deleteArticle/:id", protect, async (req, res) => {
    const article = await Article.findByIdAndDelete(req.params.id)
    res.json()
  })

  //update article

  app.put("/api/updateArticle/:id", protect, async (req, res) => {

    const article = await Article.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(article)

  })

  //user


  app.get("/allUsers", async (req, res) => {
    const user = await User.find()
    res.json(user)
  })


  app.post("/signup", controllers.signup)
  app.post("/login", controllers.login)

  app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
}

server()