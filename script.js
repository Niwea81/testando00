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

function estruturaMercado

