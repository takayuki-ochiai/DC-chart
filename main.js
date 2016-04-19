// TODO 色の配色をJSで定数として持つこと
// TODO inputとoutputの形を決めること
// どこまでサーバー側で返してもらってどこまでフロント側で整形するか

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
  $.get({
    url: "http://private-d67021-chart2.apiary-mock.com/line-charts"
  }).done(
    function(data) {
      //jQueryオブジェクト[0]とすれば、getContext("2D")できる。
      // Chart.jsで作ったグラフをajaxで更新するとcnavasのサイズがおかしくなった
      // http://project-bajitofu.blogspot.jp/2014/08/chartjsretinacnavas.html
      $('#chart1').append('<canvas id="lineChartCanvas"></canvas>');

      var ctx = $('#lineChartCanvas')[0].getContext("2d");
      ctx.canvas.height = "500";
      ctx.canvas.width = "1000";
      var chart = new Chart(ctx).Line(data.lineChartData, data.options);
      //凡例のhtmlを取得して設定
      $('#chart_legend').html(chart.generateLegend());
    }
  ).fail(
    function(data) {
      console.log(data);
    }
  );
});
