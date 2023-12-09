<template>
  <div class="list">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
      <el-breadcrumb-item>列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column align="center" type="index"></el-table-column>
        <!-- <el-table-column align="center" label="用户头像">
          <template slot-scope="scope">
            <img class="name_img" :src="scope.row.name_img" />
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          label="用户昵称"
          prop="nickName"
        ></el-table-column>
        <el-table-column
          align="center"
          label="手机号"
          prop="tel"
        ></el-table-column>
        <el-table-column
          align="center"
          label="评语"
          prop="msg"
        ></el-table-column>
        <el-table-column align="center" label="评分">
          <template slot-scope="scope">
            <el-rate
                v-model="scope.row.star"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
         <el-table-column
          align="center"
          label="评论时间"
          prop="shijian"
        ></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.pinglun_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改 -->
    <el-dialog
      title="修改评论"
      :visible.sync="editDialogVisible"
      width="66%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="90px">
        <el-form-item label="修改评论">
          <el-input v-model="editForm.msg"></el-input>
        </el-form-item>
        <el-form-item label="修改评分">
          <el-input v-model="editForm.star"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
      searchQuery: "", // 搜索
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("getPinglunAll");
      // if (res.meat.status !== 200) return this.$message.error(res.meta.msg)
      this.userlist = res.list;
      console.log(res.list);
    },
    // 关闭修改对话框
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改
    showEditDialog(obj) {
      console.log(obj);
      this.editForm = obj;
      this.editDialogVisible = true;
    },
    // 删除
    // 根据Id删除对应的用户信息
    async removeUserById(pinglun_id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "是否要删除?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: res } = await this.$http.get("delPinglun", {
        params: {
          pinglun_id,
        },
      });
      console.log(res.data);
      this.$message.success("删除成功！");
      this.getUserList();
    },

    // 确认修改
    async editUserInfo() {
      const { data: res } = await this.$http.get("updatePinglun", {
        params: {
          msg: this.editForm.msg,
          star: this.editForm.star,
          pinglun_id: this.editForm.pinglun_id,
        },
      });
      console.log(res);
      // 关闭对话框
      this.editDialogVisible = false;
      this.$message.success("修改成功！");
      this.getUserList();
    },

    // 搜索
    // 搜索
    async getUserSearch() {
      const { data: res } = await this.$http.get("searchName", {
        params: {
          name: this.searchQuery,
        },
      });
      console.log(res.data);
      this.userlist = res.data;
    },

    async quchong() {
      const { data: res } = await this.$http.get("quChong");

      console.log(res.data);
      // this.userlist = res.data
    },
  },
};
</script>
<style lang="less" scoped>
.img {
  width: 120px;
  height: 80px;
}
.name_img{
    width: 30rpx;
    height: 30rpx;
    border-radius: 10000px;
}
</style>