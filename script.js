const vixSlider = document.getElementById("vix");
const vixValue = document.getElementById("vixValue");

vixSlider.addEventListener("input", () => {
  vixValue.textContent = vixSlider.value;
});

function avaliarContexto() {
  const vix = Number(vixSlider.value);
  const agenda = document.getElementById("agenda").value;
  const perfil = document.getElementById("perfil").value;

  const cpi = document.getElementById("cpi").checked;
  const fomc = document.getElementById("fomc").checked;
  const payroll = document.getElementById("payroll").checked;

  let mensagem = "";
  let status = "✅ Contexto macro aceitável para avançar.";

  // VIX
  if (vix >= 30) {
    mensagem += "⚠️ VIX elevado indica ambiente instável.\n";
    if (perfil === "iniciante") {
      status = "⛔ Trade bloqueado para iniciantes em VIX alto.";
    }
  }

  // Agenda
  if (agenda === "alto") {
    mensagem += "⚠️ Agenda econômica com eventos ⭐⭐⭐.\n";
    if (perfil === "iniciante") {
      status = "⛔ Evite operar em dias de alto impacto.";
    }
  }

  // Eventos individuais
  if (cpi) {
    mensagem += "🔥 CPI ativo: volatilidade extrema possível.\n";
    if (perfil !== "avancado") {
      status = "⛔ CPI exige estratégias específicas.";
    }
  }

  if (fomc) {
    mensagem += "🔥 FOMC ativo: mudança de expectativa macro.\n";
    if (perfil === "iniciante") {
      status = "⛔ FOMC não é indicado para iniciantes.";
    }
  }

  if (payroll) {
    mensagem += "🔥 Payroll ativo: ruído e falsos movimentos.\n";
    if (perfil === "iniciante") {
      status = "⛔ Payroll tende a gerar armadilhas.";
    }
  }

  if (perfil === "iniciante") {
    mensagem += "\n📘 Nota educativa:\nMesmo após o evento, o mercado pode continuar ajustando preços.";
  }

  document.getElementById("resultado").innerText =
    mensagem + "\n\n" + status;
}

// ================= CAMADA 2 — ESTRUTURA DO MERCADO =================

function estruturaMercado(btn, tipo) {

  // Remove seleção anterior
  document
    .querySelectorAll(".option-btn")
    .forEach(b => b.classList.remove("active"));

  // Ativa botão atual
  btn.classList.add("active");

  // Leitura dos checkboxes
  const diario = document.getElementById("toqueDiario")?.checked;
  const h4 = document.getElementById("toque4h")?.checked;

  let confirmacao = "";

  if (diario && h4) {
    confirmacao = "✔️ Diário e 4H confirmam reação técnica.";
  } else if (diario || h4) {
    confirmacao = "⚠️ Apenas um timeframe confirma.";
  } else {
    confirmacao = "⛔ Nenhuma reação técnica clara.";
  }

  const mensagens = {
    alta: `
      📈 <b>Tendência de Alta</b><br><br>
      Topos e fundos ascendentes.<br>
      ${confirmacao}<br><br>
      📘 Iniciante: operar a favor da tendência reduz erros.
    `,
    baixa: `
      📉 <b>Tendência de Baixa</b><br><br>
      Topos e fundos descendentes.<br>
      ${confirmacao}<br><br>
      📘 Iniciante: cuidado com compras contra o fluxo.
    `,
    range: `
      📊 <b>Consolidação / Range</b><br><br>
      Mercado sem direção definida.<br>
      ${confirmacao}<br><br>
      📘 Iniciante: direcional costuma falhar aqui.
    `,
    indefinido: `
      ❓ <b>Estrutura indefinida</b><br><br>
      Mercado em transição ou confuso.<br>
      ${confirmacao}<br><br>
      📘 Profissionais aguardam clareza.
    `
  };

  const box = document.getElementById("feedbackCamada2");
  if (box) {
    box.style.display = "block";
    box.innerHTML = mensagens[tipo];
  }
}

function atualizarGrafico() {
  const ativo = document.getElementById("ativo").value;

  const url = `https://s.tradingview.com/widgetembed/?symbol=${ativo}&interval=D&hidetoptoolbar=1&hidesidetoolbar=1&theme=dark`;

  document.getElementById("tv").src = url;
}

// carrega gráfico inicial ao abrir o site
window.onload = atualizarGrafico;

function atualizarGrafico() {
  const ativo = document.getElementById("ativo").value;

  // Gráfico do ativo (Camada 2)
  const ativoUrl = `https://s.tradingview.com/widgetembed/?symbol=${ativo}&interval=D&theme=dark`;
  document.getElementById("tv").src = ativoUrl;

  // Gráfico do VIX (Camada 3)
  const vixUrl = `https://s.tradingview.com/widgetembed/?symbol=VIX&interval=D&theme=dark`;
  document.getElementById("vixChart").src = vixUrl;
}

window.onload = atualizarGrafico;
