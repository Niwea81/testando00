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

function avaliarTecnico() {
  const estrutura = document.getElementById("estrutura").value;
  const vwap = document.getElementById("vwap").value;
  const volatilidade = document.getElementById("volatilidade").value;
  const distancia = document.getElementById("distancia").value;

  let msg = "";
  let status = "✅ Estrutura técnica favorável.";

  if (estrutura === "indefinicao") {
    status = "⛔ Estrutura indefinida — risco elevado.";
  }

  if (estrutura === "tendencia" && distancia === "esticada") {
    msg += "⚠️ Tendência esticada — risco de pullback.\n";
  }

  if (estrutura === "range" && volatilidade === "expansao") {
    msg += "⚠️ Possível rompimento ou falso rompimento.\n";
  }

  if (vwap === "emcima") {
    msg += "ℹ️ Preço sobre VWAP indica zona neutra.\n";
  }

  document.getElementById("resultadoTecnico").innerText =
    msg + "\n" + status;
}

function selecionarEstrutura(btn, tipo){
  document
    .querySelectorAll(".option-btn")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  const box = document.getElementById("feedbackEstrutura");
  box.style.display = "block";

  const mensagens = {
    alta: `
      📈 <b>Tendência de Alta identificada</b><br><br>
      Contexto geralmente mais favorável para:
      • operações direcionais<br>
      • estruturas que se beneficiam de continuidade<br><br>
      ⚠️ Ainda não é hora de escolher estratégia.
    `,
    baixa: `
      📉 <b>Tendência de Baixa identificada</b><br><br>
      Cuidado com compras impulsivas.
      • mercados em queda exigem controle emocional<br><br>
      ⚠️ Aguarde confirmação nas próximas camadas.
    `,
    range: `
      📊 <b>Mercado em consolidação</b><br><br>
      • Direcional costuma falhar<br>
      • Falsos rompimentos são comuns<br><br>
      ⚠️ Muitos traders perdem dinheiro em range sem saber.
    `,
    indefinido: `
      ⛔ <b>Estrutura indefinida</b><br><br>
      Para iniciantes, esse é o pior cenário possível.<br>
      📘 Profissionais esperam definição antes de operar.
    `
  };

  box.innerHTML = mensagens[tipo];
}


