function gerarCadeiaEducacional(){
  const preco = parseFloat(document.getElementById("precoAtivo")?.value || 31);
  const strikes = [];

  for(let i=-6;i<=6;i++){
    strikes.push((preco + i*0.25).toFixed(2));
  }

  const calls = document.getElementById("callsCol");
  const puts  = document.getElementById("putsCol");
  const mid   = document.getElementById("strikeCol");

  calls.innerHTML = "";
  puts.innerHTML  = "";
  mid.innerHTML   = "";

  strikes.forEach(s=>{
    let classe = "otm";
    if(parseFloat(s) === parseFloat(preco.toFixed(2))) classe="atm";
    if(parseFloat(s) < preco) classe="itm";

    calls.innerHTML += `
      <div class="option-row ${classe}">
        <spanI>${(Math.random()*4).toFixed(2)}M</span>
        <span>${(Math.random()*0.7).toFixed(2)}</span>
        <span>${(Math.random()*2).toFixed(2)}</span>
        <span>${(Math.random()*2.5).toFixed(2)}</span>
      </div>
    `;

    mid.innerHTML += `
      <div class="strike-row ${classe}">
        ${s}
      </div>
    `;

    puts.innerHTML += `
      <div class="option-row ${classe}">
        <span>${(Math.random()*2).toFixed(2)}</span>
        <span>${(Math.random()*2.5).toFixed(2)}</span>
        <span>-${(Math.random()*0.7).toFixed(2)}</span>
        <span>${(Math.random()*4).toFixed(2)}M</span>
      </div>
    `;
  });

  document.getElementById("gradeOpcoes").style.display = "block";
}
