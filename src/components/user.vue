<template>
  <el-card class="box-card">
    <my-list list1="用户管理" list2="用户列表"></my-list>

    <!-- 搜索框 -->
    <el-input
      @clear="findA"
      clearable
      placeholder="请输入内容"
      v-model="query"
      class="input-with-select"
    >
      <el-button slot="append" icon="el-icon-search" @click="findA"></el-button>
    </el-input>
    <el-button type="primary" @click="addItem">添加人员</el-button>
    <!-- 添加成员 -->
    <el-dialog title="添加新成员" :visible.sync="dialogVisibleAdd" width="60%">
      <!-- 表格信息 -->
      <el-form :label-position="labelPosition" label-width="80px" :model="formData">
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItems">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑成员 -->
    <el-dialog title="编辑新成员" :visible.sync="dialogVisibleedit" width="60%">
      <!-- 表格信息 -->
      <el-form :label-position="labelPosition" label-width="80px" :model="formData">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editItems">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 个人职责 -->
    <el-dialog title="管理人员" :visible.sync="dialogVisibleDuty" width="60%">
      <!-- 表格信息 -->
      <el-form label-position="right" label-width="80px" :model="formData">
        <el-form-item label="用户名">{{currUsername}}</el-form-item>
        <el-form-item label="职责">
          <el-select   v-model="currUserlabel" :label="1">
            <el-option :value=1 label='请选择'>请选择</el-option>
            <el-option
              v-for="(item,i) in options"
              :key="i"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDuty">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>

      <el-table-column label="日期">
        <template slot-scope="scope">{{scope.row.create_time | fmData}}</template>
      </el-table-column>
      <el-table-column prop="mobile" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeState(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="编辑">
        <template slot-scope="scope">
          <el-row>
            <el-button
              plain
              size="mini"
              type="primary"
              @click="dutyUser(scope.row)"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              plain
              size="mini"
              type="success"
              icon="el-icon-check"
              @click="editUser(scope.row)"
              circle
            ></el-button>
            <el-button
              plain
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="open2(scope.row)"
              circle
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      dialogVisibleAdd: false,
      dialogVisibleedit: false,
      dialogVisibleDuty: false,

      val: "true",
      search: "",
      currentPage: "",
      tableData: [],
      formData: {
        id: "",
        username: "",
        email: "",
        create_time: "",
        mobile: ""
      },
      pagenum: 1,
      pagesize: 2,
      query: "",
      total: 1,
      options: [
        
      ],
      value: "",
      currUsername:'',
      currUserlabel:-1,
      currUserId:-1
    };
  },
  //时间过滤器

  created() {
    this.getList();
  },
  methods: {
    //编辑职责
    async editDuty(){
      const res = await this.$http.put(`users/${this.currUserId}/role`,{rid:this.currUserlabel});
      console.log(res);
            this.dialogVisibleDuty=false  
      this.$message.success("设置成功")
    },
    //职责
   async dutyUser(user) {
      this.dialogVisibleDuty = true;
      const res = await this.$http.get(`roles`);
      const {meta:{msg,status}} = res.data;
       this.currUsername = user.username;
       console.log(res);
         this.options = res.data.data;
         //查询当前id
       const res1 = await this.$http.get(`users/${user.id}`)
       console.log(res1);
      this.currUserlabel = res1.data.data.rid;
      this.currUserId = user.id;
      
       
    },
    // 状态发生改变
    async changeState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );

      console.log(res);
      const {
        meta: { mag, status }
      } = res.data;
      if (status === 200) {
        this.getList();
      } else {
        this.$message.warinig(msg);
      }
    },
    // 编辑发送
    async editItems() {
      this.dialogVisibleedit = false;
      const res = await this.$http.put(
        `users/${this.formData.id}`,
        this.formData
      );
      console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.getList();
      }
    },
    // 编辑页展示
    async editUser(user) {
      this.dialogVisibleedit = true;
      const res = await this.$http.get(`users/${user.id}`);
      const {
        meta: { mag, status }
      } = res.data;
      if (status === 200) {
        this.formData = res.data.data;
      } else {
        this.$message.warinig(msg);
      }
    },
    // 添加
    async addItems() {
      this.dialogVisibleAdd = false;
      this.formData = {};
      const res = await this.$http.post("users", this.formData);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        this.formData = {};
        this.getList();
      } else {
        this.$message.error(msg);
      }
    },
    // 添加页展示
    addItem() {
      this.dialogVisibleAdd = true;
      this.formData = {};
    },
    open2(user) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${user.id}`);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.pagenum = 1;
            this.getList();
          } else {
            this.$message.warning(msg);
          }
        })
        .catch(() => {
          this.$message.info("取消删除");
        });
    },
    clear() {
      this.getList();
    },
    findA() {
      this.pagenum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pagenum = 1;
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getList();
    },
    async getList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const {
        meta: { status, msg },
        data: { total, users }
      } = res.data;

      if (status === 200) {
        this.tableData = users;
        // console.log(this.tableData);

        this.total = total;

        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.el-container {
  height: 100%;
}
.input-with-select {
  margin-top: 20px;
  margin-right: 10px;
  width: 340px;
}
</style>
