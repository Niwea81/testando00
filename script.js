/***********************
 * ESTADO GLOBAL
 ***********************/
const estado = {
  contexto: {},
  estruturaMercado: null,
  expectativa: null,
  comportamentoPreco: null,   // 5A
  premio: null,               // 5B
  estruturaOpcoes: null       // 5B
};

/***********************
 * CAMADA 1 — CONTEXTO
 ***********************/
function avaliarContexto() {
  const vix = document.getElementById("vix").value;
  const agenda = document.getElementById("agenda").value;
  const perfil = document.getElementById("perfil").value;

  estado.contexto = { vix, agenda, perfil };

  let mensagem = "Contexto favorável.";

  if (vix > 25) mensagem = "⚠️ VIX elevado: cuidado com risco.";
  if (agenda === "alto") mensagem += " Evento macro relevante hoje.";

  document.getElementById("resultado").innerText = mensagem;
}

/***********************
 * CAMADA 2 — ESTRUTURA DO MERCADO
 ***********************/
function estruturaMercado(botao, tipo) {
  limparGrupo(botao);
  botao.classList.add("active");

  estado.estruturaMercado = tipo;

  const feedback = document.getElementById("feedbackCamada2");
  feedback.style.display = "block";
  feedback.innerHTML = `📊 Estrutura identificada: <b>${tipo.toUpperCase()}</b>`;
}

/***********************
 * CAMADA 3 — VOLATILIDADE
 ***********************/
function atualizarGrafico() {
  const ativo = document.getElementById("ativo").value;
  document.getElementById("tv").src =
    `https://s.tradingview.com/widgetembed/?symbol=${ativo}&interval=D&theme=dark`;
}

/***********************
 * CAMADA 4 — EXPECTATIVA
 ***********************/
function definirExpectativa(botao, tipo) {
  limparGrupo(botao);
  botao.classList.add("active");

  estado.expectativa = tipo;

  const feedback = document.getElementById("feedbackCamada4");
  feedback.style.display = "block";
  feedback.innerHTML = `🎯 Expectativa definida: <b>${tipo.toUpperCase()}</b>`;
}

/***********************
 * CAMADA 5A — COMPORTAMENTO DO PREÇO
 ***********************/
function selecionarComportamento(botao, tipo) {
  limparGrupo(botao);
  botao.classList.add("active");

  estado.comportamentoPreco = tipo;

  const feedback = document.getElementById("feedbackCamada5");
  feedback.style.display = "block";
  feedback.innerHTML =
    `📈 Comportamento esperado: <b>${tipo.toUpperCase()}</b>`;
}

/***********************
 * CAMADA 5B — PRÊMIO
 ***********************/
function selecionarPremio(botao, tipo) {
  limparGrupo(botao);
  botao.classList.add("active");

  estado.premio = tipo;

  document.getElementById("feedbackPremio").style.display = "block";
  document.getElementById("feedbackPremio").innerHTML =
    `💰 Decisão sobre prêmio: <b>${tipo.toUpperCase()}</b>`;

  // Libera próximo bloco
  document.getElementById("blocoEstrutura").style.display = "block";
}

/***********************
 * CAMADA 5B — ESTRUTURA DE OPÇÕES
 ***********************/
function selecionarEstruturaOpcoes(botao, tipo) {
  limparGrupo(botao);
  botao.classList.add("active");

  estado.estruturaOpcoes = tipo;

  document.getElementById("alertasEstrutura").style.display = "block";
  document.getElementById("alertasEstrutura").innerHTML =
    `📦 Estrutura escolhida: <b>${tipo.toUpperCase()}</b>`;

  // Mostrar grade educacional
  gerarGradeEducacional();
}

/***********************
 * GRADE EDUCACIONAL
 ***********************/
function gerarGradeEducacional() {
  const tabela = document.getElementById("cadeiaOpcoes");
  if (!tabela) return;

  tabela.innerHTML = "";

  const strikes = [95, 100, 105];
  strikes.forEach((strike, i) => {
    const classe =
      i === 1 ? "atm" : i === 0 ? "itm" : "otm";

    tabela.innerHTML += `
      <tr class="${classe}">
        <td>1.20</td><td>1.35</td><td></td>
        <td>${strike}</td>
        <td></td><td>1.10</td><td>1.25</td>
      </tr>
    `;
  });

  document.getElementById("gradeOpcoes").style.display = "block";
}

/***********************
 * UTIL
 ***********************/
function limparGrupo(botao) {
  const grupo = botao.parentElement.querySelectorAll(".option-btn");
  grupo.forEach(b => b.classList.remove("active"));
}
