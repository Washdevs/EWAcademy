/*
0 - Obter o usuário
1 - Obter o num de telefone do usar apartir do ID
2 - OTer o endereco pelo ID
*/
//Refatorando Callbacks para Promises

//Promisse: vem no estado inicial pendding, (pendente) depois de resolvida vem no estado fullfilled (Sucesso),
// se der erro vem no estado rejected (Erro) e nós capturamos com try cat por exemplo.

//quando der algum problema -> reject(ERRO)
//quando for sucesso -> resolve

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: 'Aladdin',
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '99125003',
        ddd: 62,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    // Simulando o retorno do endereço
    callback(null, {
      rua: 'H1',
      numero: 0,
    });
  }, 3000);
}

const usuarioPromisse = obterUsuario(2);
usuarioPromisse
  .then(function (usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,
      };
    });
  })
  .then(function (resultado) {
    console.log(`
       Nome: ${resultado.usuario.nome}, 
       Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone},
       Endereço: Rua ${resultado.endereco.rua} Número: ${resultado.endereco.numero}`);
  })
  .catch(function (error) {
    console.error('Deu ruim', error);
  });

//para manipular o sucesso usamos a função .then
//para manupular erros, usamos o .catch

// obterUsuario(function resolverUsuario(error, usuario){
// if (error) {
//   console.error('Deu ruim', error);
//   return;
// }
// obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
//   if (erro1) {
//     console.error('Deu ruim', erro1);
//     return;
//   }

//   obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
//     if (erro2) {
//       console.error('Deu ruim', erro2);
//       return;
//     }
//     console.log(
//       `Nome: ${usuario.nome} Endereco: ${endereco.rua}, ${endereco.numero} Telefone: (${telefone.ddd})${telefone.telefone}`,
//     );
//   });
// });
//})

//const telefone = obterTelefone(usuario.id)

//console.log('telefone', telefone);
