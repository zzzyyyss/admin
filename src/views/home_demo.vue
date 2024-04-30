<template>
  <div class="dy-admin-router-view-div">
    <div class="dy-home-title-div">{{ getTimeState() }} </div>
    <div class="dy-home-title-div-2"> 欢迎使用 {{ this.$project.projectName }}</div>

          <!--数量统计-直接显示数值-->
      <!--柱状图：主要用于分析数据的数值大小-->
      <div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 0 10px;" v-show="true">
            <div id="chartDivsp1" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>

      <!--折线图：主要用于突出数值大小及数值的时间走势-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">

            <div id="chartDivsp2" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--饼图：主要用于突出数据之间的大小比较，及所占比例-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivsp3" style="width:100%;height:350px;"></div>
          </el-card>
      </div>
      </div>-->
      <!--柱状图：主要用于分析数据的数值大小-->
      <div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 0 10px;" v-show="true">
            <div id="chartDivsp4" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>
      <!--折线图：主要用于突出数值大小及数值的时间走势-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivsp5" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->

      <!--饼图：主要用于突出数据之间的大小比较，及所占比例-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivsp6" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->

      <div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivdde8" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>
      <!--饼图：主要用于突出数据之间的大小比较，及所占比例-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivdde9" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->


      <!--订单数量统计-->
      <!--柱状图：主要用于分析数据的数值大小-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 0 10px;" v-show="true">
            <div id="chartDivddl1" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--折线图：主要用于突出数值大小及数值的时间走势-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivddl2" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--饼图：主要用于突出数据之间的大小比较，及所占比例-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivddl3" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--柱状图：主要用于分析数据的数值大小-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 0 10px;" v-show="true">
            <div id="chartDivddl4" style="width:100%;height:350px;"></div>
          </el-card>

        </div>
      </div>-->
      <!--折线图：主要用于突出数值大小及数值的时间走势-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivddl5" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--饼图：主要用于突出数据之间的大小比较，及所占比例-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivddl6" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--柱状图：主要用于分析数据的数值大小-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 0 10px;" v-show="true">
            <div id="chartDivddl7" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--折线图：主要用于突出数值大小及数值的时间走势-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivddl8" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--饼图：主要用于突出数据之间的大小比较，及所占比例-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivddl9" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->



      <!--收藏量统计-->
      <!--柱状图：主要用于分析数据的数值大小-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 0 10px;" v-show="true">
            <div id="chartDivss1" style="width:100%;height:350px;"></div>
          </el-card>

        </div>
      </div>-->
      <!--折线图：主要用于突出数值大小及数值的时间走势-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivss2" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--饼图：主要用于突出数据之间的大小比较，及所占比例-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivss3" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--柱状图：主要用于分析数据的数值大小-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 0 10px;" v-show="true">
            <div id="chartDivss4" style="width:100%;height:350px;"></div>
          </el-card>

        </div>
      </div>-->
      <!--折线图：主要用于突出数值大小及数值的时间走势-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivss5" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--饼图：主要用于突出数据之间的大小比较，及所占比例-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivss6" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--柱状图：主要用于分析数据的数值大小-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 0 10px;" v-show="true">
            <div id="chartDivss7" style="width:100%;height:350px;"></div>
          </el-card>

        </div>
      </div>-->
      <!--折线图：主要用于突出数值大小及数值的时间走势-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivss8" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->
      <!--饼图：主要用于突出数据之间的大小比较，及所占比例-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivss9" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->



      <!--父表分类分布统计-->
      <!--饼图：主要用于突出数据之间的大小比较，及所占比例-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 20px 10px;" v-show="true">
            <div id="chartDivspzl1" style="width:100%;height:350px;"></div>
          </el-card>
        </div>
      </div>-->


      <!--一排两个布局预留-->
      <!--<div class="cardView" v-show="isShow">
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
          <el-card style="width: 100%;margin: 0 10px;" v-show="true">
            <div id="chartDiv1" style="width:100%;height:350px;"></div>
          </el-card>
          <el-card style="width: 49.9%;margin: 0 10px;" v-show="true">
            <div id="chartDiv2" style="width:100%;height:300px;"></div>
          </el-card>
        </div>
      </div>-->

  </div>
</template>
<script>
import router from '@/router/router-static'
export default {
  data() {
    return {
        //图形1数量列表及数据列表
        categoryListsp1: [],
        dataListsp1: [],

        categoryListsp2: [],
        dataListsp2: [],

        categoryListsp3: [],
        dataListsp3: [],

        categoryListsp4: [],
        dataListsp4: [],

        categoryListsp5: [],
        dataListsp5: [],

        categoryListsp6: [],
        dataListsp6: [],



        categoryListdde1: [],
        dataListdde1: [],

        categoryListdde2: [],
        dataListdde2: [],

        categoryListdde3: [],
        dataListdde3: [],

        categoryListdde4: [],
        dataListdde4: [],

        categoryListdde5: [],
        dataListdde5: [],

        categoryListdde6: [],
        dataListdde6: [],

        categoryListdde7: [],
        dataListdde7: [],

        categoryListdde8: [],
        dataListdde8: [],

        categoryListdde9: [],
        dataListdde9: [],


        categoryListddl1: [],
        dataListddl1: [],

        categoryListddl2: [],
        dataListddl2: [],

        categoryListddl3: [],
        dataListddl3: [],

        categoryListddl4: [],
        dataListddl4: [],

        categoryListddl5: [],
        dataListddl5: [],

        categoryListddl6: [],
        dataListddl6: [],

        categoryListddl7: [],
        dataListddl7: [],

        categoryListddl8: [],
        dataListddl8: [],

        categoryListddl9: [],
        dataListddl9: [],


        categoryListss1: [],
        dataListss1: [],

        categoryListss2: [],
        dataListss2: [],

        categoryListss3: [],
        dataListss3: [],

        categoryListss4: [],
        dataListss4: [],

        categoryListss5: [],
        dataListss5: [],

        categoryListss6: [],
        dataListss6: [],

        categoryListss7: [],
        dataListss7: [],

        categoryListss8: [],
        dataListss8: [],

        categoryListss9: [],
        dataListss9: [],


        categoryListu1: [],
        dataListu1: [],



        //categoryListspzl1: [],
        //dataListspzl1: [],

      //是否显示数据图形（只有管理角色才展示）
      isShow: true,
    }
  },
  mounted() {
    this.init();
    //只有管理角色(type==0)的用户才展示各种数据图形
    if (this.$storage.get('type') && this.$storage.get('type') == '0000') {

        this.getChartDatasp1();
        this.getChartDatasp2();
        this.getChartDatasp3();
        this.getChartDatasp4();
        this.getChartDatasp5();
        this.getChartDatasp6();

        this.getChartDatadde1();
        this.getChartDatadde2();
        this.getChartDatadde3();
        this.getChartDatadde4();
        this.getChartDatadde5();
        this.getChartDatadde6();
        this.getChartDatadde7();
        this.getChartDatadde8();
        this.getChartDatadde9();

        this.getChartDataddl1();
        this.getChartDataddl2();
        this.getChartDataddl3();
        this.getChartDataddl4();
        this.getChartDataddl5();
        this.getChartDataddl6();
        this.getChartDataddl7();
        this.getChartDataddl8();
        this.getChartDataddl9();

        this.getChartDatass1();
        this.getChartDatass2();
        this.getChartDatass3();
        this.getChartDatass4();
        this.getChartDatass5();
        this.getChartDatass6();
        this.getChartDatass7();
        this.getChartDatass8();
        this.getChartDatass9();

        this.getChartDatau1();
        //this.getChartDataspzl1();



        //柱状图加载
        this.initBarChart('chartDivsp1', '销量', '商品销量统计图', this.categoryListsp1, this.dataListsp1);

        //折线图加载
        this.initLineChart('chartDivsp2', '销量', '商品销量统计图', this.categoryListsp2, this.dataListsp2);

        //饼图加载
        this.initPieChart('chartDivsp3', '销量', '商品销量统计图', this.dataListsp3);

        //柱状图加载
        this.initBarChart('chartDivsp4', '库存数量', '商品库存统计图', this.categoryListsp4, this.dataListsp4);

        //折线图加载
        this.initLineChart('chartDivsp5', '库存数量', '商品库存统计图', this.categoryListsp5, this.dataListsp5);

        //饼图加载
        this.initPieChart('chartDivsp6', '销量', '商品库存统计图', this.dataListsp6);




        //柱状图加载
        this.initBarChart('chartDivdde1', '金额', '每年销售额统计图', this.categoryListdde1, this.dataListdde1);

        //折线图加载
        this.initLineChart('chartDivdde2', '金额', '每年销售额统计图', this.categoryListdde2, this.dataListdde2);

        //饼图加载
        this.initPieChart('chartDivdde3', '金额', '每年销售额统计图', this.dataListdde3);

        //柱状图加载
        this.initBarChart('chartDivdde4', '金额', '每月销售额统计图', this.categoryListdde4, this.dataListdde4);

        //折线图加载
        this.initLineChart('chartDivdde5', '金额', '每月销售额统计图', this.categoryListdde5, this.dataListdde5);

        //饼图加载
        this.initPieChart('chartDivdde6', '金额', '每月销售额统计图', this.dataListdde6);

        //柱状图加载
        this.initBarChart('chartDivdde7', '金额', '每日销售额统计图', this.categoryListdde7, this.dataListdde7);

        //折线图加载
        this.initLineChart('chartDivdde8', '金额', '每日销售额统计图', this.categoryListdde8, this.dataListdde8);

        //饼图加载
        this.initPieChart('chartDivdde9', '金额', '每日销售额统计图', this.dataListdde9);



        //柱状图加载
        this.initBarChart('chartDivddl1', '订单量', '每年订单量统计图', this.categoryListddl1, this.dataListddl1);

        //折线图加载
        this.initLineChart('chartDivddl2', '订单量', '每年订单量统计图', this.categoryListddl2, this.dataListddl2);

        //饼图加载
        this.initPieChart('chartDivddl3', '订单量', '每年订单量统计图', this.dataListddl3);

        //柱状图加载
        this.initBarChart('chartDivddl4', '订单量', '每月订单量统计图', this.categoryListddl4, this.dataListddl4);

        //折线图加载
        this.initLineChart('chartDivddl5', '订单量', '每月订单量统计图', this.categoryListddl5, this.dataListddl5);

        //每月订单量统计图
        this.initPieChart('chartDivddl6', '订单量', '每月订单量统计图', this.dataListddl6);

        //柱状图加载
        this.initBarChart('chartDivddl7', '订单量', '每日订单量统计图', this.categoryListddl7, this.dataListddl7);

        //折线图加载
        this.initLineChart('chartDivddl8', '订单量', '每日订单量统计图', this.categoryListddl8, this.dataListddl8);

        //饼图加载
        this.initPieChart('chartDivddl9', '订单量', '每日订单量统计图', this.dataListddl9);



        //柱状图加载
        this.initBarChart('chartDivss1', '收藏量', '每年收藏量统计图', this.categoryListss1, this.dataListss1);

        //折线图加载
        this.initLineChart('chartDivss2', '收藏量', '每年收藏量统计图', this.categoryListss2, this.dataListss2);

        //饼图加载
        this.initPieChart('chartDivss3', '收藏量', '每年收藏量统计图', this.dataListss3);

        //柱状图加载
        this.initBarChart('chartDivss4', '收藏量', '每月收藏量统计图', this.categoryListss4, this.dataListss4);

        //折线图加载
        this.initLineChart('chartDivss5', '收藏量', '每月收藏量统计图', this.categoryListss5, this.dataListss5);

        //饼图加载
        this.initPieChart('chartDivss6', '收藏量', '每月收藏量统计图', this.dataListss6);

        //柱状图加载
        this.initBarChart('chartDivss7', '收藏量', '每日收藏量统计图', this.categoryListss7, this.dataListss7);

        //折线图加载
        this.initLineChart('chartDivss8', '收藏量', '每日收藏量统计图', this.categoryListss8, this.dataListss8);

        //饼图加载
        this.initPieChart('chartDivss9', '收藏量', '每日收藏量统计图', this.dataListss9);

        //饼图加载
        this.initPieChart('chartDivu1', '性别', '系统注册用户性别占比', this.dataListu1);

      //饼图加载
        //this.initPieChart('chartDivspzl1', '数量', '商品种类分布统计图', this.dataListspzl1);

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
      getChartDatasp1() {
      //调用接口获取系统注册用户的性别占比
      this.$http({
        //格式  {表名}/selectCountGroup/父表表名/父表列/要分组统计的字段
          url: `shangpin/search`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code == 0 && data.data) {
          for (var i = 0; i < data.data.length; i++) {
            var map = data.data[i];
              this.categoryListsp1.push(map.mingcheng);
              this.dataListsp1.push(map.xiaoshoushuliang);
          }
        }
      });
    },
    //获取图形2的统计数据
      getChartDatasp2() {
      //调用接口获取各种类型的商品数量分布(关联父表 count)
      this.$http({
        //格式  {表名}/selectCountGroupByFatherId/父表表名/父表列字段/父表第二列字段
          url: `shangpin/search`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code == 0 && data.data) {
          for (var i = 0; i < data.data.length; i++) {
            var map = data.data[i];
              this.categoryListsp2.push(map.mingcheng);
              this.dataListsp2.push(map.xiaoshoushuliang);
          }
        }
      });
    },
    //获取图形3的统计数据
      getChartDatasp3() {
      //调用接口获取每月订单的订单量数据(count)
      this.$http({
        //格式  {表名}/selectCountGroupByDate/日期或时间字段/日期格式（yy:年、mm:月、dd:日）
          url: `shangpin/search`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code == 0 && data.data) {
          for (var i = 0; i < data.data.length; i++) {
            var map = data.data[i];
              let item = { value: map.xiaoshoushuliang, name: map.mingcheng };
              this.dataListsp3.push(item);
            }
          }
        });
      },
      //获取图形4的统计数据
      getChartDatasp4() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectSumGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `shangpin/search`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListsp4.push(map.mingcheng);
              this.dataListsp4.push(map.kucunshuliang);
          }
        }
      });
    },

      //获取图形4的统计数据
      getChartDatasp5() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectSumGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `shangpin/search`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListsp5.push(map.mingcheng);
              this.dataListsp5.push(map.kucunshuliang);
            }
          }
        });
      },

    //获取图形4的统计数据
      getChartDatasp6() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectSumGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `shangpin/search`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.kucunshuliang, name: map.mingcheng };
              this.dataListsp6.push(item);
            }
          }
        });
      },



      //柱状图
      getChartDatadde1() {
        //调用接口获取系统注册用户的性别占比
        this.$http({
          //格式  {表名}/selectCountGroup/父表表名/父表列/要分组统计的字段
          url: `dingdan/selectSumGroupByDate/shijian/jine/yy`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListdde1.push(map.category);
              this.dataListdde1.push(map.total);
            }
          }
        });
      },
      //折线图
      getChartDatadde2() {
        //调用接口获取各种类型的商品数量分布(关联父表 count)
        this.$http({
          //格式  {表名}/selectCountGroupByFatherId/父表表名/父表列字段/父表第二列字段
          url: `dingdan/selectSumGroupByDate/shijian/jine/yy`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListdde2.push(map.category);
              this.dataListdde2.push(map.total);
            }
          }
        });
      },
      //饼状图
      getChartDatadde3() {
        //调用接口获取每月订单的订单量数据(count)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectSumGroupByDate/shijian/jine/yy`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.total, name: map.category };
              this.dataListdde3.push(item);
            }
          }
        });
      },
      //柱状图
      getChartDatadde4() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectSumGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectSumGroupByDate/shijian/jine/mm`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListdde4.push(map.category);
              this.dataListdde4.push(map.total);
            }
          }
        });
      },
      //折线图
      getChartDatadde5() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectSumGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectSumGroupByDate/shijian/jine/mm`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListdde5.push(map.category);
              this.dataListdde5.push(map.total);
            }
          }
        });
      },
      //饼状图
      getChartDatadde6() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectSumGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectSumGroupByDate/shijian/jine/mm`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.total, name: map.category };
              this.dataListdde6.push(item);
            }
          }
        });
      },

      //柱状图
      getChartDatadde7() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectSumGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectSumGroupByDate/shijian/jine/dd`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListdde7.push(map.category);
              this.dataListdde7.push(map.total);
            }
          }
        });
      },
      //折线图
      getChartDatadde8() {
      //调用接口获取每天订单的订单金额数据(sum)
      this.$http({
        //格式  {表名}/selectSumGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
        url: `dingdan/selectSumGroupByDate/shijian/jine/dd`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code == 0 && data.data) {
          for (var i = 0; i < data.data.length; i++) {
            var map = data.data[i];
              this.categoryListdde8.push(map.category);
              this.dataListdde8.push(map.total);
            }
          }
        });
      },
      //饼状图
      getChartDatadde9() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectSumGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectSumGroupByDate/shijian/jine/dd`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.total, name: map.category };
              this.dataListdde9.push(item);
            }
          }
        });
      },




      //柱状图
      getChartDataddl1() {
        //调用接口获取系统注册用户的性别占比
        this.$http({
          //格式  {表名}/selectCountGroup/父表表名/父表列/要分组统计的字段
          url: `dingdan/selectCountGroupByDate/shijian/yy`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListddl1.push(map.category);
              this.dataListddl1.push(map.total);
            }
          }
        });
      },
      //折线图
      getChartDataddl2() {
        //调用接口获取各种类型的商品数量分布(关联父表 count)
        this.$http({
          //格式  {表名}/selectCountGroupByFatherId/父表表名/父表列字段/父表第二列字段
          url: `dingdan/selectCountGroupByDate/shijian/yy`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListddl2.push(map.category);
              this.dataListddl2.push(map.total);
            }
          }
        });
      },
      //饼状图
      getChartDataddl3() {
        //调用接口获取每月订单的订单量数据(count)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/yy`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.total, name: map.category };
              this.dataListddl3.push(item);
            }
          }
        });
      },
      //柱状图
      getChartDataddl4() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/mm`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListddl4.push(map.category);
              this.dataListddl4.push(map.total);
            }
          }
        });
      },
      //折线图
      getChartDataddl5() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/mm`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListddl5.push(map.category);
              this.dataListddl5.push(map.total);
            }
          }
        });
      },
      //饼状图
      getChartDataddl6() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/mm`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.total, name: map.category };
              this.dataListddl6.push(item);
            }
          }
        });
      },

      //柱状图
      getChartDataddl7() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/dd`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListddl7.push(map.category);
              this.dataListddl7.push(map.total);
            }
          }
        });
      },
      //折线图
      getChartDataddl8() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/dd`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListddl8.push(map.category);
              this.dataListddl8.push(map.total);
            }
          }
        });
      },
      //饼状图
      getChartDataddl9() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/dd`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.total, name: map.category };
              this.dataListddl9.push(item);
            }
          }
        });
      },




      //柱状图
      getChartDatass1() {
        //调用接口获取系统注册用户的性别占比
        this.$http({
          //格式  {表名}/selectCountGroup/父表表名/父表列/要分组统计的字段
          url: `dingdan/selectCountGroupByDate/shijian/yy`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListss1.push(map.category);
              this.dataListss1.push(map.total);
            }
          }
        });
      },
      //折线图
      getChartDatass2() {
        //调用接口获取各种类型的商品数量分布(关联父表 count)
        this.$http({
          //格式  {表名}/selectCountGroupByFatherId/父表表名/父表列字段/父表第二列字段
          url: `dingdan/selectCountGroupByDate/shijian/yy`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListss2.push(map.category);
              this.dataListss2.push(map.total);
            }
          }
        });
      },
      //饼状图
      getChartDatass3() {
        //调用接口获取每月订单的订单量数据(count)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/yy`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.total, name: map.category };
              this.dataListss3.push(item);
            }
          }
        });
      },
      //柱状图
      getChartDatass4() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/mm`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListss4.push(map.category);
              this.dataListss4.push(map.total);
            }
          }
        });
      },
      //折线图
      getChartDatass5() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/mm`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListss5.push(map.category);
              this.dataListss5.push(map.total);
            }
          }
        });
      },
      //饼状图
      getChartDatass6() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/mm`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.total, name: map.category };
              this.dataListss6.push(item);
            }
          }
        });
      },

      //柱状图
      getChartDatass7() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/dd`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListss7.push(map.category);
              this.dataListss7.push(map.total);
            }
          }
        });
      },
      //折线图
      getChartDatass8() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/dd`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListss8.push(map.category);
              this.dataListss8.push(map.total);
          }
        }
      });
    },
      //饼状图
      getChartDatass9() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `dingdan/selectCountGroupByDate/shijian/dd`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.total, name: map.category };
              this.dataListss9.push(item);
            }
          }
        });
      },

      //饼状图 无法显示父表名称注释
      getChartDataspzl1() {
        //调用接口获取每天订单的订单金额数据(sum)
        this.$http({
          //格式  {表名}/selectCountGroupByDate/日期或时间字段/要求和的字段/日期格式（yy:年、mm:月、dd:日）
          url: `shangpin/selectCountGroupByFatherId/zhonglei/zhongleiid/mingcheng`,
          method: "get"
        }).then(({ data }) => {
          if (data && data.code == 0 && data.data) {
            /*for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              this.categoryListspzl1.push(map.category);
              this.dataListspzl1.push(map.total);
            }*/
            for (var i = 0; i < data.data.length; i++) {
              var map = data.data[i];
              let item = { value: map.total, name: map.category };
              this.dataListspzl1.push(item);
            }
          }
        });
      },

      //获取图形1的统计数据
      getChartDatau1() {
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
              this.dataListu1.push(item);
            }
          }
        });
      },


    //加载折线（面积）图
      // isSmooth 曲线平滑 不传默认为false，false就是折线图，true就会变平滑
      initLineChart(initId, lable, text, xData, data, isAreaChart, isSmooth) {
        if (null == document.getElementById(initId))
          return;
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
                fontSize: 24,
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
                smooth: isSmooth,
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
        if (null == document.getElementById(initId))
          return;
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
                fontSize: 24,
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
              formatter: '{a} <br/>{b} : {c}; 占比{d}%'
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
              radius: '70%',
              data: data,
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
        if (null == document.getElementById(initId))
          return;
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
                fontSize: 24,
              fontWeight: 'bolder',
              color: '#000080'
            },
            // itemGap设置主副标题之间的纵向间距，单位px，默认为10
            itemGap: 4,
            // top指title组件离容器上侧的距离，取值可为具体像素如20, 也可为百分比如'20%', 也可以是'top', 'middle', 'bottom'
              top: 0,
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
              formatter: '{a}<br>{b} : {c}',
          },
          xAxis: {
            type: 'category',
            data: xData,
          },
          yAxis: {
            type: 'value',
              name: lable,
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
