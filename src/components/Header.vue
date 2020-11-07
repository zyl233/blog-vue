<template>
  <div class="m-conte">
  <H3>欢迎来到zyl的博客</H3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar></div>
<!--      <el-avatar :size="50" src=""></el-avatar></div>-->
<!--      <img src="../assets/mianlogin.jpg">-->
      <div>{{ user.username }}</div>

    <div class="maction">
      <span> <el-link type="primary" href="/blogs">主页</el-link></span>

      <el-divider direction="vertical"></el-divider>
      <span><el-link type="success" href="/blog/add">发表文章</el-link></span>

      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin"> <el-link type="info" href="/login">登录</el-link></span>

      <el-divider direction="vertical"></el-divider>
      <span v-show="hasLogin"> <el-link type="danger" @click="logout">退出</el-link></span>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
    user:{
      username:'先登录',
      avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    hasLogin:false
  }
 },
  methods:{
    logout() {
      const _this = this
      _this.$axios.get("/logout",{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      }).then(res=>{
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")
      })
    }
  },
  created() {
    if (this.$store.getters.getUser.username){
      this.user.username= this.$store.getters.getUser.username
      this.user.avatar= this.$store.getters.getUser.avatar

      this.hasLogin = true
    }
  }
}
</script>

<style scoped>

.m-conte {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}
.maction{
  margin: 10px;
}
</style>