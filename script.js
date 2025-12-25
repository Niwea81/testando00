function avaliarVIX(){
  const vix = document.getElementById("vixRange").value;
  const label = document.getElementById("vixLabel");

  let nivel = "baixo";
  if(vix >= 20 && vix < 30) nivel = "moderado";
  if(vix >= 30) nivel = "alto";

  label.innerHTML = `VIX atual percebido: <b>${vix}</b> (${nivel})`;

  atualizarFeedbackMacro();
}

function avaliarAgenda(){
  atualizarFeedbackMacro();
}

function avaliarEvento(){
  atualizarFeedbackMacro();
}

function atualizarFeedbackMacro(){
  const agenda = document.getElementById("agendaImpacto").value;
  const evento = document.getElementById("diaEvento").value;
  const feedback = document.getElementById("feedbackMacro");

  let mensagem = "";

  if(agenda === "sim" || evento === "sim"){
    mensagem = `
      ⚠️ <b>Atenção ao Contexto Macro</b><br><br>
      Eventos econômicos de alto impacto (★★★), como CPI, FOMC ou Payroll,
      podem aumentar a volatilidade de forma imprevisível.<br><br>
      👉 Para operadores iniciantes, isso pode significar:<br>
      • Spreads mais abertos<br>
      • Stops sendo atingidos rapidamente<br>
      • Movimentos bruscos mesmo após o evento<br><br>
      💡 Considere reduzir tamanho, usar estruturas defensivas
      ou até mesmo <b>não operar</b> hoje.
    `;
  } else {
    mensagem = `
      ✅ <b>Contexto Macro Neutro</b><br><br>
      Não há eventos de alto impacto identificados.<br>
      O ambiente tende a ser mais previsível, o que é
      mais adequado para estudo e execução consciente de opções.
    `;
  }

  feedback.innerHTML = mensagem;
  feedback.style.display = "block";
}

