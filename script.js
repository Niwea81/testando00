/***********************
 * UTILIDADE GLOBAL
 ***********************/
function limparBotoes(classe) {
  document.querySelectorAll("." + classe).forEach(btn => {
    btn.classList.remove("ativo");
  });
}

/***********************
 * ESTADO GLOBAL
 ***********************/
const estado = {
  camada1: {
    ativo: null,
    timeframe: "D",
    confirmado: false
  },
  camada2: {
    estrutura: null,
    confirmado: false
  }
};

/***********************
 * CAMADA 1 — CONTEXTO
 ***********************/
function selecionarAtivo(btn, ativo) {
  limparBotoes("btn-ativo");
  btn.classList.add("ativo");

  estado.camada1.ativo = ativo;
  estado.camada1.confirmado = false;

  atualizarResumo();
}

function selecionarTimeframe(btn, tf) {
  limparBotoes("btn-tf");
  btn.classList.add("ativo");

  estado.camada1.timeframe = tf;
  estado.camada1.confirmado = false;

  atualizarResumo();
}

function confirmarCamada1() {
  if (!estado.camada1.ativo) {
    alert("Escolha um ativo.");
    return;
  }

  estado.camada1.confirmado = true;
  atualizarResumo();
}

/***********************
 * CAMADA 2 — ESTRUTURA
 ***********************/
function selecionarEstrutura(btn, estrutura) {
  limparBotoes("btn-estrutura");
  btn.classList.add("ativo");

  estado.camada2.estrutura = estrutura;
  estado.camada2.confirmado = false;

  atualizarResumo();
}

function confirmarCamada2() {
  if (!estado.camada2.estrutura) {
    alert("Escolha a estrutura de mercado.");
    return;
  }

  if (!estado.camada1.confirmado) {
    alert("Confirme a Camada 1 antes.");
    return;
  }

  estado.camada2.confirmado = true;
  atualizarResumo();
}

/***********************
 * RESUMO VISUAL
 ***********************/
function atualizarResumo() {
  const el = document.getElementById("resumoGeral");
  if (!el) return;

  el.innerHTML = `
    <b>Resumo Atual</b><br><br>
    <b>Camada 1</b><br>
    Ativo: ${estado.camada1.ativo ?? "—"}<br>
    Timeframe: ${estado.camada1.timeframe}<br>
    Status: ${estado.camada1.confirmado ? "✅ Confirmada" : "⏳ Pendente"}<br><br>

    <b>Camada 2</b><br>
    Estrutura: ${estado.camada2.estrutura ?? "—"}<br>
    Status: ${estado.camada2.confirmado ? "✅ Confirmada" : "⏳ Pendente"}
  `;
}

/***********************
 * BLOQUEIO DE FLUXO
 ***********************/
function podeAvancar() {
  return estado.camada1.confirmado && estado.camada2.confirmado;
}
