// ===== WEBHOOK CONFIG =====
// Cambia esta URL por tu webhook de N8N, Make, Zapier, etc.
const WEBHOOK_URL = 'https://hook.eu1.make.com/lttce3uts9dogu8eaw7fos1h5jw3j7st';

// ===== DISC TEST DATA =====
const questions = [
  { words: [{text:"Enérgico",dim:"D"},{text:"Entusiasta",dim:"I"},{text:"Paciente",dim:"S"},{text:"Cuidadoso",dim:"C"}]},
  { words: [{text:"Audaz",dim:"D"},{text:"Comunicativo",dim:"I"},{text:"Moderado",dim:"S"},{text:"Perfeccionista",dim:"C"}]},
  { words: [{text:"Decidido",dim:"D"},{text:"Convincente",dim:"I"},{text:"Amable",dim:"S"},{text:"Preciso",dim:"C"}]},
  { words: [{text:"Competitivo",dim:"D"},{text:"Alegre",dim:"I"},{text:"Estable",dim:"S"},{text:"Analítico",dim:"C"}]},
  { words: [{text:"Directo",dim:"D"},{text:"Sociable",dim:"I"},{text:"Leal",dim:"S"},{text:"Detallista",dim:"C"}]},
  { words: [{text:"Exigente",dim:"D"},{text:"Expresivo",dim:"I"},{text:"Complaciente",dim:"S"},{text:"Cauteloso",dim:"C"}]},
  { words: [{text:"Resuelto",dim:"D"},{text:"Optimista",dim:"I"},{text:"Constante",dim:"S"},{text:"Meticuloso",dim:"C"}]},
  { words: [{text:"Dominante",dim:"D"},{text:"Inspirador",dim:"I"},{text:"Tolerante",dim:"S"},{text:"Riguroso",dim:"C"}]},
  { words: [{text:"Aventurero",dim:"D"},{text:"Animado",dim:"I"},{text:"Tranquilo",dim:"S"},{text:"Reservado",dim:"C"}]},
  { words: [{text:"Persistente",dim:"D"},{text:"Carismático",dim:"I"},{text:"Predecible",dim:"S"},{text:"Organizado",dim:"C"}]},
  { words: [{text:"Firme",dim:"D"},{text:"Persuasivo",dim:"I"},{text:"Servicial",dim:"S"},{text:"Prudente",dim:"C"}]},
  { words: [{text:"Arriesgado",dim:"D"},{text:"Espontáneo",dim:"I"},{text:"Diplomático",dim:"S"},{text:"Normativo",dim:"C"}]},
  { words: [{text:"Impaciente",dim:"D"},{text:"Emotivo",dim:"I"},{text:"Confiable",dim:"S"},{text:"Sistemático",dim:"C"}]},
  { words: [{text:"Autónomo",dim:"D"},{text:"Encantador",dim:"I"},{text:"Comprensivo",dim:"S"},{text:"Disciplinado",dim:"C"}]},
  { words: [{text:"Determinado",dim:"D"},{text:"Influyente",dim:"I"},{text:"Relajado",dim:"S"},{text:"Exacto",dim:"C"}]},
  { words: [{text:"Pionero",dim:"D"},{text:"Popular",dim:"I"},{text:"Armonioso",dim:"S"},{text:"Reflexivo",dim:"C"}]},
  { words: [{text:"Vigoroso",dim:"D"},{text:"Vivaz",dim:"I"},{text:"Calmado",dim:"S"},{text:"Convencional",dim:"C"}]},
  { words: [{text:"Fuerte",dim:"D"},{text:"Magnético",dim:"I"},{text:"Colaborador",dim:"S"},{text:"Minucioso",dim:"C"}]},
  { words: [{text:"Ambicioso",dim:"D"},{text:"Elocuente",dim:"I"},{text:"Considerado",dim:"S"},{text:"Ordenado",dim:"C"}]},
  { words: [{text:"Agresivo",dim:"D"},{text:"Extrovertido",dim:"I"},{text:"Apacible",dim:"S"},{text:"Calculador",dim:"C"}]},
  { words: [{text:"Osado",dim:"D"},{text:"Jovial",dim:"I"},{text:"Pacífico",dim:"S"},{text:"Formal",dim:"C"}]},
  { words: [{text:"Emprendedor",dim:"D"},{text:"Sociable",dim:"I"},{text:"Posesivo",dim:"S"},{text:"Perfeccionista",dim:"C"}]},
  { words: [{text:"Independiente",dim:"D"},{text:"Confiado",dim:"I"},{text:"Gentil",dim:"S"},{text:"Precavido",dim:"C"}]},
  { words: [{text:"Asertivo",dim:"D"},{text:"Convincente",dim:"I"},{text:"Bondadoso",dim:"S"},{text:"Objetivo",dim:"C"}]},
  { words: [{text:"Tenaz",dim:"D"},{text:"Simpático",dim:"I"},{text:"Generoso",dim:"S"},{text:"Lógico",dim:"C"}]},
  { words: [{text:"Intrépido",dim:"D"},{text:"Demostrativo",dim:"I"},{text:"Indulgente",dim:"S"},{text:"Crítico",dim:"C"}]},
  { words: [{text:"Valiente",dim:"D"},{text:"Desenvuelto",dim:"I"},{text:"Receptivo",dim:"S"},{text:"Estratégico",dim:"C"}]},
  { words: [{text:"Seguro",dim:"D"},{text:"Positivo",dim:"I"},{text:"Sensible",dim:"S"},{text:"Metódico",dim:"C"}]}
];

// ===== STATE =====
let currentQ = 0, answers = [], timerStart = null, timerInterval = null;
let currentChart = 'mas';

// ===== DISC Descriptions =====
const dimInfo = {
  D: { name:"Dominancia", color:"#ef4444", bg:"rgba(239,68,68,0.12)",
    desc:"Orientado a resultados, directo, decidido, competitivo. Busca el control y acepta retos.",
    high:["Toma decisiones rápidas","Orientado a resultados","Acepta desafíos","Directo y firme","Resuelve problemas rápidamente"],
    low:["Cooperativo y diplomático","Evita conflictos","Cauteloso al tomar riesgos","Prefiere consenso","Trabaja en equipo"] },
  I: { name:"Influencia", color:"#f59e0b", bg:"rgba(245,158,11,0.12)",
    desc:"Sociable, entusiasta, persuasivo, optimista. Motiva e inspira a los demás.",
    high:["Carismático y expresivo","Motiva a otros","Comunicador natural","Optimista y entusiasta","Crea conexiones fácilmente"],
    low:["Reflexivo y reservado","Analiza antes de hablar","Prefiere datos a emociones","Trabaja bien solo","Objetivo y lógico"] },
  S: { name:"Estabilidad", color:"#22c55e", bg:"rgba(34,197,94,0.12)",
    desc:"Paciente, confiable, leal, colaborador. Busca estabilidad y armonía.",
    high:["Paciente y constante","Excelente oyente","Leal y confiable","Trabaja en equipo","Busca armonía y estabilidad"],
    low:["Adaptable al cambio","Multitarea efectivo","Busca variedad","Impaciente con la rutina","Flexible y dinámico"] },
  C: { name:"Cumplimiento", color:"#3b82f6", bg:"rgba(59,130,246,0.12)",
    desc:"Analítico, preciso, sistemático, cuidadoso. Busca calidad y exactitud.",
    high:["Analítico y detallista","Sigue normas y estándares","Preciso y meticuloso","Pensador crítico","Busca calidad"],
    low:["Flexible con las reglas","Delega detalles","Trabaja con directrices generales","Prefiere acción a análisis","Tolerante con la ambigüedad"] }
};

// ===== FUNCTIONS =====
function startTest() {
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  if (!name) { document.getElementById('user-name').focus(); document.getElementById('user-name').style.borderColor='#ef4444'; return; }
  if (!email) { document.getElementById('user-email').focus(); document.getElementById('user-email').style.borderColor='#ef4444'; return; }
  answers = questions.map(() => ({ mas: null, menos: null }));
  currentQ = 0;
  document.getElementById('welcome-screen').classList.remove('active');
  document.getElementById('test-screen').classList.add('active');
  timerStart = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  renderQuestion();
}

function updateTimer() {
  const el = document.getElementById('timer');
  const s = Math.floor((Date.now() - timerStart) / 1000);
  el.textContent = `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}

function renderQuestion() {
  const q = questions[currentQ];
  const a = answers[currentQ];
  document.getElementById('question-counter').textContent = `Pregunta ${currentQ+1} de ${questions.length}`;
  const pct = Math.round(((currentQ) / questions.length) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('prev-btn').disabled = currentQ === 0;
  document.getElementById('next-btn').querySelector('span').textContent = currentQ === questions.length - 1 ? 'Ver Resultados' : 'Siguiente';

  let html = `<div class="question-header"><div class="question-number">Grupo ${currentQ+1}</div></div>`;
  html += `<div class="options-table"><div class="table-header"><span>Palabra</span><span>Más</span><span>Menos</span></div>`;
  q.words.forEach((w, i) => {
    const isMas = a.mas === i, isMenos = a.menos === i;
    const rowClass = isMas ? 'selected-mas' : (isMenos ? 'selected-menos' : '');
    html += `<div class="option-row ${rowClass}" id="row-${i}">
      <span class="option-word">${w.text}</span>
      <div class="radio-group"><button class="radio-btn mas-btn ${isMas?'active':''}" onclick="selectOption(${i},'mas')" aria-label="Más como yo: ${w.text}"></button></div>
      <div class="radio-group"><button class="radio-btn menos-btn ${isMenos?'active':''}" onclick="selectOption(${i},'menos')" aria-label="Menos como yo: ${w.text}"></button></div>
    </div>`;
  });
  html += '</div><div class="validation-msg" id="val-msg">Selecciona una opción en "Más" y otra en "Menos" (no pueden ser la misma).</div>';
  document.getElementById('question-card').innerHTML = html;
}

function selectOption(wordIdx, type) {
  const a = answers[currentQ];
  if (type === 'mas') {
    a.mas = a.mas === wordIdx ? null : wordIdx;
    if (a.mas !== null && a.mas === a.menos) a.menos = null;
  } else {
    a.menos = a.menos === wordIdx ? null : wordIdx;
    if (a.menos !== null && a.menos === a.mas) a.mas = null;
  }
  document.getElementById('val-msg').classList.remove('show');
  renderQuestion();
}

function nextQuestion() {
  const a = answers[currentQ];
  if (a.mas === null || a.menos === null) {
    document.getElementById('val-msg').classList.add('show');
    return;
  }
  if (currentQ < questions.length - 1) { currentQ++; renderQuestion(); window.scrollTo({top:0,behavior:'smooth'}); }
  else showResults();
}

function prevQuestion() {
  if (currentQ > 0) { currentQ--; renderQuestion(); window.scrollTo({top:0,behavior:'smooth'}); }
}

// ===== SCORING =====
function calcScores() {
  const scores = { mas:{D:0,I:0,S:0,C:0}, menos:{D:0,I:0,S:0,C:0} };
  answers.forEach((a, qi) => {
    if (a.mas !== null) scores.mas[questions[qi].words[a.mas].dim]++;
    if (a.menos !== null) scores.menos[questions[qi].words[a.menos].dim]++;
  });
  // Difference score (public profile): mas points, inverted menos
  const diff = {};
  ['D','I','S','C'].forEach(d => { diff[d] = scores.mas[d] - scores.menos[d]; });
  return { mas: scores.mas, menos: scores.menos, diff };
}

// ===== RESULTS =====
function showResults() {
  clearInterval(timerInterval);
  document.getElementById('test-screen').classList.remove('active');
  document.getElementById('results-screen').classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});

  const name = document.getElementById('user-name').value.trim();
  document.getElementById('results-user-name').textContent = name;
  document.getElementById('results-date').textContent = new Date().toLocaleDateString('es-CO',{year:'numeric',month:'long',day:'numeric'});

  const scores = calcScores();
  renderProfileBadge(scores.mas);
  renderChart(scores);
  renderDimensions(scores.mas);
  renderDominance(scores.mas);
  renderCharacteristics(scores.mas);
  window._discScores = scores;

  // Send results to webhook
  sendToWebhook(scores);
}

// ===== WEBHOOK =====
function sendToWebhook(scores) {
  if (!WEBHOOK_URL || WEBHOOK_URL === 'https://TU-WEBHOOK-URL-AQUI') {
    console.log('⚠️ Webhook no configurado. Configura WEBHOOK_URL en script.js');
    return;
  }

  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const sortedMas = Object.entries(scores.mas).sort((a,b) => b[1]-a[1]);
  const sortedMenos = Object.entries(scores.menos).sort((a,b) => b[1]-a[1]);
  const elapsed = timerStart ? Math.floor((Date.now() - timerStart) / 1000) : 0;

  const payload = {
    // Datos del participante
    nombre: name,
    email: email,
    fecha: new Date().toISOString(),
    tiempo_segundos: elapsed,

    // Puntajes "Más como yo" (Perfil Público)
    mas_D: scores.mas.D,
    mas_I: scores.mas.I,
    mas_S: scores.mas.S,
    mas_C: scores.mas.C,

    // Puntajes "Menos como yo" (Perfil Natural)
    menos_D: scores.menos.D,
    menos_I: scores.menos.I,
    menos_S: scores.menos.S,
    menos_C: scores.menos.C,

    // Perfil resultante
    perfil_primario: sortedMas[0][0],
    perfil_primario_nombre: dimInfo[sortedMas[0][0]].name,
    perfil_primario_puntaje: sortedMas[0][1],
    perfil_secundario: sortedMas[1][0],
    perfil_secundario_nombre: dimInfo[sortedMas[1][0]].name,

    // Dominancias
    alta_dominancia: sortedMas[0][0] + ' - ' + dimInfo[sortedMas[0][0]].name,
    baja_dominancia: sortedMas[sortedMas.length-1][0] + ' - ' + dimInfo[sortedMas[sortedMas.length-1][0]].name,

    // Respuestas detalladas
    respuestas: answers.map((a, i) => ({
      grupo: i + 1,
      mas: a.mas !== null ? questions[i].words[a.mas].text : null,
      mas_dimension: a.mas !== null ? questions[i].words[a.mas].dim : null,
      menos: a.menos !== null ? questions[i].words[a.menos].text : null,
      menos_dimension: a.menos !== null ? questions[i].words[a.menos].dim : null
    }))
  };

  console.log('🚀 Enviando datos a Make:', payload);

  fetch(WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors', // Añadimos esto para evitar problemas de CORS comunes en webhooks
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => {
    console.log('✅ Webhook disparado (status:', res.status, ')');
    alert('¡Test completado y enviado a Make con éxito!');
  })
  .catch(err => {
    console.error('❌ Error fatal en Webhook:', err);
    alert('Hubo un error al enviar a Make: ' + err.message);
  });
}

function renderProfileBadge(mas) {
  const sorted = Object.entries(mas).sort((a,b) => b[1]-a[1]);
  const top = sorted[0][0];
  const info = dimInfo[top];
  document.getElementById('profile-badge').innerHTML = `
    <div class="profile-type-letter" style="color:${info.color}">${top}</div>
    <div class="profile-type-name">${info.name}</div>
    <div class="profile-type-desc">${info.desc}</div>`;
}

function renderChart(scores) {
  const data = currentChart === 'mas' ? scores.mas : scores.menos;
  const canvas = document.getElementById('disc-chart');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 600 * dpr; canvas.height = 320 * dpr;
  canvas.style.width = '600px'; canvas.style.height = '320px';
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, 600, 320);

  const dims = ['D','I','S','C'];
  const colors = { D:'#ef4444', I:'#f59e0b', S:'#22c55e', C:'#3b82f6' };
  const maxVal = Math.max(...Object.values(data), 7);
  const barW = 80, gap = 50, startX = (600 - (dims.length * barW + (dims.length-1) * gap)) / 2;
  const chartH = 230, baseY = 280;

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = baseY - (chartH * (i / 4));
    ctx.beginPath(); ctx.moveTo(startX-20, y); ctx.lineTo(startX + dims.length*(barW+gap), y); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '11px Inter';
    ctx.fillText(Math.round(maxVal * i / 4), startX - 35, y + 4);
  }

  dims.forEach((d, i) => {
    const x = startX + i * (barW + gap);
    const val = data[d];
    const h = (val / maxVal) * chartH;

    // Bar with gradient
    const grad = ctx.createLinearGradient(x, baseY - h, x, baseY);
    grad.addColorStop(0, colors[d]); grad.addColorStop(1, colors[d] + '44');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.roundRect(x, baseY - h, barW, h, [8,8,0,0]); ctx.fill();

    // Glow
    ctx.shadowColor = colors[d]; ctx.shadowBlur = 15;
    ctx.fillStyle = colors[d] + '22';
    ctx.beginPath(); ctx.roundRect(x, baseY - h, barW, h, [8,8,0,0]); ctx.fill();
    ctx.shadowBlur = 0;

    // Value label
    ctx.fillStyle = '#fff'; ctx.font = 'bold 16px Space Grotesk'; ctx.textAlign = 'center';
    ctx.fillText(val, x + barW/2, baseY - h - 10);

    // Dimension label
    ctx.fillStyle = colors[d]; ctx.font = 'bold 18px Space Grotesk';
    ctx.fillText(d, x + barW/2, baseY + 22);
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '11px Inter';
    ctx.fillText(dimInfo[d].name, x + barW/2, baseY + 38);
    ctx.textAlign = 'start';
  });
}

function switchChart(type) {
  currentChart = type;
  document.querySelectorAll('.chart-tab').forEach(t => t.classList.toggle('active', t.dataset.chart === type));
  if (window._discScores) renderChart(window._discScores);
}

function renderDimensions(mas) {
  const maxVal = Math.max(...Object.values(mas), 1);
  let html = '';
  ['D','I','S','C'].forEach(d => {
    const info = dimInfo[d];
    const val = mas[d];
    const pct = Math.round((val / 28) * 100);
    const level = val >= maxVal * 0.75 ? 'Alto' : val >= maxVal * 0.4 ? 'Medio' : 'Bajo';
    html += `<div class="dim-card dim-card-${d.toLowerCase()}">
      <div class="dim-top"><span class="dim-letter" style="color:${info.color}">${d}</span><span class="dim-score" style="color:${info.color}">${val}</span></div>
      <div class="dim-name">${info.name}</div>
      <div class="dim-bar-bg"><div class="dim-bar-fill dim-bar-fill-${d.toLowerCase()}" style="width:${pct}%"></div></div>
      <div class="dim-level" style="color:${info.color}">Nivel: ${level}</div>
    </div>`;
  });
  document.getElementById('dimensions-grid').innerHTML = html;
}

function renderDominance(mas) {
  const sorted = Object.entries(mas).sort((a,b) => b[1]-a[1]);
  const highDims = sorted.filter(s => s[1] >= sorted[0][1] * 0.7 && s[1] > 0);
  const lowDims = sorted.filter(s => s[1] <= sorted[sorted.length-1][1] * 1.3 || s[1] === sorted[sorted.length-1][1]);
  // Ensure at least 1 in each
  if (highDims.length === 0) highDims.push(sorted[0]);
  if (lowDims.length === 0) lowDims.push(sorted[sorted.length-1]);

  const renderItems = (dims) => dims.map(([d]) => {
    const info = dimInfo[d];
    return `<div class="dom-item">
      <div class="dom-item-letter" style="color:${info.color};background:${info.bg}">${d}</div>
      <div class="dom-item-text"><span class="dom-item-name">${info.name}</span><span class="dom-item-desc">${info.desc.split('.')[0]}</span></div>
    </div>`;
  }).join('');

  document.getElementById('high-dom-content').innerHTML = renderItems(highDims);
  document.getElementById('low-dom-content').innerHTML = renderItems(lowDims.filter(l => !highDims.find(h => h[0]===l[0])).length ? lowDims.filter(l => !highDims.find(h => h[0]===l[0])) : [sorted[sorted.length-1]]);
}

function renderCharacteristics(mas) {
  const sorted = Object.entries(mas).sort((a,b) => b[1]-a[1]);
  const primary = sorted[0][0];
  const info = dimInfo[primary];
  let html = `<div class="char-block"><h4>Fortalezas Principales</h4><ul>${info.high.map(h=>`<li>${h}</li>`).join('')}</ul></div>`;
  html += `<div class="char-block"><h4>Áreas de Desarrollo</h4><ul>${info.low.map(l=>`<li>${l}</li>`).join('')}</ul></div>`;

  const secondary = sorted[1][0];
  const info2 = dimInfo[secondary];
  html += `<div class="char-block"><h4>Perfil Secundario: ${info2.name}</h4><ul>${info2.high.slice(0,3).map(h=>`<li>${h}</li>`).join('')}</ul></div>`;

  // Environment
  const envMap = { D:"Entornos competitivos con autonomía y retos.", I:"Entornos sociales con interacción y creatividad.", S:"Entornos estables con rutinas claras y equipo.", C:"Entornos estructurados con reglas y análisis." };
  html += `<div class="char-block"><h4>Entorno Ideal</h4><ul><li>${envMap[primary]}</li><li>Complementado por rasgos de ${info2.name}.</li></ul></div>`;
  document.getElementById('chars-grid').innerHTML = html;
}

// ===== DOWNLOAD PDF =====
function downloadResults() {
  const name = document.getElementById('user-name').value.trim();
  const element = document.getElementById('results-screen');
  
  // Clonar para no alterar la vista del usuario
  const opt = {
    margin: [10, 10, 10, 10],
    filename: `Reporte_DISC_${name.replace(/\s+/g,'_')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      backgroundColor: '#0a0a0c',
      logging: false
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Ocultar botones de acción en el PDF
  const actions = document.querySelector('.results-actions');
  actions.style.display = 'none';

  // Generar PDF
  html2pdf().set(opt).from(element).save().then(() => {
    actions.style.display = 'flex'; // Restaurar botones
  });
}

function resetTest() {
  currentQ = 0; answers = []; currentChart = 'mas';
  clearInterval(timerInterval);
  document.getElementById('results-screen').classList.remove('active');
  document.getElementById('welcome-screen').classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ===== TEST WEBHOOK (MOCK DATA) =====
function sendTestData() {
  const dummyScores = {
    mas: { D: 15, I: 8, S: 5, C: 2 },
    menos: { D: 2, I: 4, S: 10, C: 12 }
  };
  
  // Llenamos el nombre y email temporalmente si están vacíos
  const nameEl = document.getElementById('user-name');
  const emailEl = document.getElementById('user-email');
  if (!nameEl.value) nameEl.value = 'Usuario de Prueba';
  if (!emailEl.value) emailEl.value = 'prueba@webhook.com';
  
  alert('Enviando datos de prueba a Make...');
  sendToWebhook(dummyScores);
}
