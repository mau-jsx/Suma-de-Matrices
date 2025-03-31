function generarInputs() {
  const filas = document.getElementById("filas").value;
  const columnas = document.getElementById("columnas").value;
  const contenedor = document.getElementById("matrices");
  contenedor.innerHTML = "";

  if (filas <= 0 || columnas <= 0) {
    alert("Las filas y columnas deben ser mayores a 0");
    return;
  }

  ["Matriz 1", "Matriz 2"].forEach((nombre) => {
    const div = document.createElement("div");
    div.innerHTML = `<h3 class='font-bold mb-2'>${nombre}</h3>`;

    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        div.innerHTML += `<input type='number' class='border w-12 p-1 m-1' id='${nombre.replace(
          " ",
          ""
        )}_${i}_${j}'>`;
      }
      div.innerHTML += "<br>";
    }
    contenedor.appendChild(div);
  });

  document.getElementById("sumarBtn").classList.remove("hidden");
}

function sumarMatrices() {
  const filas = document.getElementById("filas").value;
  const columnas = document.getElementById("columnas").value;
  let matriz1 = [];
  let matriz2 = [];

  for (let i = 0; i < filas; i++) {
    let row1 = [],
      row2 = [];
    for (let j = 0; j < columnas; j++) {
      let val1 = document.getElementById(`Matriz1_${i}_${j}`).value;
      let val2 = document.getElementById(`Matriz2_${i}_${j}`).value;
      if (val1 === "" || val2 === "") {
        alert("Todos los campos deben estar llenos");
        return;
      }
      row1.push(Number(val1));
      row2.push(Number(val2));
    }
    matriz1.push(row1);
    matriz2.push(row2);
  }

  fetch("/sumar_matrices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ matriz1, matriz2 }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        mostrarResultado(data.resultado);
      }
    });
}

function mostrarResultado(matriz) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "<h3 class='font-bold mt-4'>Matriz Resultado:</h3>";
  matriz.forEach((fila) => {
    resultadoDiv.innerHTML +=
      fila
        .map(
          (num) =>
            `<span class='border w-12 p-1 m-1 inline-block text-center'>${num}</span>`
        )
        .join("") + "<br>";
  });
}
