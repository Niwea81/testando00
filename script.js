const vixSlider = document.getElementById("vix");
const vixValue = document.getElementById("vixValue");

vixSlider.addEventListener("input", () => {
  vixValue.textContent = vixSlider.value;
});

function avaliarContexto() {
  const vix = Number(vixSlider.value);
  const agenda = document.getElementById("agenda").value;
  const perfil = document.getElementById("perfil").value;
  const evento = document.querySelector('input[name="evento"]:checked').value;

  let mensagem = "";
  let status = "✅ Contexto aceitável para análise técnica.";

  // Regras do VIX
  if (vix >= 30) {
    mensagem += "⚠️ VIX elevado indica alta volatilidade.\n";
    if (perfil === "iniciante") {
      status = "⛔ Trade bloqueado para iniciantes em VIX alto.";
    }
  }

  // Agenda econômica
  if (agenda === "alto") {
    mensagem += "⚠️ Agenda com eventos de alto impacto.\n";
    if (perfil === "iniciante") {
      status = "⛔ Evite operar em dias de notícias ⭐⭐⭐.";
    }
  }

  // Evento crítico
  if (evento === "sim") {
    mensagem += "⚠️ Evento macro relevante hoje.\n";
    if (perfil !== "avancado") {
      status = "⛔ Trade desaconselhado fora de estratégias específicas.";
    }
  }

  // Mensagem educativa
  if (perfil === "iniciante") {
    mensagem += "\n📘 Nota educativa:\nEventos macro podem gerar movimentos imprevisíveis mesmo após a divulgação.";
  }

  document.getElementById("resultado").innerText =
    mensagem + "\n\n" + status;
}

