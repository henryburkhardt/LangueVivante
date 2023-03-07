const colors = [
  "rgb(75, 192, 192)",
  "#8C2981",
  "#A8327C",
  "#DD4968",
  "#F15F5C",
  "#FA7F5D",
  "#FE9E6D",
  "#FDBF84",
  "#FDDEA0",
  "#FCFDBF",
  "#FFFFFF",
];

async function getData() {
  const gram = document.getElementById("input").value;
  fetch("http://localhost:3000/getGram", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userInput: gram }),
  }).then((response) =>
    response
      .json()
      .then((data) => ({
        data: data,
        status: response.status,
      }))
      .then((res) => {
        console.log(res.status, res.data);
        renderData(res.data);
      })
  );
}

function renderData(data) {
  document.getElementById("result").innerHTML = "";
  let htmlOut = "";
  if (data.length > 1) {
    for (let i = 1; i < data.length; i++) {
      let _name;
      if (data[i].ngram.includes("_")) {
        _name = data[i].ngram.substr(0, data[i].ngram.indexOf("_"));
      } else {
        _name = data[i].ngram;
      }
      const element = data[i];
      htmlOut =
        htmlOut +
        `<h4> <span style="width: 15px; height: 15px; margin:auto; display: inline-block; border: 1px solid gray; vertical-align: middle; border-radius: 2px; background: ${colors[i]} "> </span> ${_name}</h4>`;
    }
  } else {
    htmlOut = data[0].ngram;
  }

  // renderChart(data[0]);
  renderMultiChart(data);

  document.getElementById("result").innerHTML = htmlOut;

  return;
}

function renderMultiChart(input) {
  let _datasets = [];
  input.map((x, index) => {
    _datasets.push({
      label: x.ngram.substr(0, x.ngram.lastIndexOf("_")),
      data: x.timeseries,
      fill: false,
      borderColor: colors[index],
      tension: 0.1,
    });
  });
  console.log(_datasets);

  document.getElementById("chartCont").innerHTML = "";
  document.getElementById(
    "chartCont"
  ).innerHTML = `<canvas id="myChart"></canvas>`;

  const ctx = document.getElementById("myChart");

  const data = {
    labels: _datasets[0].data,
    datasets: _datasets,
  };

  const chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

function renderChart(input) {
  const _data = input.timeseries;
  document.getElementById("chartCont").innerHTML = "";
  document.getElementById(
    "chartCont"
  ).innerHTML = `<canvas id="myChart"></canvas>`;

  const ctx = document.getElementById("myChart");

  const data = {
    labels: _data,
    datasets: [
      {
        label: input.ngram,
        data: _data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "xy",
          },
        },
      },
    },
  });
}

var ztxt = new Ztextify(".title", {
  depth: "30px",
  layers: 8,
  fade: true,
  direction: "both",
  event: "pointer",
  eventRotation: "6deg",
});
