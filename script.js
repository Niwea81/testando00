/******************************
 * CAMADA 1 — CONTEXTO
 ******************************/
function avaliarContexto() {
  const resultado = document.getElementById("resultado");
  if (!resultado) return;

  resultado.style.display = "block";
  resultado.innerHTML =
    "✅ Contexto avaliado.<br>" +
    "📘 Esta é apenas a base educativa.";
}

/******************************
 * CAMADA 2 — ESTRUTURA
 ******************************/
function estruturaMercado(btn, tipo) {
  document
    .querySelectorAll(".option-btn")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  const box = document.getElementById("feedbackCamada2");
  if (!box) return;

  box.style.display = "block";

  const textos = {
    alta: "📈 Tendência de alta — topos e fundos ascendentes",
    baixa: "📉 Tendência de baixa — pressão vendedora",
    range: "📊 Consolidação — mercado lateral",
    indefinido: "❓ Estrutura indefinida — aguarde"
  };

  box.innerHTML = textos[tipo];
}

/******************************
 * GRÁFICO — TRADINGVIEW
 ******************************/
function atualizarGrafico() {
  const ativo = document.getElementById("ativo")?.value || "SPY";
  const iframe = document.getElementById("tv");

  if (!iframe) return;

  iframe.src =
    "https://s.tradingview.com/widgetembed/?" +
    "symbol=" + ativo +
    "&interval=D" +
    "&theme=dark";
}

window.onload = atualizarGrafico;
