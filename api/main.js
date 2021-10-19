const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Article = require("./src/model/articleModel")
const controllers = require("./src/controllers/controller")
const User = require("./src/model/userModel")
const auth = require("./src/middleware/auth")

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
  app.get("/api/article/:id", auth, async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.json(article)
  })


  // add new article
  app.post("/api/newArticle", auth, async (req, res) => {
    try {
      const article = await new Article(req.body)

      if (!article.title || !article.description) {
        return res.send("no required")
      }


      article.save()
      res.json(article)
    } catch (error) {

    }
  })

  // delete article

  app.delete("/api/deleteArticle/:id", auth, async (req, res) => {
    const article = await Article.findByIdAndDelete(req.params.id)
    res.json()
  })

  //update article

  app.put("/api/updateArticle/:id", auth, async (req, res) => {

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