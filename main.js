// TODO inputとoutputの形を決めること
// どこまでサーバー側で返してもらってどこまでフロント側で整形するか

var ELTEX = ELTEX || {};

ELTEX.GRAPH_COLOR_PALLET = {
  BLUE:{
    MAIN: "rgba(100,181,246 ,1)",
    SUB: "rgba(144,202,249 ,1)",
    FUZZY: "rgba(187,222,251 ,0.3)"
  },
  PINK: {
    MAIN: "rgba(240,98,146 ,1)",
    SUB: "rgba(244,143,177 ,1)",
    FUZZY: "rgba(248,187,208 ,0.3)",
  },
  GREEN: {
    MAIN: "rgba(129,199,132 ,1)",
    SUB: "rgba(165,214,167 ,1)",
    FUZZY: "rgba(200,230,201 ,0.3)"
  },
  ORANGE: {
    MAIN: "rgba(255,183,77 ,1)",
    SUB: "rgba(255,204,128 ,1)",
    FUZZY: "rgba(255,224,178 ,0.3)"
  },
  BLUE_GREY: {
    MAIN: "rgba(144,164,174 ,1)",
    SUB: "rgba(176,190,197 ,1)",
    FUZZY: "rgba(207,216,220 ,0.3)"
  },
  DEEP_PURPLE: {
    MAIN: "rgba(149,117,205 ,1)",
    SUB: "rgba(179,157,219 ,1)",
    FUZZY: "rgba(209,196,233 ,0.3)"
  }
};

ELTEX.CHART_COLOR = [
  ELTEX.GRAPH_COLOR_PALLET.BLUE,
  ELTEX.GRAPH_COLOR_PALLET.PINK,
  ELTEX.GRAPH_COLOR_PALLET.GREEN,
  ELTEX.GRAPH_COLOR_PALLET.ORANGE,
  ELTEX.GRAPH_COLOR_PALLET.BLUE_GREY,
  ELTEX.GRAPH_COLOR_PALLET.DEEP_PURPLE
];



// urlとparamsを渡す。paramsはオブジェクトの形式で渡される。
// drawの時にurlとparams渡すべきでは？別に直にデータを取得して渡すこともあるだろうし。
// このクラスはChartJS1.1に依存しています。
ELTEX.LineChart = function(id, url, params) {
  this.id = id;
  this.url = url;
  this.params = params;

  // idやurlが不正だった時のパターンの考慮
  this.draw = function() {
    $.get({
      url: url
    }).done(
      function(res) {
        //jQueryオブジェクト[0]とすれば、getContext("2D")できる。
        $('#' + this.id).append('<canvas class="lineChartCanvas"></canvas>');
        $('#' + this.id).append('<div class="chartLegend"></div>');

        var ctx = $('#' + this.id + ' .lineChartCanvas')[0].getContext("2d");
        ctx.canvas.height = "500";
        ctx.canvas.width = "1000";

        // var data = res.lineChartData;
        var data = res.data;
        var options = res.options;

        // X軸のラベルに接尾の文字列を追加
        if (options.xScaleLabel != null) {
          var newLabels = data.labels.map(function(label) {
            return label + xScaleLabel;
          });
          data.labels = newLabels;
        };

        // y軸のラベルに接尾の文字列を追加
        if (options.yScaleLabel != null) {
          options.scaleLabel = "<%=value%>" + options.yScaleLabel;
        };

        // var chart = new Chart(ctx).Line(data, options);
        // // 凡例のhtmlを取得して設定
        // $('#' + this.id + ' .chartLegend').html(chart.generateLegend());
      }
    ).fail(
      function(res) {
        console.log(res);
      }
    );
  };
};

// それができたら次は棒グラフ
// それができたら親クラス


// 配色は点部分を300、線部分を200で実行する
// 背景色は100のrgba表記で透明度0.3
// http://www.designskilz.com/colors/blue

// Labelの数と内容はデータ側の責任なのでサーバー
// 色の種類はデザインの範疇なのでクライアント側の責任
// optionは変えないはずなので、クライアント側に定数で置いておく
// 軸の最大値はどっちの責任だろ
$(function(){
  var lineChart = new ELTEX.LineChart("chart1", "http://private-d67021-chart2.apiary-mock.com/line-charts", {});

  lineChart.draw();
});
