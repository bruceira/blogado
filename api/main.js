import Express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()


function server() {
  const app = Express()
  const PORT = process.env.PORT || 8001

  // mongodb connection
  mongoose.connect(process.env.MONGODB_URI, {}).then(console.log('DB connected')).catch(error => console.log("error: ", error))
  app.use(Express.json())

  // routes
  app.get("/", (res, req) => {
    res.send("hey")
  })


  app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
}

server()