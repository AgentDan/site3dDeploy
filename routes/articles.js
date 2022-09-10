const express = require("express")
const router = express.Router()
const multer = require("multer")
const Articles = require("../modules/article")

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "client/public/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({storage: storage})

// REQUEST GET ALL ARTICLES
router.get("/", (req, res) => {
    Articles.find()
        .then(article => res.json(article))
        .catch(err => res.status(400).res.json(`Error: ${err}`))
})

// REQUEST ADD NEW ARTICLE
router.post("/add", upload.single("articleImage"), (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        article: req.body.article,
        authorname: req.body.authorname,
        articleImage: req.file.originalname
    })

    newArticle
        .save()
        .then(() => res.json("The new Article posted successfuly!"))
        .catch(err => res.status(400).json(`Error my: ${err}`))
})

//REQUEST FIND ARTICLE BY ID AND UPDATE
router.put("/update/:id", upload.single("articleImage"), (req, res) => {
    Articles.findById(req.params.id)
        .then((article) => {
            article.title = req.body.title;
            article.article = req.body.article;
            article.authorname = req.body.authorname;
            article.articleImage = req.file.originalname;

            article
                .save()
                .then(() => res.json("Article UPDATE!"))
                .catch((err) => res.status(400).json(`Error my: ${err}`))
        })
        .catch((err) => res.status(400).json(`Error: ${err}`))
})

// REQUEST FIND ARTICLE BY ID
router.get("/:id", (req, res) => {
    Articles.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// REQUEST FIND ARTICLE BY ID AND DELETE
router.delete("/:id", (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
        .then(() => res.json("The article is DELETED!"))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router