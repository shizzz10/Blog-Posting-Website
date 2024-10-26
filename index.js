import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const port = 3000;

const app = express();
const posts = [];
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/create", (req, res) => {
  res.render("creation.ejs");
});

app.post("/posts", (req, res) => {
  const newPost = {
    index: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };

  posts.push(newPost);
  res.redirect("/");
});

app.get("/posts/:index", (req, res) => {
  const post = posts.find((blog) => blog.index === parseInt(req.params.index));

  if(!post){
    res.status(404).render("pageNotFound.ejs", {message : "Page Not Found"})
  }
  res.render("post.ejs", { post });
});

app.listen(port, () => {
  console.log(`app is loading on the server ${port}`);
});


posts.push(
  {
    index: 1,
    title: "Welcome to My Blog Website",
    content: "This blog website was created to practice and enhance my backend development skills using EJS (Embedded JavaScript), Express, Node.js, and CSS. The goal of building this site was to get hands-on experience with web development tools that are essential for creating dynamic, interactive websites."
  },
  {
    index: 2,
    title: "Exploring Chinese Legends: Myths that Shaped a Civilization",
    content: "China's rich tapestry of mythology is filled with captivating stories that have inspired its people for millennia. One of the most famous legends is that of Pangu, the primordial giant who, according to myth, created the world. Enclosed in a cosmic egg, Pangu split it open, separating the heavens and the earth. After he died, his body transformed into elements of the natural world: mountains, rivers, and forests.Another cherished tale is the story of Hou Yi and Chang'e, the archer and his wife who became immortals. When ten suns appeared in the sky, scorching the earth, Hou Yi shot down nine of them to save humanity. As a reward, he was given an elixir of immortality, but Chang'e accidentally consumed it and ascended to the moon, where she lives as a goddess.These legends, like many others in Chinese folklore, reflect themes of creation, sacrifice, and the search for immortality. They continue to be celebrated today in festivals, art, and storytelling, connecting modern China to its ancient roots."
  }
)
console.log("Initial posts added")