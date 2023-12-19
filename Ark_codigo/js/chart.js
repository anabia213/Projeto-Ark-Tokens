document.addEventListener("DOMContentLoaded", function () {
  var chartOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true
      },
      toolbar: {
        show: true,
        tools: {
          zoomin: true,
          zoomout: true,
          reset: true
        }
      }
    },
    series: [{
      name: 'Preço do Bitcoin (BRL)',
      data: []
    }],
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/\s/g, '');
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/\s/g, '');
        }
      },
      style: {
        background: getComputedStyle(document.documentElement).getPropertyValue('--color-white') // Define o background da tooltip como "--color-white"
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const date = new Date(w.globals.seriesX[seriesIndex][dataPointIndex]);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        return '<div class="apexcharts-tooltip-title">' + formattedDate + '</div><div class="apexcharts-tooltip-series-group">' + w.globals.seriesNames[seriesIndex] + ':</div><div class="apexcharts-tooltip-series">' + series[seriesIndex][dataPointIndex].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/\s/g, '') + '</div>';
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#3873FF'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#3873FF'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100]
      }
    },
  title: {
    text: 'Bitcoin BTC/BRL',
    align: 'center',
    style: {
      fontFamily: 'Poppins, sans-serif',
      color: getComputedStyle(document.documentElement).getPropertyValue('--color-dark')
    }
  }
};

  var chart = new ApexCharts(document.querySelector("#chart"), chartOptions);

  function getBitcoinPrice() {
    var endDate = new Date(); // Data atual
    var startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000); // Subtrai 24 horas da data atual

    var startTimestamp = Math.floor(startDate.getTime() / 1000);
    var endTimestamp = Math.floor(endDate.getTime() / 1000);

    fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=brl&from=" + startTimestamp + "&to=" + endTimestamp)
      .then(response => response.json())
      .then(data => {
        var bitcoinPrices = data.prices;
        var formattedPrices = bitcoinPrices.map(price => [price[0], parseFloat(price[1])]);
        updateChart(formattedPrices);
      })
      .catch(error => {
        console.log("Ocorreu um erro ao obter a cotação do Bitcoin:", error);
      });
  }

  function updateChart(prices) {
    const formattedPrices = prices.map(price => {
      const date = new Date(price[0]);
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      return { x: price[0], y: price[1], title: formattedDate };
    });

    chart.updateOptions({
      xaxis: {
        type: 'datetime',
        min: null,
        max: null
      },
      chart: {
        type: 'line' // Alterando para um gráfico de linhas
      }
    });
    chart.updateSeries([{
      data: formattedPrices
    }]);
  }

  chart.render();

  getBitcoinPrice(); // Obtém os dados iniciais do Bitcoin

  // Atualiza o preço do Bitcoin a cada 10 segundos
  setInterval(getBitcoinPrice, 10 * 1000);
});
