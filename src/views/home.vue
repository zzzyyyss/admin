<template>
  <div class="dy-admin-router-view-div">
    <div class="dy-home-title-div">{{ getTimeState() }} </div>
    <div class="dy-home-title-div-2"> 欢迎使用 {{ this.$project.projectName }}</div>

    <div class="cardView" v-show="isShow">
      <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
        <el-card style="width: 49.9%;margin: 0 10px;" v-show="true">
          <!--饼图：主要用于分析数据的占比，直观看到每一个部分在整体所占的比例，例如展示系统用户的男性和女性用户的占比关系-->
          <div id="chartDiv1" style="width:100%;height:300px;"></div>
        </el-card>
        <el-card style="width: 49.9%;margin: 0 10px;" v-show="true">
          <!--柱状图：主要用于突出数据之间的大小比较，例如展示药品各个种类的个数-->
          <div id="chartDiv2" style="width:100%;height:300px;"></div>
        </el-card>
      </div>
    </div>

    <div class="cardView" v-show="isShow">
      <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
        <el-card style="width: 49.9%;margin: 0 10px;" v-show="true">
          <!--折线图:主要用于显示数据在连续时间上的趋势变化，例如展示每月的订单数 -->
          <div id="chartDiv3" style="width:100%;height:300px;"></div>
        </el-card>
        <el-card style="width: 49.9%;margin: 0 10px;" v-show="true">
          <!--折线面积图:主要用于显示数据在连续时间上的趋势变化，例如展示每天的订单金额 -->
          <div id="chartDiv4" style="width:100%;height:300px;"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
//0
import router from '@/router/router-static'
export default {
  data() {
    return {
      //图形1分类列表及数据列表
      categoryList1: [],
      dataList1: [],

      //图形2分类列表及数据列表
      categoryList2: [],
      dataList2: [],

      //图形3分类列表及数据列表
      categoryList3: [],
      dataList3: [],

      //图形4分类列表及数据列表
      categoryList4: [],
      dataList4: [],

      //是否显示数据图形（只有管理角色才展示）
      isShow: true,
    }
  },
  mounted() {
    this.init();
    //只有管理角色(type==0)的用户才展示各种数据图形
    if (this.$storage.get('type') && this.$storage.get('type') == '0000') {

      this.getChartData1();
      this.getChartData2();
      this.getChartData3();
      this.getChartData4();
      //饼图加载
      this.initPieChart('chartDiv1', '性别', '系统注册用户性别占比', this.dataList1);

      //柱状图加载
      this.initBarChart('chartDiv2', '个数', '商品种类分布', this.categoryList2, this.dataList2);

      //折线图加载
      this.initLineChart('chartDiv3', '订单量(个)', '每月订单量', this.categoryList3, this.dataList3);

      //折线面积图加载
      this.initLineChart('chartDiv4', '订单金额(元)', '每日订单总金额', this.categoryList4, this.dataList4, true);
    } else {
      this.isShow = false;
    }
  },
  methods: {
    init() {
      if (this.$storage.get('Token')) {
        this.$http({
          url: `users/session`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code != 0) {
            router.push({ name: 'login' })
          }
        });
      } else {
        router.push({ name: 'login' })
      }
    },

    getTimeState() {
      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 设置默认文字
      let state = ``;
      // 判断当前时间段
      if (hours >= 6 && hours <= 8) {
        state = `🌞 Hi,早上好,又是崭新的一天,打工人,要加油哦^_^`;
      } else if (hours > 8 && hours <= 11) {
        state = `🌞 Hi,上午好,忙起来也不要忘了多喝水^_^`;
      } else if (hours > 11 && hours <= 13) {
        state = `🌼 Hi,中午好,干饭人干饭魂，干完饭记得眯一小会儿，不然下午会神游哦^_^`;
      } else if (hours > 13 && hours <= 17) {
        state = `🌼 Hi,下午好,打起精神,搬砖干活时间就是过得快^_^`;
      } else if (hours > 17 && hours <= 22) {
        state = `😴 Hi,晚上好,忙完了一天,该放下手机,电脑,好好休息下了^_^`;
      } else {
        state = `😴 Hi,夜猫子好,熬最晚的夜,敷最贵的膜,夜猫子再有精神也要早点休息哦^_^`;
      }
      return state;
    },

    //获取图形1的统计数据
    getChartData1() {
      //调用接口获取系统注册用户的性别占比
      this.$http({
        //格式  {表名}/selectCountGroup/父表表名/父表列/要分组统计的字段
        url: `users/selectCountGroup/xingbie`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code == 0 && data.data) {
          for (var i = 0; i < data.data.length; i++) {
            var map = data.data[i];
            let item = { value: map.total, name: map.category };
            this.dataList1.push(item);
          }
        }
      });
    },
    //获取图形2的统计数据
    getChartData2() {
      //调用接口获取各种类型的商品数量分布(关联父表 count)
      this.$http({
        //格式  {表名}/selectCountGroupByFatherId/父表表名/父表列字段/父表第二列字段
        url: `shangpin/selectCountGroupByFatherId/zhonglei/zhongleiid/mingcheng`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code == 0 && data.data) {
          for (var i = 0; i < data.data.length; i++) {
            var map = data.data[i];
            this.categoryList2.push(map.category);
            this.dataList2.push(map.total);
          }
        }
      });
    },
    //获取图形3的统计数据
    getChartData3() {
      //调用接口获取每月订单的订单量数据(count)
      this.$http({
        //格式  {表名}/selectCountGroupByDate/日期或时间字段/日期格式（yy:年、mm:月、dd:日）
        url: `dingdan/selectCountGroupByDate/shijian/mm`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code == 0 && data.data) {
          for (var i = 0; i < data.data.length; i++) {
            var map = data.data[i];
            this.categoryList3.push(map.category);
            this.dataList3.push(map.total);
          }
        }
      });
    },
    //获取图形4的统计数据
    getChartData4() {
      //调用接口获取每天订单的订单金额数据(sum)
      this.$http({
        //格式  {表名}/selectSumGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
        url: `dingdan/selectSumGroupByDate/shijian/jine/dd`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code == 0 && data.data) {
          for (var i = 0; i < data.data.length; i++) {
            var map = data.data[i];
            this.categoryList4.push(map.category);
            this.dataList4.push(map.total);
          }
        }
      });
    },
    //加载折线（面积）图
    initLineChart(initId, lable, text, xData, data, isAreaChart) {
      // 初始化echarts实例
      var lineChart = this.$echarts.init(document.getElementById(initId), 'vintage');
      lineChart.showLoading();
      setTimeout(() => {
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: text,
            left: 'center',
            // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'center',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'top',
            // itemGap设置主副标题纵向间隔，单位px，默认为10，
            itemGap: 10,
            backgroundColor: '#EEE',
            // 主标题文本样式设置
            textStyle: {
              fontSize: 26,
              fontWeight: 'bolder',
              color: '#000080'
            },
            // 副标题文本样式设置
            subtextStyle: {
              fontSize: 14,
              color: '#8B2323'
            }
          },
          tooltip: {
            trigger: "axis"
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xData,
          },
          yAxis: [
            {
              type: "value",
              name: lable,
              // minInterval: 500,//设置最小间距跨度
            },
          ],
          series: [
            {
              name: lable,
              type: "line",
              data: data,
              yAxisIndex: 0,
              areaStyle: isAreaChart ? {} : null,
              lineStyle: { // 设置线条的style等
                normal: {
                  color: '#8B2323', // 折线线条颜色:红色
                },
              },
              smooth: true,
            },
          ]
        };
        //使用刚指定的配置项和数据显示图表。
        lineChart.hideLoading();
        lineChart.setOption(option);
        //根据窗口的大小变动图表
        window.onresize = function () {
          lineChart.resize();
        };
      }, 1000);
    },
    //加载饼图
    initPieChart(initId, lable, text, data) {
      // 初始化echarts实例
      var pieChart = this.$echarts.init(document.getElementById(initId), 'vintage');
      pieChart.showLoading();
      setTimeout(() => {
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: text,
            // subtext: '用户性别占比',
            left: 'center',
            // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'center',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'top',
            // itemGap设置主副标题纵向间隔，单位px，默认为10，
            itemGap: 10,
            backgroundColor: '#EEE',
            // 主标题文本样式设置
            textStyle: {
              fontSize: 26,
              fontWeight: 'bolder',
              color: '#000080'
            },
            // 副标题文本样式设置
            subtextStyle: {
              fontSize: 18,
              color: '#999999'

            }
          },
          color: ['#4662A1', '#8B2323', '#c101c1', '#FCCE10', '#E87C25', '#27727B'],
          //提示框设置
          tooltip: {
            // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
            trigger: 'item',
            showDelay: 20,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
            hideDelay: 20,   // 隐藏延迟，单位ms
            backgroundColor: '#333',  // 提示框背景颜色
            textStyle: {
              fontSize: '16px',
              color: '#FFF'  // 设置文本颜色 默认#FFF
            },
            // formatter设置提示框显示内容
            // {a}指series.name  {b}指series.data的name
            // {c}指series.data的value  {d}%指这一部分占总数的百分比
            formatter: '{a} <br/>{b} : {c}个; 占比{d}%'
          },
          //图例设置
          legend: {
            orient: 'horizontal', // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'center',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'bottom',
            itemWidth: 24,   // 设置图例图形的宽
            itemHeight: 18,  // 设置图例图形的高
            textStyle: {
              color: '#666'  // 图例文字颜色
            },
            // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
            itemGap: 30,
            backgroundColor: '#eee',  // 设置整个图例区域背景颜色
          },
          //数据图形设置
          series: [
            {
              name: lable,
              type: 'pie', //饼图
              radius: ['40%', '70%'],
              // radius: '50%',
              data: data,
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: ''
              },
              // emphasis: {
              //   label: {
              //     show: true,
              //     fontSize: 40,
              //     fontWeight: 'bold'
              //   }
              // },
              labelLine: {
                show: false
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
            }
          ]
        };
        //使用刚指定的配置项和数据显示图表。
        pieChart.hideLoading();
        pieChart.setOption(option);
        //根据窗口的大小变动图表
        window.onresize = function () {
          pieChart.resize();
        };

      }, 1000);
    },
    //加载柱状图
    initBarChart(initId, lable, text, xData, data, yName) {
      // 初始化echarts实例
      var barChart = this.$echarts.init(document.getElementById(initId), 'vintage');
      var colorList = ['#4662A1', '#8B2323', '#c101c1', '#FCCE10', '#E87C25', '#27727B', '#D7504B'];
      barChart.showLoading();
      setTimeout(() => {
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: text, // 主标题
            backgroundColor: '#EEE',
            // 主标题文本样式设置
            textStyle: {
              fontSize: 26,
              fontWeight: 'bolder',
              color: '#000080'
            },
            // itemGap设置主副标题之间的纵向间距，单位px，默认为10
            itemGap: 4,
            // top指title组件离容器上侧的距离，取值可为具体像素如20, 也可为百分比如'20%', 也可以是'top', 'middle', 'bottom'
            top: 4,
            // left指title组件离容器左侧的距离，取值可为具体像素如20, 也可为百分比如'20%', 也可以是'left', 'center', 'right'
            left: '50%',
            // textAlign指主副标题水平对齐方式，默认左对齐，可选值：'auto'、'left'、'right'、'center'
            textAlign: 'center',
          },
          //提示框设置
          tooltip: {
            // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
            trigger: 'item',
            textStyle: {
              fontSize: '16px',
              color: '#FFF'  // 设置文本颜色 默认#FFF
            },
            // formatter设置提示框显示内容
            // {a}指series.name  {b}指series.data的name
            // {c}指series.data的value  
            formatter: '{a}<br>{b} : {c}个',
          },
          xAxis: {
            type: 'category',
            data: xData,
          },
          yAxis: {
            type: 'value',
            name: yName,
            minInterval: 1,//设置最小间距跨度
          },
          series: [
            {
              name: lable,
              data: data,
              type: 'bar',
              itemStyle: {
                normal: {
                  // 配置柱状图的颜色
                  color: function (params) {
                    return colorList[params.dataIndex]
                  },
                },
              },
              label: {
                show: true,//是否显示标签
                position: 'top', //标签位置
                rotate: 0,//标签旋转。从 -90 度到 90 度。正值是逆时针
                color: function (params) {
                  return colorList[params.dataIndex]
                }, // 文字颜色
                fontStyle: 'italic', // 文字字体风格。可选：'normal', 'italic', 'oblique'
                fontWeight: 'bold', // 文字字体粗细
                fontSize: 18, // 文字字体大小
              },
            }
          ],
        };
        //使用刚指定的配置项和数据显示图表。
        barChart.hideLoading();
        barChart.setOption(option);
        //根据窗口的大小变动图表
        window.onresize = function () {
          barChart.resize();
        };

      }, 1000);
    },
  }
};
</script>
<style lang="scss" scoped>
.cardView {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
