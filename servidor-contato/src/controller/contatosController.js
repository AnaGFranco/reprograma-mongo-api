const contatosCollection = require("../model/contatoSchema")

const getAll = (request, response) => {
  // console.log(request.url)

  contatosCollection.find((error,contatos) => {
    if(error){
      return response.status(500).send(error)
    }else{
    return response.status(200).send(contatos)
    }
  })
  // response.status(200).send(model.agenda)
};


/*const getNome = (request, response) => {
  const nome = request.params.nome
  contatosCollection.find((error,contatos) => {   
    if(error){
      return response.status(500).send(error)
    }else{
    const pessoa = contatos.filter(pessoa => pessoa.nome === nome)
      return response.status(200).send(pessoa)
    }
  })
};     Este exemplo não é legal usar pois o banco traz todas as informações para depois ser filtrado*/


const getNome = (request, response) => {
// Nesta função o banco retorna apenas o necessario
  const nome = request.params.nome

  const regex = new RegExp(nome)
  const filtro = {nome: regex}

  contatosCollection.find(filtro, function (error,contatos)  {
    //contatosCollection.find( FILTRO , function (error,contatos) 
    if(error){
      return response.status(500).send(error)
    }else{      
      if (contatos.length > 0){
      return response.status(200).send(contatos)
    } else{
      return response.status(404).send('Contato nao encontrado')
    }
    }

  })
};

const getId = (request, response) => {
  // Nesta função o banco retorna apenas o necessario
    const idParam = request.params.id
  
    contatosCollection.findById(idParam, function (error,contato)  {
      //contatosCollection.find( FILTRO , function (error,contatos) 
      if(error){
        return response.status(404).send(error)
      }else{
        if (contato){
        return response.status(200).send(contato)
        } else{
          return response.status(404).send('Contato nao encontrado')
        }
      }
  
    })
  };

  const deleteById = (request, response) => {
    // Nesta função o banco retorna apenas o necessario
      const idParam = request.params.id
    
      contatosCollection.findOneAndDelete(idParam, (error,contato) => {
        //contatosCollection.find( FILTRO , function (error,contatos) 
        if(error){
          return response.status(404).send(error)
        }else{
          if (contato){
            return response.status(200).send(contato)
            } else{
              return response.status(404).send('Contato nao encontrado')
            }
          }
    })
  }   

const add = (request, response) => {
// novo objeto para a nossa coleção
const contatoDoBody = request.body
const contato = new contatosCollection(contatoDoBody)

  contato.save((error) =>{
  // if(error !== null && error !== undefined)
    if(error){
      return response.status(400).send(error)
    }else{
    return response.status(201).send(contato)
    }
  })
}


const alterarById = (request, response) => {
  // novo objeto para a nossa coleção  
  const idParam = request.params.id
  const contatoDoBody = request.body
  const options = {new: true}
  contatosCollection.findByIdAndUpdate(idParam, contatoDoBody, options, (error,contato) => {
    //contatosCollection.find( FILTRO , function (error,contatos) 
    if(error){
      console.log('Não encontrou')
      return response.status(500).send(error)
    }else{
      if (contato){
        console.log('Criou e salvou')
        return response.status(200).send(contato)
        } else{
          console.log('Não tem')
          return response.status(404).send('Contato nao encontrado')
        }
      }
  })

  }



  /* let contato = request.body
  let baseDados = contatoCollection.agenda.contatos
  contato.id = Math.random().toString(36).substr(-8)

  if (!contato.nome || !contato.dataNascimento || !contato.celular) {
    response.status(400).send("Dados inválidos");
  } else {
    if (baseDados.find(dado => dado.nome === contato.nome)) {
      response.status(400).send("Contato já cadastrado")
    } else {
      contatoCollection.agenda.contatos.push(contato)
      response.status(201).send(contato)
    }
  } */

module.exports = {
  getAll,
  deleteById,
  getNome,
  alterarById,
  getId,
  add
}
