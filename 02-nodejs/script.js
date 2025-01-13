/*
0 - Obter o usuário
1 - Obter o num de telefone do usar apartir do ID
2 - OTer o endereco pelo ID
*/
//Aula Trabalhando com Callbacks

function obterUsuario(callback) {
    setTimeout(() => {
        return callback (null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
    return callback(null, {
        telefone: '1199002',
        ddd: 11
    })
}, 2000)   
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null,{
            rua: 'H1',
            numero: 0
        })
    }, 3000)
}

function resolverUsuario(erro, usuario){
    console.log('usuario', usuario);
}

obterUsuario(function resolverUsuario(error, usuario){
    if(error){
        console.error('Deu ruim', error);
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
    if (erro1){
        console.error('Deu ruim', erro1);
        return;
    } 
    
    obterEndereco(usuario.id, function resolverEndereco(erro2, endereco){
        if(erro2){
            console.error('Deu ruim', erro2);
            return;
        }
        console.log(`Nome: ${usuario.nome} Endereco: ${endereco.rua}, ${endereco.numero} Telefone: (${telefone.ddd})${telefone.telefone}`);
        })
    })
})

//const telefone = obterTelefone(usuario.id)

//console.log('telefone', telefone);

