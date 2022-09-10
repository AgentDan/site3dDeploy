const express = require("express")
const router = express.Router()
const multer = require("multer")
const Dmodel = require("../modules/dbase")

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
    Dmodel.find()
        .then(article => res.json(article))
        .catch(err => res.status(400).res.json(`Error: ${err}`))
})

// REQUEST ADD NEW ARTICLE
router.post("/add", upload.single("articleImage"), (req, res) => {
    const newArticle = new Dmodel({
        title: req.body.title,
        article: req.body.article,
        authorname: req.body.authorname,
        articleImage: req.file.originalname
    })

    newArticle
        .save()
        .then(article => res.json("The article ADD!!!"))
        .catch(err => res.status(400).json(`Error my: ${err}`))

})

//REQUEST FIND ARTICLE BY ID AND UPDATE
router.put("/update/:id", upload.single("articleImage"), (req, res) => {
    Dmodel.findById(req.params.id)
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
    Dmodel.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// REQUEST FIND ARTICLE BY ID AND DELETE
router.delete("/:id", (req, res) => {
    Dmodel.findByIdAndDelete(req.params.id)
        .then(() => res.json("The article is DELETED!"))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router