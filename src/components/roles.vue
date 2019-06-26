<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-list list1="权限管理" list2="权限列表"></my-list>

    <!-- 增加新职位 -->
    <el-button type="primary" class="button">添加新职能</el-button>
    <!-- 表格 -->
    <el-table class="table" :data="tableData" style="width: 100%">
      <el-table-column type="expand" width="80">
        <template slot-scope="scope">
          <el-row v-for="(v,i) in scope.row.children" :key="i" class="leaves1">
            <el-col :span="4">
              <el-tag :key="i" closable @close="deleteRight(scope.row,v)">{{v.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(v1,i) in v.children" :key="i" class="leaves2">
                <el-col :span="4">
                  <el-tag
                    :key="i"
                    closable
                    type="info"
                    @close="deleteRight(scope.row,v1)"
                  >{{v1.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    v-for="(v2,i) in v1.children"
                    :key="i"
                    type="danger"
                    closable
                    @close="deleteRight(scope.row,v2)"
                  >{{v2.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button plain size="mini" type="primary" icon="el-icon-edit" circle  @click="getRoles(scope.row)"></el-button>
            <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
            <el-button
              plain
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
             
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击树状权限 -->
    <el-dialog title="提示" :visible="dialogVisibleT" width="600px">
      <span>权限管理</span>
      <el-tree
        ref="tree"
        default-expand-all
        :data="treeData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedArr"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setRights">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisibleT: false,
      treeData: [],
      checkedArr: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      currRoleId:-1
    };
  },

  created() {
    this.findAll();
  },
  methods: {
    async setRights() {
      const arr1 = this.$refs.tree.getCheckedKeys();
      const arr2 = this.$refs.tree.getHalfCheckedKeys();
      const arr = [...arr1, ...arr2];
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(",")
      });
      this.dialogVisibleT = false;
      this.findAll();
    },
    // 权限管理
    async getRoles(role) {
      console.log(role);
      
      const res = await this.$http.get(`rights/tree`);
      console.log(res);
      this.treeData = res.data.data;

      //现有管理员权限
      const tempArr = [];
      role.children.forEach(item1 => {
        // tempArr.push(item1.id);
        // id=100
        item1.children.forEach(item2 => {
          // tempArr.push(item2.id);

          item2.children.forEach(item3 => {
            tempArr.push(item3.id);
          });
        });
      });
      console.log(tempArr);
      this.checkedArr = tempArr;
      this.dialogVisibleT = true;
      this.currRoleId = role.id
    },
    async findAll() {
      const res = await this.$http.get("roles");
        // console.log(res);
      this.tableData = res.data.data;
    },
    async deleteRight(user, data) {
      const res = await this.$http.delete(`roles/${user.id}/rights/${data.id}`);
      user.children = res.data.data;
      // console.log(res, user);
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
.button {
  margin-top: 20px;
  width: 200px;
}
.leaves1 {
  margin-top: 10px;
}
.leaves2 {
  margin-bottom: 10px;
}
</style>
