<template>
  <div class="dy-admin-router-view-div">
    <el-form class="dy-add-set-detail-el-form"  ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px">
      <el-form-item class="dy-add-set-detail-el-form-item" label="新密码" prop="newpassword">
        <el-input v-model="ruleForm.newpassword" show-password clearable></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item" label="确认密码" prop="repassword">
        <el-input v-model="ruleForm.repassword" show-password clearable></el-input>
      </el-form-item>
      <el-form-item class="dy-add-set-detail-el-form-item-2">
        <el-button class="dy-add-button" @click="onUpdateHandler">确 定</el-button>
        <el-button v-show="false" class="dy-back-button" @click="back">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {},
      users: {},
      rules: {
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        newpassword: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur"
          }
        ],
        repassword: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.$http({
      url: `users/session`,
      method: "get"
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.users = data.data;
      } else {
        this.$message.error(data.message);
      }
    });
  },
  methods: {
    // 返回
    back() {
      if (this.parent) {
        this.parent.showFlag = true;
        this.parent.usersSetFlag = false;
        this.parent.usersDetailFlag = false;
      } else {
        this.$router.replace('/usersmana')
      }
    },
    // 修改密码
    onUpdateHandler() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.ruleForm.newpassword != this.ruleForm.repassword) {
            this.$message.error("两次密码输入不一致");
            return;
          }
          this.users.loginpw = this.ruleForm.newpassword;
          this.$http({
            url: `users/save`,
            method: "post",
            data: this.users
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "修改密码成功,下次登录系统生效",
                type: "success",
                duration: 1500,
                onClose: () => {
                }
              });
            } else {
              this.$message.error(data.message);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
