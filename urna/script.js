/*Variáveis de controle à exibição dos elementos na tela*/
let seuVotoapara = document.querySelector(".d1 span");
let cargo = document.querySelector(".d2 span");
let descricao = document.querySelector(".d4");
let aviso = document.querySelector(".divisao2");
let conteudoLateral = document.querySelector(".d-rigth");
let numeros = document.querySelector(".d3");

/*Variáveis de controle às etapas de exibição do conteudo, sendo etapaAtual referente à a tual etapa e numeroPreenchido aos numeros que
serão setados na interface*/
let etapaAtual = 0;
let numeroPreenchido = "";
let votoBranco = false;

/*Controla as etapas que serão exibidas*/
function controleDeEtapas() {
  /*variável que recebe a atual etapa através da etiqueta do array etapas criado anteriormente, dessa forma é possível controlar as etapas
  de eleição*/
  let etapa = etapas[etapaAtual];
  /*Variável referente ao espaço ao qual o número serpa setado e o numero que fica na memória no cado, numeroPreenchido*/
  let numeroHTML = "";
  numeroPreenchido = "";
  /* Referente ao controle para o voto em branco */
  votoBranco = false;
  /*Verificação e exibição das etapas da eleição*/
  for (i = 0; i < etapa.numeros; i++) {
    /*verificação do espaço que o número deverá ser setado*/
    if (i === 0) {
      numeroHTML += "<div class='numero pisca'></div>";
    } else {
      numeroHTML += "<div class='numero'></div>";
    }
  }
  /*setando valores para as variáveis de exibição*/
  seuVotoapara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  conteudoLateral.innerHTML = "";
  numeros.innerHTML = numeroHTML;
}

/*atualiza a interface*/
function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  /*Verificação de o valore passado pelo usuário corresponde a um candidato existenre, onde será filtrado o valor que corresponde a um
  candidato*/
  let candidato = etapa.candidatos.filter((i) => {
    if (i.numero === numeroPreenchido) {
      return true;
    } else {
      return false;
    }
  });

  /*caso o candidato seja encontrado, o mesmo o array candidato recebe candidato[0], que se refere ao condidato encontrado*/
  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoapara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido}`;

    /*setando a foto e legenda referentes ao candidato */
    let fotosHTML = "";
    for (let i in candidato.foto) {
      fotosHTML += `<div class="d-image"><img  class="img" src="./images/${candidato.foto[i].url}" alt=""/>${candidato.foto[i].legenda}</div>`;
    }
    conteudoLateral.innerHTML = fotosHTML;
  } else {
    /*caso o candidato não exista, irá aparecer uma mensagem de voto nulo na interface*/
    seuVotoapara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = "<div class='aviso--grande pisca'>VOTO NULO</div>";
  }
}
/*seta os valores esccolhidos pelo usuário na interface*/
function clicou(n) {
  /*variável que mostra o espaço onde os valores devem ser inseridos*/
  let elNumero = document.querySelector(".numero.pisca");
  /*se a variável de exibição retornar um valor diferente de null, significa que este espaço deverá ser preenchido pelo usuário*/
  if (elNumero !== null) {
    /*setando os valores na interface*/
    elNumero.innerHTML = n;
    /*exibição dos valores na interface*/
    numeroPreenchido = `${numeroPreenchido}${n}`;
    /*nessa parte é removida a animação de piscar, a qual identifica o espaço onde os valores devem ser setados*/
    elNumero.classList.remove("pisca");
    /*verifica se existe um próximo elemnto*/
    if (elNumero.nextElementSibling !== null) {
      /*nessa parte o próximo espaço é escolhido para receber a animação dex piscar, o que siginifica que o mesmo indicará onde o 
        valor passado pelo usuário deverá ser setado*/
      elNumero.nextElementSibling.classList.add("pisca");
    } else {
      /*caso contrário a interface é atualizada*/
      atualizaInterface();
    }
  }
}

/*Para que o usuário possa votar em branco, é necessário que não exista nenhum valor setado na interface*/
function branco() {
  if (numeroPreenchido === "") {
    votoBranco = true;
    seuVotoapara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    conteudoLateral.innerHTML = "";
    descricao.innerHTML =
      "<div class='aviso--grande pisca'>VOTOU EM BRANCO!</div>";
  } else {
    alert(
      "Você entrou com valores anteriormente, clique em corrigir antes de votar em branco!"
    );
  }
}

function corrige() {
  controleDeEtapas();
}

function confirma() {
  let votoCOnfirmado = false;
  let etapa = etapas[etapaAtual];
  if (votoBranco === true) {
    votoCOnfirmado = true;
    alert("Confirmando como voto em branco");
  } else if (numeroPreenchido.length === etapa.numeros) {
    votoCOnfirmado = true;
    alert("Confirmando como voto em " + numeroPreenchido);
  }

  if (votoCOnfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
      controleDeEtapas();
    } else {
      document.querySelector(".tela").innerHTML =
        "<div class='aviso--grande pisca'>Fim da Eleição!</div>";
    }
  }
}

controleDeEtapas();
