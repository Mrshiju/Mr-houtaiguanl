<template>
  <el-container>
    <el-header class="header">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img src="@/assets/logo.jpg" alt="加载失败">
          </div>
        </el-col>
        <el-col :span="10" class="title">
          <h2>后台管理系统</h2>
        </el-col>
        <el-col :span="6" class="longinOut">
          <a href="#" @click.prevent="loginout">退出</a>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="240px">
        <el-col :span="24">
          <el-menu unique-opened router default-active="2" class="el-menu-vertical-demo">
            <el-submenu :index="''+item.order" v-for="(item,i) in menus" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="item1.path" v-for="(item1,i) in item.children" :key="item1.id">
                  <i class="el-icon-menu"></i>
                  {{item1.authName}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main class="home">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.getMenus()
  },
  methods: {
    async getMenus() {
      const res = await this.$http.get(`menus`);
      console.log(res);
      
      this.menus = res.data.data;
    },
    loginout() {
      localStorage.clear("token");
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style>
.header {
  background-color: skyblue;
}
.title {
  color: white;
  text-align: center;
  line-height: 60px;
}
.longinOut {
  display: block;
  line-height: 60px;
  text-align: center;
}
.el-menu-vertical-demo {
  height: 100%;
}
.hellow {
  height: 100%;
}
.grid-content img {
  height: 60px;
  width: 200px;
}
</style>
