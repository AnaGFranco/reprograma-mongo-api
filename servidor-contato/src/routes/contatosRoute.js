const express = require("express")
const router = express.Router()
//const bodyParser = require("body-parser")
const controller = require("../controller/contatosController")

router.get("/", controller.getAll)
router.get("/nome/:nome", controller.getNome)
router.get("/id/:id", controller.getId)
router.delete("/deletar/:id", controller.deleteById)
router.patch("/alterar/:id", controller.alterarById)
//router.verbo(rota, bodyParser.json(), controller._______)
router.post("/criar", controller.add)

module.exports = router
