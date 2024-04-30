<template>
  <div>
    <div class="dy-login-container-div">
      <!--登陆表单-->
      <el-form class="dy-login-el-form">
        <div v-if="true" class="dy-login-title-container-div">{{ this.$project.projectName }}登录</div>
        <div class="dy-login-list-item-div">
          <div v-if="true" class="dy-login-list-item-lable-div">用户名:</div>
          <el-input placeholder="请输入用户名" style="width: 85%;" v-model="rulesForm.loginname" clearable></el-input>
        </div>
        <div class="dy-login-list-item-div">
          <div v-if="true" class="dy-login-list-item-lable-div">密{{'\u3000'}}码:</div>
          <el-input placeholder="请输入密码" style="width: 85%;" v-model="rulesForm.loginpw" clearable show-password></el-input>
        </div>
        <div class="dy-login-list-item-div">
          <div v-if="true" class="dy-login-list-item-lable-div" >验证码:</div>
          <el-input placeholder="请输入验证码" style="width: 55%;" v-model="rulesForm.code" clearable></el-input>
          <div @click="getRandCode(4)" style="height:44px;line-height:44px;padding: 2px 0 10px 20px;cursor: pointer;">
              <span v-for="(item, index) in codes" :key="index"
                :style="{ color: item.color, transform: item.rotate, fontSize: item.size }">{{ item.num }}</span>
            </div>
        </div>
        <div class="dy-login-list-type-div">
          <div v-if="false" class="dy-login-list-item-lable-div">角{{'\u3000'}}色:</div>
          <el-radio v-for="item in rulesForm.types" v-bind:key="item.typename" v-model="rulesForm.type"
              :label="item.value" @change="getRadioVal(item.label)">
              {{ item.label }}
            </el-radio>
            <!-- <el-radio label="0" v-model="rulesForm.type">管理员</el-radio>
            <el-radio label="1" v-model="rulesForm.type">商家</el-radio>
            <el-radio label="2" v-model="rulesForm.type">用户</el-radio> -->
        </div>
        <div class="dy-login-list-button-div">
          <el-button type="primary" @click="login" class="dy-login-login-button">登录</el-button>
          <el-button class="dy-login-register-button"  type="primary" @click="toRegister">新用户注册</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rulesForm: {
        loginname: "",
        loginpw: "",
        type: "0",
        typename: '管理员',
        code: '',
        types: this.$userstypes,
      },
      tableName: "",
      codes: [{
        num: 1,
        color: '#000',
        rotate: '10deg',
        size: '16px'
      }, {
        num: 2,
        color: '#000',
        rotate: '10deg',
        size: '16px'
      }, {
        num: 3,
        color: '#000',
        rotate: '10deg',
        size: '16px'
      }, {
        num: 4,
        color: '#000',
        rotate: '10deg',
        size: '16px'
      }],
    };
  },
  mounted() {
  },
  created() {
    this.getRandCode()
  },
  methods: {
    getRadioVal(typename) {
      this.rulesForm.typename = typename;
      console.log(this.rulesForm.typename);
    },
    register(tableName) {
      this.$storage.set("loginTable", tableName);
      this.$router.push({ path: '/register' })
    },
    // 登陆
    login() {
      if (!this.rulesForm.loginname) {
        this.$message.error("请输入用户名");
        return;
      }
      if (!this.rulesForm.loginpw) {
        this.$message.error("请输入密码");
        return;
      }
      let code = ''
      for (let i in this.codes) {
        code += this.codes[i].num
      }
      if (!this.rulesForm.code) {
        this.$message.error("请输入验证码");
        return;
      }
      if (this.rulesForm.code.toLowerCase() != code.toLowerCase()) {
        this.$message.error("验证码输入有误");
        this.getRandCode()
        return;
      }

      this.$http({
        url: `/login?loginname=${this.rulesForm.loginname}&loginpw=${this.rulesForm.loginpw}&type=${this.rulesForm.type}`,
        method: "post"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$storage.set("Token", data.data.token);
          this.$storage.set("usersid", data.data.usersId);
          this.$storage.set("typename", this.rulesForm.typename);
          this.$storage.set("type", this.rulesForm.type);
          this.$storage.set("adminName", this.rulesForm.loginname);
          this.$storage.set("usersname", this.rulesForm.loginname);
          this.$router.replace({ path: "/index/" });
        } else {
          this.$message.error(data.message);
        }
      });
    },

    toRegister(){
      this.$router.push({path:'/register'});
    },

    getRandCode(len = 4) {
      this.randomString(len)
    },
    randomString(len = 4) {
      let chars = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
      ]
      let colors = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
      let sizes = ['18']

      let output = [];
      for (let i = 0; i < len; i++) {
        // 随机验证码
        let key = Math.floor(Math.random() * chars.length)
        this.codes[i].num = chars[key]
        // 随机验证码颜色
        let code = '#'
        for (let j = 0; j < 6; j++) {
          let key = Math.floor(Math.random() * colors.length)
          code += colors[key]
        }
        this.codes[i].color = code
        // 随机验证码方向
        let rotate = Math.floor(Math.random() * 10)
        let plus = Math.floor(Math.random() * 2)
        if (plus == 1) rotate = '-' + rotate
        this.codes[i].rotate = 'rotate(' + rotate + 'deg)'
        // 随机验证码字体大小
        let size = Math.floor(Math.random() * sizes.length)
        this.codes[i].size = sizes[size] + 'px'
      }
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
