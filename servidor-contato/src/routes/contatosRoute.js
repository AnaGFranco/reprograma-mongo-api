const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const controller = require("../controller/contatosController")

router.get("/", controller.getAll)
router.get("/nome/:nome", controller.getNome)
router.get("/id/:id", controller.getId)
router.delete("/deletar/:id", controller.deleteById)
router.patch("/alterar/:id", bodyParser.json(), controller.alterarById)
router.post("/criar", bodyParser.json(), controller.add)

module.exports = router
