/************************************************
 * UTILIDADES
 ************************************************/
function limparBotoes(container) {
  if (!container) return;
  [...container.children].forEach(b => b.classList.remove("active"));
}

/************************************************
 * CAMADA 1 — CONTEXTO MACRO
 ************************************************/
function avaliarContexto() {
  const resultado = document.getElementById("resultado");
  const vix = Number(document.getElementById("vix")?.value || 15);
  const perfil = document.getElementById("perfil")?.value || "iniciante";

  let msg = `📊 <b>Leitura de Contexto</b><br><br>`;
  msg += `VIX atual: <b>${vix}</b><br>`;

  if (vix >= 30) {
    msg += `⚠️ Volatilidade elevada.<br>`;
    if (perfil === "iniciante") {
      msg += `⛔ Ambiente não recomendado para iniciantes.`;
    }
  } else {
    msg += `✅ Volatilidade controlada.`;
  }

  resultado.style.display = "block";
  resultado.innerHTML = msg;
}

/************************************************
 * CAMADA 2 — ESTRUTURA DE MERCADO
 ************************************************/
function estruturaMercado(btn, tipo) {
  document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const box = document.getElementById("feedbackCamada2");
  box.style.display = "block";

  const textos = {
    alta: "📈 <b>Tendência de Alta</b><br>Topos e fundos ascendentes.",
    baixa: "📉 <b>Tendência de Baixa</b><br>Pressão vendedora dominante.",
    range: "📊 <b>Consolidação</b><br>Mercado lateral.",
    indefinido: "❓ <b>Estrutura indefinida</b><br>Aguarde clareza."
  };

  box.innerHTML = textos[tipo];
}

/************************************************
 * CAMADA 3 — GRÁFICOS (ATIVO + VIX)
 ************************************************/
function atualizarGraficos() {
  const ativo = document.getElementById("ativo")?.value || "SPY";

  const tv = document.getElementById("tv");
  const vixChart = document.getElementById("vixChart");

  if (tv) {
    tv.src =
      "https://s.tradingview.com/widgetembed/?" +
      "symbol=" + ativo +
      "&interval=D&theme=dark";
  }

  if (vixChart) {
    vixChart.src =
      "https://s.tradingview.com/widgetembed/?" +
      "symbol=VIX&interval=D&theme=dark";
  }
}

window.onload = atualizarGraficos;

/************************************************
 * CAMADA 4 — EXPECTATIVA
 ************************************************/
function definirExpectativa(btn, tipo) {
  document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const box = document.getElementById("feedbackCamada4");
  box.style.display = "block";

  if (tipo === "direcional") {
    box.innerHTML = `
      🎯 <b>Leitura Direcional</b><br>
      Espera deslocamento de preço.<br>
      Exige timing e convicção.
    `;
  }

  if (tipo === "neutro") {
    box.innerHTML = `
      🧲 <b>Leitura Neutra</b><br>
      Espera preço parado.<br>
      Foco em estatística e tempo.
    `;
  }

  if (tipo === "indefinido") {
    box.innerHTML = `
      ❓ <b>Sem convicção</b><br>
      Melhor decisão pode ser não operar.
    `;
  }
}

/************************************************
 * CAMADA 5 — ESTRUTURA (ANTES DO STRIKE)
 ************************************************/
function selecionarEstrutura(btn, tipo) {
  document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const box = document.getElementById("feedbackCamada5");
  box.style.display = "block";

  const textos = {
    simples: `
      📍 <b>Posição Simples</b><br>
      ⚠️ Pode ter risco ilimitado se vendida.
    `,
    spread: `
      🧩 <b>Spread</b><br>
      ✔️ Risco limitado<br>
      ✔️ Ideal para contas menores.
    `,
    coberta: `
      🛡️ <b>Estrutura Coberta</b><br>
      ✔️ Exige ativo em carteira.
    `
  };

  box.innerHTML = textos[tipo];
  gerarCadeiaEducacional();
}

/************************************************
 * GRADE EDUCATIVA — ITM / ATM / OTM
 ************************************************/
function gerarCadeiaEducacional() {
  const preco = Number(document.getElementById("precoAtivo")?.value || 100);
  const tbody = document.getElementById("cadeiaOpcoes");
  if (!tbody) return;

  tbody.innerHTML = "";

  for (let i = -4; i <= 4; i++) {
    const strike = preco + i * 5;

    let classe = "otm";
    if (strike === preco) classe = "atm";
    if (strike < preco) classe = "itm";

    tbody.innerHTML += `
      <tr>
        <td class="${classe}">PUT</td>
        <td class="${classe}">${strike}</td>
        <td class="${classe}">CALL</td>
      </tr>
    `;
  }

  document.getElementById("gradeOpcoes").style.display = "block";
}
