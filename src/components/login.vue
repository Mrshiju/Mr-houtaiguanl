<template>
  <div class="wrap">
    <el-form label-position="top" label-width="80px" :model="formdata" class="form">
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="button" @click.prevent="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
   methods: {
   async login(){
     const res = await this.$http.post('login',this.formdata);
     const {
        data: {
          meta: { msg, status },
          data
        }
      } = res;
     
     if(status===200){
       localStorage.setItem('token',data.token)
       this.$router.push({
         name:'home'})
     }else{
       this.$message.error(msg)
     }
    } 
  },
};
</script>

<style>
.wrap {
  height: 100%;
  /* border-radius: 10px; */
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form{
  width: 400px;
  height: 300px;
  border-radius: 10px;
  background-color: white;
  /* justify-content: center;
  align-items: center; */
  padding: 20px;
}
.button {
  width: 100%;
}
</style>
