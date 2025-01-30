const form = document.querySelector('#form');
// constante que guarda a variável input, relacionada ao que vai ser colocado no campo Nome//
const nomeInput = document.querySelector('#nome');
const emailInput = document.getElementById('email');
const nomeError = nomeInput.nextElementSibling; // Seleciona o elemento p de erro
const emailError = emailInput.nextElementSibling;

// Função para esconder todos os erros inicialmente
function inicializarErros() {
   const mensagensErro = document.querySelectorAll('.error');
   mensagensErro.forEach(erro => {
       erro.classList.add('error-hidden');
       erro.classList.remove('error');
       erro.textContent = '';  // Limpa o texto da mensagem
   });
}
// Chama a função de inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', inicializarErros);

 // Função para validar o nome
function validarNome(nome) {
   // Remove espaços em branco do início e fim
   const nomeFormatado = nome.trim();
   
   // Verifica se o campo está vazio
   if (!nomeFormatado) {
       return {
           valido: false,
           mensagem: 'O nome é obrigatório.'
       };
   }
   
   // Verifica o tamanho do nome (maior que 2 e menor ou igual a 100)
   if (nomeFormatado.length <= 2) {
       return {
           valido: false,
           mensagem: 'O nome deve ter mais que 2 caracteres.'
       };
   }
   
   if (nomeFormatado.length > 100) {
       return {
           valido: false,
           mensagem: 'O nome deve ter no máximo 100 caracteres.'
       };
   }
   
   return {
       valido: true,
       mensagem: ''
   };
}

// Função para validar o email
function validarEmail(email) {
   const emailFormatado = email.trim();
   
   // Verifica se o campo está vazio
   if (!emailFormatado) {
       return {
           valido: false,
           mensagem: 'O e-mail é obrigatório.'
       };
   }
   
   // Verifica o tamanho do email
   if (emailFormatado.length <= 10) {
       return {
           valido: false,
           mensagem: 'O e-mail deve ter mais que 10 caracteres.'
       };
   }
   
   if (emailFormatado.length > 100) {
       return {
           valido: false,
           mensagem: 'O e-mail deve ter no máximo 100 caracteres.'
       };
   }
   
   // Regex para validação de email
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
   if (!emailRegex.test(emailFormatado)) {
       return {
           valido: false,
           mensagem: 'Digite um e-mail válido.'
       };
   }
   
   return {
       valido: true,
       mensagem: ''
   };
}


// Função para mostrar ou esconder mensagem de erro//
function mostrarErro(elemento, mensagem, mostrar) {
    elemento.textContent = mensagem;
    if (mostrar) {
        elemento.classList.remove('error-hidden');
        elemento.classList.add('error');
    } else {
        elemento.classList.add('error-hidden');
        elemento.classList.remove('error');
    }
}

// Adiciona evento de input para validação em tempo real
nomeInput.addEventListener('input', function() {
   const resultado = validarNome(this.value);
   mostrarErro(nomeError, resultado.mensagem, !resultado.valido);
});

// Eventos para o campo email
emailInput.addEventListener('input', function() {
   const resultado = validarEmail(this.value);
   mostrarErro(emailError, resultado.mensagem, !resultado.valido);
});

// Adiciona evento de submit ao formulário
form.addEventListener('submit', function(event) {
   // Previne o envio do formulário se houver erro
   const resultado = validarNome(nomeInput.value);
   const emailResultado = validarEmail(emailInput.value);

   
   // Se houver algum erro, impede o envio do formulário
   if (!nomeResultado.valido || !emailResultado.valido) {
      event.preventDefault();
      
      // Mostra os erros
      mostrarErro(nomeError, nomeResultado.mensagem, !nomeResultado.valido);
      mostrarErro(emailError, emailResultado.mensagem, !emailResultado.valido);
      
      // Foca no primeiro campo com erro
      if (!nomeResultado.valido) {
          nomeInput.focus();
      } else if (!emailResultado.valido) {
          emailInput.focus();
      }
  }
});