const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3001;



const Film = mongoose.model("Film", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

// app.get("/", (req, res) => {
//   res.send("Hello Wolrd");
// });


app.get("/", async (req, res) => {
    const films = await Film.find();
    return res.send(films);
});

app.delete("/:id", async (req, res) => {
    const filmDelet = await Film.findByIdAndDelete(req.params.id);
    return res.send(filmDelet);
});

app.put("/:id", async (req, res) => {
    const filmPut = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    });
    return res.send(filmPut);
});

app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url
  });

  await film.save();
  return res.send(film);
});

// Rota POST para salvar um novo filme
// app.post("/", async (req, res) => {
//   try {
//     const film = new Film({
//       title: req.body.title,
//       description: req.body.description,
//       image_url: req.body.image_url,
//       trailer_url: req.body.trailer_url,
//     });

//     const savedFilm = await film.save();
//     res.json(savedFilm);
//   } catch (error) {
//     console.error("=====Error ao SALVAR=====:", error);
//     res.status(500).json({ error: "Failed to save film" });
//   }
// });

app.listen(port, () => {
    mongoose.connect(
        "mongodb://onofreandre079:nsrgbT3cBcpXFDuj@ac-1nj8joy-shard-00-00.taqufyk.mongodb.net:27017,ac-1nj8joy-shard-00-01.taqufyk.mongodb.net:27017,ac-1nj8joy-shard-00-02.taqufyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-fd4of1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=FirstApi"
        );
        
    console.log(`==============Api listening port ${port}===============`);
});
