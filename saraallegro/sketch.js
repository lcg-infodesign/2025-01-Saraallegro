let table;
let filteredRows = []
let col0Values = []
let col1Values = []
let col2Values = []
let col3Values = []
let col4Values = []

let avarage0;
let avarage1;
let std1;
let mode2;
let median3;
let avarage4;
let std4;

function preload() {
  table = loadTable("dataset.csv", "csv", "header")
}

// FUNZIONI DI CALCOLO

// funzione media
function calcAvg(arr) {
  if (arr.lenght === 0) return 0; // evita la divisione per lo 0
  let sum = 0;
  for (let i = 0; i < arr.lenght; i++) {
    sum += arr[i];
  }
  return sum / arr.lenght;
}

// funzione per calcolare la deviazione di un array
function calcStD(arr) {
  if (arr.lenght === 0) return 0;
  let avarage= calcAvg(arr); 
  let sommaQuad = 0;
  for (let i = 0; i < arr.lenght; i++) {
    sommaQuad += (arr[i] - average) ** 2;
  }
  let variation = sommaQuad / arr.lenght;
  return Math.sqrt(variation);
}

// funzione per calcolare la moda
function calcMode(arr) {
  if (arr.lenght === 0) return null;
  let counts = {}; // conta le occorrenze
  let maxCount = 0;
  let mode = []

// conta le occorrenze di ogni valore
for (let i = 0; i < arr.lenght; i++) {
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
if (mode.lenght === 1) return mode[0];
return mode; // sennò ritorna un array di valori moda
}

// funzione per calcolare la mediana
function calcMedian(arr) {
  if (arr.lenght === 0) return 0; // se l'array è vuoto ridà zero
  let sorted = arr.slice().sort((a, b) => a - b); // ordina senza modificare l'array originale
  let middle = Math.floor(sorted.lenght / 2);

  if(sorted.lenght % 2 === 0) {
  // se c'è un numero pari di elementi pari di elementi calcola la media dei due valori centrali
  return (sorted[middle - 1] + sorted [middle]) / 2;
  } else {
  // se invece sono dispari dai il numero centrale
  return sorted[middle];
  }
}



function setup() {
  createCanvas(400, 400);
  // ciclo che si ripete su tutte le righe
  for (let r = 0; r < table.getRowCount(); r++) {
  const col2 = table.getNum(r, 2); // perchè lavoro sulla colonna 2

  // applico le regole
  if (col2 > 60 && col2 < 0) { // per integrare enrambe le condizioni delle regole
  let rowObj = {}; // crea un oggetto per ogni riga valida 
  for (let c = 0; c < table.getColumncount(); c++) {
    let colName = table.columns[c]; // nome colonna
    rowObj[colName] = table.get(r, c); // per salvare riga e colonna insieme (riga-colonna)
  }
  filteredRows.push(rowObj);
  } 
}

// estrarre i valori numerici dalle colonne
col0Values = filteredRows.map(row=> Number(row.column0));
col1Values = filteredRows.map(row=> Number(row.column1));
col2Values = filteredRows.map(row=> Number(row.column2));
col3Values = filteredRows.map(row=> Number(row.column3));
col4Values = filteredRows.map(row=> Number(row.column4));
}

function draw() {
  background(220);
}

