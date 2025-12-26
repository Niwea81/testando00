/********************************
 * UTILIDADES GERAIS
 ********************************/
function limparBotoes(container) {
  if (!container) return;
  container.querySelectorAll("button").forEach(b =>
    b.classList.remove("active", "ativo")
  );
}

/********************************
 * ESTADO GLOBAL
 ********************************/
const estado = {
  ativo: "SPY",
  estrutura: null,
  expectativa: null
};

/********************************
 * CAMADA 1 — CONTEXTO
 ********************************/
function avaliarContexto() {
  // função chamada no HTML (não pode faltar)
  console.log("Contexto avaliado");
}

/********************************
 * CAMADA 2 — ESTRUTURA DE MERCADO
 ********************************/
function estruturaMercado(btn, tipo) {
  limparBotoes(btn.parentElement);
  btn.classList.add("active");

  estado.estrutura = tipo;

  const feedback = document.getElementById("feedbackCamada2");
  if (!feedback) return;

  feedback.style.display = "block";

  const textos = {
    alta: "📈 Estrutura de alta → topos e fundos ascendentes",
    baixa: "📉 Estrutura de baixa → topos e fundos descendentes",
    range: "📊 Consolidação → mercado lateral",
    indefinido: "❓ Estrutura indefinida → cautela"
  };

  feedback.innerHTML = textos[tipo] || "";
}

/********************************
 * CAMADA 3 — EXPECTATIVA
 ********************************/
function definirExpectativa(btn, tipo) {
  limparBotoes(btn.parentElement);
  btn.classList.add("active");

  estado.expectativa = tipo;

  const box = document.getElementById("feedbackCamada3");
  if (!box) return;

  box.style.display = "block";
  box.innerHTML =
    tipo === "direcional"
      ? "🎯 Mercado com viés direcional"
      : "⚖️ Mercado neutro / lateral";
}

/********************************
 * TRADINGVIEW — GRÁFICO
 ********************************/
function atualizarGrafico() {
  const ativo = document.getElementById("ativo")?.value || "SPY";
  estado.ativo = ativo;

  const iframe = document.getElementById("tv");
  if (!iframe) return;

  iframe.src =
    "https://s.tradingview.com/widgetembed/?" +
    "symbol=" + ativo +
    "&interval=D" +
    "&theme=dark" +
    "&style=1" +
    "&toolbarbg=1f2937" +
    "&hideideas=1";
}

/********************************
 * FUNÇÕES NEUTRAS (PLACEHOLDER)
 * Evitam erro se HTML chamar
 ********************************/
function selecionarPremio() {}
function decisaoBase() {}
