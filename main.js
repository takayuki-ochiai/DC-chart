
$(function(){
  $.get({
    url: "http://private-d67021-chart2.apiary-mock.com/line-charts"
  }).done(
    function(data) {
      //jQueryオブジェクト[0]とすれば、getContext("2D")できる。
      // Chart.jsで作ったグラフをajaxで更新するとcnavasのサイズがおかしくなった
      // http://project-bajitofu.blogspot.jp/2014/08/chartjsretinacnavas.html
      var ctx = $('#lineChartCanvas')[0].getContext("2d");
      // ctx.canvas.width = "100px";
      // ctx.canvas.height = "100px";


      var chart = new Chart(ctx, {
        type: 'line',
        data: data.lineChartData,
        options: data.option
      });
      // var chart = new Chart(document.getElementById("lineChartCanvas").getContext("2d")).Line(data.lineChartData, {});
      //凡例のhtmlを取得して設定
      // $('#chart_legend').html(chart.generateLegend());
    }
  ).fail(
    function(data) {
      console.log(data);
    }
  );
});
