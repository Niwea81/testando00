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
      📈 Tendência de Alta<br><br>
      Topos e fundos ascendentes.<br>
      ${confirmacao}<br><br>
      📘 Iniciante: operar a favor da tendência reduz erros.
    `,
    baixa: `
      📉 Tendência de Baixa<br><br>
      Topos e fundos descendentes.<br>
      ${confirmacao}<br><br>
      📘 Iniciante: cuidado com compras contra o fluxo.
    `,
    range: `
      📊 Consolidação / Range<br><br>
      Mercado sem direção definida.<br>
      ${confirmacao}<br><br>
      📘 Iniciante: direcional costuma falhar aqui.
    `,
    indefinido: `
      ❓ Estrutura indefinida<br><br>
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

  const url = `https://s.tradingview.com/widgetembed/?symbol=${ativo}\&interval=D\&hidetoptoolbar=1\&hidesidetoolbar=1\&theme=dark`;

  document.getElementById("tv").src = url;
}

// carrega gráfico inicial ao abrir o site
window.onload = atualizarGrafico;

function atualizarGrafico() {
  const ativo = document.getElementById("ativo").value;

  // Gráfico do ativo (Camada 2)
  const ativoUrl = `https://s.tradingview.com/widgetembed/?symbol=${ativo}\&interval=D\&theme=dark`;
  document.getElementById("tv").src = ativoUrl;

  // Gráfico do VIX (Camada 3)
  const vixUrl = `https://s.tradingview.com/widgetembed/?symbol=VIX\&interval=D\&theme=dark`;
  document.getElementById("vixChart").src = vixUrl;
}

window.onload = atualizarGrafico;

function definirExpectativa(botao, tipo) {
  document
    .querySelectorAll("#feedbackCamada4, .option-btn")
    .forEach(el => el.classList?.remove("active"));

  botao.classList.add("active");

  const feedback = document.getElementById("feedbackCamada4");
  feedback.style.display = "block";

  if (tipo === "direcional") {
    feedback.innerHTML = `
      🎯 Leitura Direcional<br><br>
      • Você espera deslocamento do preço<br>
      • Normalmente alinhado com tendência clara<br>
      • Exige timing, convicção e stop bem definido<br><br>

      📘 Para iniciantes:<br>
      Direcional erra mais, mas quando acerta paga melhor.
    `;
  }

  if (tipo === "neutro") {
    feedback.innerHTML = `
      🧲 Leitura Neutra<br><br>
      • Você não espera grande movimento<br>
      • Foco em tempo e estatística<br>
      • Requer controle de risco e disciplina<br><br>

      📘 Para iniciantes:<br>
      Neutro costuma ter maior taxa de acerto, mas exige gestão.
    `;
  }

  if (tipo === "indefinido") {
    feedback.innerHTML = `
      ❓ Falta de Convicção<br><br>
      • Mercado confuso ou leitura incompleta<br>
      • Melhor cenário para observar e aprender<br><br>

      📘 Para iniciantes:<br>
      Não operar também é uma decisão profissional.
    `;
  }
}

function selecionarEstrutura(btn, tipo) {
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  let msg = "";

  if (tipo === "movimento") {
    msg = `
      📈 Acompanhamento de movimento<br><br>
      • Funciona melhor em mercados direcionais<br>
      • Sensível à volatilidade<br>
      • Exige bom timing de entrada<br><br>
      ⚠️ Iniciantes: movimentos contra podem gerar perdas rápidas.
    `;
  }

  if (tipo === "controlado") {
    msg = `
      🧩 Movimento controlado<br><br>
      • Ideal quando há direção, mas com risco reduzido<br>
      • Menor impacto emocional<br>
      • Boa para aprendizado estrutural<br><br>
      📘 Dica: muito usada por traders consistentes.
    `;
  }

  if (tipo === "lateral") {
    msg = `
      🟨 Preço lateral / parado<br><br>
      • Mercado sem tendência clara<br>
      • Volatilidade elevada favorece<br>
      • Ganho vem do tempo, não do movimento<br><br>
      ⚠️ Atenção: rompimentos causam ajustes.
    `;
  }

  if (tipo === "defesa") {
    msg = `
      🛡️ Proteção / Defesa<br><br>
      • Foco em reduzir risco<br>
      • Pode proteger carteira ou operação aberta<br>
      • Muito usada por profissionais<br><br>
      📘 Educação: defesa também é estratégia.
    `;
  }

  const box = document.getElementById("feedbackCamada5");
  box.style.display = "block";
  box.innerHTML = msg;
}

function decisaoBase(btn, tipo) {
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  let alerta = "";

  if (tipo === "comprar") {
    alerta = `
      🟢 Posição comprada<br>
      • Risco limitado ao valor investido<br>
      • Sensível ao tempo e volatilidade<br>
      • Perdas são conhecidas desde a entrada
    `;
  }

  if (tipo === "vender") {
    alerta = `
      🔴 Posição vendida<br>
      ⚠️ Pode ter risco ilimitado<br>
      ⚠️ Exige margem<br>
      ⚠️ Movimentos extremos podem gerar ajustes ou perdas relevantes
    `;
  }

  if (tipo === "spread") {
    alerta = `
      🧩 Estrutura em Spread<br>
      • Risco e ganho limitados<br>
      • Consome menos margem<br>
      • Muito usada por traders com contas menores
    `;
  }

  if (tipo === "coberta") {
    alerta = `
      🛡️ Estrutura Coberta<br>
      ⚠️ Exige posse do ativo<br>
      • Reduz risco direcional<br>
      • Limita ganhos em troca de proteção
    `;
  }

  const box = document.getElementById("alertasCamada5");
  box.style.display = "block";
  box.innerHTML = alerta;
}

// ================= CAMADA 6 — BLOCO INDEPENDENTE =================

(() => {
  const camada6 = document.getElementById("camada6-estrutura");
  if (!camada6) return;

  const botoes = camada6.querySelectorAll(".option-btn");
  const feedback = camada6.querySelector(".feedback");

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      // ativa visualmente sem afetar outras camadas
      btn.classList.toggle("active");

      if (feedback) {
        feedback.style.display = "block";
        feedback.innerHTML = `
          ✅ <b>${btn.innerText}</b> marcada como compatível.<br>
          📌 Lembrete: estrutura é consequência, não decisão final.
        `;
      }
    });
  });
})();

// ================= CAMADA 7 — STRIKE, TEMPO E RISCO (FIX) =================

document.addEventListener("DOMContentLoaded", () => {

  const exemplo = document.getElementById("exemplo-grade");
  const botoes = document.querySelectorAll(
    "#camada7-strike .option-btn"
  );

  if (!exemplo || botoes.length === 0) {
    console.warn("Camada 7 não encontrada");
    return;
  }

  const exemplos = {
    call: `
      <b>📈 Call Comprada — Exemplo Educacional</b><br><br>
      🟢 Strike: ATM ou levemente OTM<br>
      🕒 DTE: 3–14 dias<br>
      ⚠️ Risco: prêmio pago<br><br>
      <i>Grade típica:</i><br>
      • Delta ~0.45<br>
      • Theta negativo
    `,
    put: `
      <b>📉 Put Comprada — Exemplo Educacional</b><br><br>
      🔴 Strike: ATM ou OTM<br>
      🕒 DTE: 3–14 dias<br>
      ⚠️ Risco: prêmio pago
    `,
    bull: `
      <b>📈 Bull Spread</b><br><br>
      Compra Call ATM<br>
      Venda Call OTM<br>
      Risco limitado
    `,
    bear: `
      <b>📉 Bear Spread</b><br><br>
      Compra Put ATM<br>
      Venda Put OTM<br>
      Risco limitado
    `,
    credit: `
      <b>🟨 Spread de Crédito</b><br><br>
      Venda OTM<br>
      Compra proteção<br>
      Alta probabilidade
    `,
    neutral: `
      <b>🔵 Estrutura Neutra</b><br><br>
      Mercado lateral<br>
      Dependente de volatilidade
    `
  };

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const tipo = btn.dataset.estrutura;
      exemplo.style.display = "block";
      exemplo.innerHTML = exemplos[tipo] || "Estrutura não encontrada";
    });
  });

});


