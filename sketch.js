let table;
let filteredRows = []
let col0Values = []
let col1Values = []
let col2Values = []
let col3Values = []
let col4Values = []

let average0;
let average1;
let std1;
let mode2;
let median3;
let average4;
let std4;

function preload() {
  table = loadTable("dataset.csv", "csv", "header")
}

// FUNZIONI DI CALCOLO

// funzione media
function calcAvg(arr) {
  if (arr.length === 0) return 0; // evita la divisione per lo 0
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

// funzione per calcolare la deviazione di un array
function calcStD(arr) {
  if (arr.length === 0) return 0;
  let average= calcAvg(arr); 
  let sommaQuad = 0;
  for (let i = 0; i < arr.length; i++) {
    sommaQuad += (arr[i] - average) ** 2;
  }
  let variation = sommaQuad / arr.length;
  return Math.sqrt(variation);
}

// funzione per calcolare la moda
function calcMode(arr) {
  if (arr.length === 0) return null;
  let counts = {}; // conta le occorrenze
  let maxCount = 0;
  let mode = []

// conta le occorrenze di ogni valore
for (let i = 0; i < arr.length; i++) {
  let val = arr[i];
  counts[val] = (counts[val] || 0) + 1;
  if (counts[val] > maxCount) {
    maxCount = counts[val];
 }
}

// trova tutti i valori che hanno il numero massimo di occorrenze
for (let key in counts) {
  if (counts[key] === maxCount) {
    mode.push(key);
  }
}

// se c'è una sola moda restituisce il valore singolo
if (mode.length === 1) return mode[0];
return mode; // sennò ritorna un array di valori moda
}

// funzione per calcolare la mediana
function calcMedian(arr) {
  if (arr.length === 0) return 0; // se l'array è vuoto ridà zero
  let sorted = arr.slice().sort((a, b) => a - b); // ordina senza modificare l'array originale
  let middle = Math.floor(sorted.length / 2);

  if(sorted.length % 2 === 0) {
  // se c'è un numero pari di elementi pari di elementi calcola la media dei due valori centrali
  return (sorted[middle - 1] + sorted [middle]) / 2;
  } else {
  // se invece sono dispari dai il numero centrale
  return sorted[middle];
  }
}

// avg della colonna 0
function drawAverageCol0() {
  let g = createGraphics(500, 350);
  g.background(255, 255, 255, 0);

  let topMargin = 17.5;         // proporzionale da 10 su 200 => 17.5 su 350
  let bottomMargin = 70;        // proporzionale da 40 su 200 => 70 su 350
  let leftMargin = 25;          // proporzionale da 20 su 400 => 25 su 500
  let rightMargin = 25;         // proporzionale da 20 su 400 => 25 su 500

  let chartHeight = g.height - topMargin - bottomMargin;
  let barWidth = (g.width - leftMargin - rightMargin) / col0Values.length;

  let maxVal = Math.max(...col0Values);
  let minVal = Math.min(...col0Values);

  // zeroY verticale per valore 0
  let zeroY = map(0, minVal, maxVal, topMargin, topMargin + chartHeight);

  // disegna le barre
  for (let i = 0; i < col0Values.length; i++) {
    let val = col0Values[i];
    let h = map(val, 0, maxVal, 0, zeroY - topMargin);
    if (val < 0) {
      h = map(val, 0, minVal, 0, topMargin + chartHeight - zeroY);
    }

    let yPos = val >= 0 ? zeroY - h : zeroY;

    g.fill("blue");
    g.noStroke();
    g.rect(leftMargin + i * barWidth, yPos, barWidth - 2, Math.abs(h));
  }

  // linea orizzontale della media
  let avgY = map(average0, minVal, maxVal, topMargin, topMargin + chartHeight);
  g.stroke("blue");
  g.strokeWeight(2);
  g.line(leftMargin, avgY, g.width - rightMargin, avgY);

  // testo descrittivo
  g.noStroke();
  g.fill("#2e3de0");
  g.textAlign(CENTER);
  g.textSize(16);
  g.text("La media della colonna 0 è " + nf(average0, 1, 2), g.width / 2, g.height - 10);

  // inserisce il graphics nella box1
  let cnvImg = createImg(g.canvas.toDataURL(), "Media colonna 0");
  cnvImg.parent("box1");
  cnvImg.style("width", "500px");
  cnvImg.style("height", "350px");
}

// avg della colonna 4
function drawAverageCol4() {
  let g = createGraphics(500, 350);
  g.background(255, 255, 255, 0);

  let topMargin = 17.5;         // proporzionale da 10 su 200 => 17.5 su 350
  let bottomMargin = 70;        // proporzionale da 40 su 200 => 70 su 350
  let leftMargin = 25;          // proporzionale da 20 su 400 => 25 su 500
  let rightMargin = 25;         // proporzionale da 20 su 400 => 25 su 500

  let chartHeight = g.height - topMargin - bottomMargin;
  let barWidth = (g.width - leftMargin - rightMargin) / col4Values.length;

  let maxVal = Math.max(...col4Values);
  let minVal = Math.min(...col4Values);

  // zeroY verticale per valore 0
  let zeroY = map(0, minVal, maxVal, topMargin, topMargin + chartHeight);

  // disegna le barre
  for (let i = 0; i < col4Values.length; i++) {
    let val = col4Values[i];
    let h = map(val, 0, maxVal, 0, zeroY - topMargin);
    if (val < 0) {
      h = map(val, 0, minVal, 0, topMargin + chartHeight - zeroY);
    }

    let yPos = val >= 0 ? zeroY - h : zeroY;

    g.fill("blue");
    g.noStroke();
    g.rect(leftMargin + i * barWidth, yPos, barWidth - 2, Math.abs(h));
  }

  // linea orizzontale della media
  let avgY = map(average4, minVal, maxVal, topMargin, topMargin + chartHeight);
  g.stroke("blue");
  g.strokeWeight(2);
  g.line(leftMargin, avgY, g.width - rightMargin, avgY);

  // testo descrittivo
  g.noStroke();
  g.fill("#2e3de0");
  g.textAlign(CENTER);
  g.textSize(16);
  g.text("La media della colonna 0 è " + nf(average4, 1, 2), g.width / 2, g.height - 10);

  // inserisce il graphics nella box1
  let cnvImg = createImg(g.canvas.toDataURL(), "Media colonna 0");
  cnvImg.parent("box5");
  cnvImg.style("width", "500px");
  cnvImg.style("height", "350px");
}

// moda della colonna 2
function drawModeCol2() {
  let g = createGraphics(500, 350);
  g.clear();
  g.background(255, 255, 255, 0);

  // calcola le occorrenze
  let counts = {};
  for (let v of col2Values) {
    counts[v] = (counts[v] || 0) + 1;
  }
  let total = Object.values(counts).reduce((a, b) => a + b, 0);

  let keys = Object.keys(counts);
  let angles = keys.map(k => (counts[k] / total) * TWO_PI);

  // posizione della torta (pie) verso sinistra
  let pieX = 130;
  let pieY = 120;
  let pieDiameter = 190;

  // disegna la torta
  let lastAngle = 0;
  let colors = ["#2e3de0", "#5c6ee0", "#8a9fe0", "#b7cfee", "#dce6f8", "#aab8f0", "#c5d0f5"];
  g.push();
  g.translate(pieX, pieY);
  for (let i = 0; i < angles.length; i++) {
    g.fill(colors[i % colors.length]);
    g.stroke(255);
    g.strokeWeight(1);
    g.arc(0, 0, pieDiameter, pieDiameter, lastAngle, lastAngle + angles[i], PIE);
    lastAngle += angles[i];
  }
  g.pop();

  // Legenda: distribuisci in colonne dentro il canvas

  let legendAreaX = pieX + pieDiameter / 2 + 20;  // punto iniziale X della legenda
  let legendAreaWidth = g.width - legendAreaX - 10; // spazio a destra residuo
  let legendAreaY = 30;  // margine superiore per la legenda
  let lineHeight = 18;   // altezza per ogni riga legenda (puoi aggiustare)
  let maxRows = Math.floor((g.height - legendAreaY - 20) / lineHeight); 
  // quante righe per colonna possiamo mettere
  let numKeys = keys.length;
  let numCols = Math.ceil(numKeys / maxRows);
  let colWidth = Math.floor(legendAreaWidth / numCols);

  g.textSize(12);
  g.textAlign(LEFT, CENTER);

  for (let i = 0; i < keys.length; i++) {
    let colIdx = Math.floor(i / maxRows);
    let rowIdx = i % maxRows;

    let lx = legendAreaX + colIdx * colWidth;
    let ly = legendAreaY + rowIdx * lineHeight;

    // quadratino colorato
    g.fill(colors[i % colors.length]);
    g.noStroke();
    g.rect(lx, ly - 8, 12, 12);

    // testo
    g.fill("#2e3de0");
    let key = keys[i];
    let cnt = counts[key];
    g.text(`${key} (${cnt})`, lx + 16, ly);
  }

  // titolo in basso
  g.textAlign(CENTER, BOTTOM);
  g.fill("#2e3de0");
  g.textSize(16);
  g.text("Moda colonna 2", g.width / 2, g.height - 10);

  // inserisce il graphics nel box3
  let cnvImg = createImg(g.canvas.toDataURL(), "Moda colonna 2");
  cnvImg.parent("box3");
  cnvImg.style("width", "500px");
  cnvImg.style("height", "350px");
}

function setup() {
// ciclo che si ripete su tutte le righe
  for (let r = 0; r < table.getRowCount(); r++) {
  const col3 = table.getNum(r, 3); // perchè lavoro sulla colonna 3
  const col2 = table.getNum(r, 2); // perchè lavoro sulla colonna 2

  // applico le regole
  if (col3 > 60 && col2 < 0) { // per integrare enrambe le condizioni delle regole
  let rowObj = {}; // crea un oggetto per ogni riga valida 
  for (let c = 0; c < table.getColumnCount(); c++) {
    let colName = table.columns[c]; // nome colonna
    rowObj[colName] = table.get(r, c); // per salvare riga e colonna insieme (riga-colonna)
  }
  filteredRows.push(rowObj);
  } 
}

// estrarre i valori numerici dalle colonne
col0Values = filteredRows.map(row => Number(row.column0));
col1Values = filteredRows.map(row => Number(row.column1));
col2Values = filteredRows.map(row => Number(row.column2));
col3Values = filteredRows.map(row => Number(row.column3));
col4Values = filteredRows.map(row => Number(row.column4));

// f01. calcolo media colonna 0
average0 = calcAvg(col0Values);
console.log("average col0:", average0);

// disegno il grafico nel primo box
drawAverageCol0();

// f02. calcolo media e deviazione standard colonna 1
average1 = calcAvg(col1Values);
std1 = calcStD(col1Values)
console.log("average col1:", average1);
console.log("std col1:", std1);

// f03. calcolo moda colonna 2
mode2 = calcMode(col2Values);
console.log("mode col2:", mode2);

// disegno grafico nel terzo box
drawModeCol2();

// f04. calcolo mediana colonna 3
median3 = calcMedian(col3Values);
console.log("median col3:", median3);

// f05. calcolo media e deviazione standard colonna 4
average4 = calcAvg(col4Values);
std4 = calcStD(col4Values);
console.log("average col4:", average4);
console.log("std col4:", std4);

// disegno il grafico nel quinto box
drawAverageCol4();

} // FINE SETUP


