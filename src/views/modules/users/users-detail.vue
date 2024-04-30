<template>
  <div v-if="this.parent.usersDetailFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" label-width="110px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="用户名称:">
        <el-input v-model="ruleForm.loginname" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="密码:">
        <el-input v-model="ruleForm.loginpw" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="类型:">
        <el-input v-model="ruleForm.type" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="类型名称:">
        <el-input v-model="ruleForm.typename" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="姓名:">
        <el-input v-model="ruleForm.xingming" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="性别:">
        <el-input v-model="ruleForm.xingbie" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="年龄:">
        <el-input v-model="ruleForm.nianling" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="地址:">
        <el-input v-model="ruleForm.address" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="电话:">
        <el-input v-model="ruleForm.dianhua" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="审核:">
        <el-input v-model="ruleForm.shenhe" readonly></el-input>
      </el-form-item>

      <el-form-item class="dy-add-set-detail-el-form-item-2">
        <!-- <el-button class="dy-detail-add-button" @click="chanpinpingjiaAddHandler">商品评价添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="chanpinpingjiaChakanHandler">商品评价查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="dingdanAddHandler">订单添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="dingdanChakanHandler">订单查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="dingdanxiangAddHandler">订单项添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="dingdanxiangChakanHandler">订单项查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="gouwucheAddHandler">购物车添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="gouwucheChakanHandler">购物车查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="liuyanAddHandler">留言反馈添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="liuyanChakanHandler">留言反馈查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="peisongAddHandler">配送添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="peisongChakanHandler">配送查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="pingjiaAddHandler">评价添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="pingjiaChakanHandler">评价查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="shangpinAddHandler">商品添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="shangpinChakanHandler">商品查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="shoucangAddHandler">商品收藏添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="shoucangChakanHandler">商品收藏查看</el-button> -->
        <!-- <el-button class="dy-detail-add-button" @click="shouhuodizhiAddHandler">收货地址添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="shouhuodizhiChakanHandler">收货地址查看</el-button> -->

        <el-button class="dy-back-button" @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    let self = this;
    return {
      id: '',
      ruleForm: {
        loginname: '',
        loginpw: '',
        type: '',
        typename: '',
        xingming: '',
        xingbie: '',
        nianling: '',
        address: '',
        dianhua: '',
        shenhe: '',

      },
    };
  },
  props: ["parent"],
  computed: {
  },
  created() {
  },
  methods: {

    // 下载
    download(fileUrl) {
      let url = this.$base.url + "/common/download?filename=" + fileUrl;
      url = encodeURI(url);
      window.open(url);
      // window.open(this.$base.url + fileUrl);
    },
    getFileSrc(fileUrl) {
      return this.$base.url + fileUrl;
    },
    // 初始化
    init(id) {
      if (id) {
        this.id = id;
        this.info(id);
      }
    },
    // 返回按钮事件
    back() {
      this.parent.showFlag = true;
      this.parent.usersSetFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersChanpinpingjiaChakanFlag = false;
      this.parent.usersChanpinpingjiaAddFlag = false;
      this.parent.usersDingdanChakanFlag = false;
      this.parent.usersDingdanAddFlag = false;
      this.parent.usersDingdanxiangChakanFlag = false;
      this.parent.usersDingdanxiangAddFlag = false;
      this.parent.usersGouwucheChakanFlag = false;
      this.parent.usersGouwucheAddFlag = false;
      this.parent.usersLiuyanChakanFlag = false;
      this.parent.usersLiuyanAddFlag = false;
      this.parent.usersPeisongChakanFlag = false;
      this.parent.usersPeisongAddFlag = false;
      this.parent.usersPingjiaChakanFlag = false;
      this.parent.usersPingjiaAddFlag = false;
      this.parent.usersShangpinChakanFlag = false;
      this.parent.usersShangpinAddFlag = false;
      this.parent.usersShoucangChakanFlag = false;
      this.parent.usersShoucangAddFlag = false;
      this.parent.usersShouhuodizhiChakanFlag = false;
      this.parent.usersShouhuodizhiAddFlag = false;

    },

    // 获取用户详情数据
    info(id) {
      this.$http({
        url: `users/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
        } else {
          this.$message.error(data.message);
        }
      });
    },
    //跳转到用户商品评价查看页面
    chanpinpingjiaChakanHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersChanpinpingjiaChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersChanpinpingjiaChakan.init(this.id);
      });
    },

    //跳转到用户商品评价添加页面
    chanpinpingjiaAddHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersChanpinpingjiaAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersChanpinpingjiaAdd.init(this.id, this.ruleForm.loginname);
      });
    },

    //跳转到用户订单查看页面
    dingdanChakanHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersDingdanChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersDingdanChakan.init(this.id);
      });
    },

    //跳转到用户订单添加页面
    dingdanAddHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersDingdanAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersDingdanAdd.init(this.id, this.ruleForm.loginname);
      });
    },

    //跳转到用户订单项查看页面
    dingdanxiangChakanHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersDingdanxiangChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersDingdanxiangChakan.init(this.id);
      });
    },

    //跳转到用户订单项添加页面
    dingdanxiangAddHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersDingdanxiangAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersDingdanxiangAdd.init(this.id, this.ruleForm.loginname);
      });
    },

    //跳转到用户购物车查看页面
    gouwucheChakanHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersGouwucheChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersGouwucheChakan.init(this.id);
      });
    },

    //跳转到用户购物车添加页面
    gouwucheAddHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersGouwucheAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersGouwucheAdd.init(this.id, this.ruleForm.loginname);
      });
    },

    //跳转到用户留言反馈查看页面
    liuyanChakanHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersLiuyanChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersLiuyanChakan.init(this.id);
      });
    },

    //跳转到用户留言反馈添加页面
    liuyanAddHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersLiuyanAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersLiuyanAdd.init(this.id, this.ruleForm.loginname);
      });
    },

    //跳转到用户配送查看页面
    peisongChakanHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersPeisongChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersPeisongChakan.init(this.id);
      });
    },

    //跳转到用户配送添加页面
    peisongAddHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersPeisongAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersPeisongAdd.init(this.id, this.ruleForm.loginname);
      });
    },

    //跳转到用户评价查看页面
    pingjiaChakanHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersPingjiaChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersPingjiaChakan.init(this.id);
      });
    },

    //跳转到用户评价添加页面
    pingjiaAddHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersPingjiaAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersPingjiaAdd.init(this.id, this.ruleForm.loginname);
      });
    },

    //跳转到用户商品查看页面
    shangpinChakanHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersShangpinChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersShangpinChakan.init(this.id);
      });
    },

    //跳转到用户商品添加页面
    shangpinAddHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersShangpinAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersShangpinAdd.init(this.id, this.ruleForm.loginname);
      });
    },

    //跳转到用户商品收藏查看页面
    shoucangChakanHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersShoucangChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersShoucangChakan.init(this.id);
      });
    },

    //跳转到用户商品收藏添加页面
    shoucangAddHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersShoucangAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersShoucangAdd.init(this.id, this.ruleForm.loginname);
      });
    },

    //跳转到用户收货地址查看页面
    shouhuodizhiChakanHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersShouhuodizhiChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersShouhuodizhiChakan.init(this.id);
      });
    },

    //跳转到用户收货地址添加页面
    shouhuodizhiAddHandler() {
      this.parent.showFlag = false;
      this.parent.usersDetailFlag = false;
      this.parent.usersShouhuodizhiAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.usersShouhuodizhiAdd.init(this.id, this.ruleForm.loginname);
      });
    },


  }
};
</script>
<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: 500px;
}

.search-box {
  position: absolute;
}

.el-date-editor.el-input {
  width: auto;
}
</style>
