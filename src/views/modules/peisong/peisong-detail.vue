<template>
  <div v-if="this.parent.peisongDetailFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" label-width="110px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="客户姓名:">
        <el-input v-model="ruleForm.xingming" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="订单:">
        <el-input v-if="ruleForm.dingdan && ruleForm.dingdan.bianhao" v-model="ruleForm.dingdan.bianhao" readonly></el-input>
        <div v-else>--</div>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="电话:">
        <el-input v-model="ruleForm.dianhua" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="地址:">
        <el-input v-model="ruleForm.dizhi" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="时间:">
        <el-input v-model="ruleForm.shijian" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="是否接单:">
        <el-input v-model="ruleForm.songshenhe" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="配送员姓名:">
        <el-input v-model="ruleForm.psxingming" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="配送员电话:">
        <el-input v-model="ruleForm.psdianhua" readonly></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="用户:">
        <el-input v-if="ruleForm.users && ruleForm.users.loginname" v-model="ruleForm.users.loginname" readonly></el-input>
        <div v-else>--</div>
      </el-form-item>

      <el-form-item class="dy-add-set-detail-el-form-item-2">
        <!-- <el-button class="dy-detail-add-button" @click="pingjiaAddHandler">评价添加</el-button> -->
        <!-- <el-button class="dy-detail-chakan-button" @click="pingjiaChakanHandler">评价查看</el-button> -->

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
        xingming: '',
        dingdan: { bianhao: '' },
        dianhua: '',
        dizhi: '',
        shijian: '',
        songshenhe: '',
        psxingming: '',
        psdianhua: '',
        users: { loginname: '' },

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
      this.parent.peisongSetFlag = false;
      this.parent.peisongDetailFlag = false;
      this.parent.peisongPingjiaChakanFlag = false;
      this.parent.peisongPingjiaAddFlag = false;

    },

    // 获取配送详情数据
    info(id) {
      this.$http({
        url: `peisong/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
        } else {
          this.$message.error(data.message);
        }
      });
    },
    //跳转到配送评价查看页面
    pingjiaChakanHandler() {
      this.parent.showFlag = false;
      this.parent.peisongDetailFlag = false;
      this.parent.peisongPingjiaChakanFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.peisongPingjiaChakan.init(this.id);
      });
    },

    //跳转到配送评价添加页面
    pingjiaAddHandler() {
      this.parent.showFlag = false;
      this.parent.peisongDetailFlag = false;
      this.parent.peisongPingjiaAddFlag = true;
      this.$nextTick(() => {
        this.parent.$refs.peisongPingjiaAdd.init(this.id, this.ruleForm.xingming);
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
