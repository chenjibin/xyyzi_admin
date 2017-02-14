<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-select v-model="sendData.cate_id" clearable placeholder="选择分类" name="cate_id" size="small" @change="selectChange">
          <el-option
            v-for="item in initFormData.cateData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.brand_id" style="width:160px;" clearable placeholder="选择品牌" name="brand_id" size="small">
          <el-option
            v-for="item in initFormData.brandData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.sex" style="width:100px;" clearable placeholder="选择性别" name="sex" size="small">
          <el-option
            v-for="item in initFormData.sexData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.template_id" clearable placeholder="选择快递模板" name="template_id" size="small">
          <el-option
            v-for="item in initFormData.templateData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.intro_type" style="width:100px;" clearable placeholder="特殊选项" name="intro_type" size="small">
          <el-option
            v-for="item in initFormData.introData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.is_listing" style="width:120px;" clearable placeholder="上下架选择" name="is_listing" size="small">
          <el-option
            v-for="item in initFormData.listingData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="sendData.admin_id" style="width:140px;" clearable placeholder="管理员选择" name="admin_id" size="small">
          <el-option
            v-for="item in initFormData.adminData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click="submitSearch">查询</el-button>
      </el-col>
      <el-col :span="24" class="good-data">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            width="60">
          </el-table-column>
          <el-table-column
            prop="image"
            label="图片"
            width="180">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="admin"
            label="管理员">
          </el-table-column>
          <el-table-column
            prop="date"
            label="编辑时间">
          </el-table-column>
          <el-table-column
            prop="cate"
            label="分类">
          </el-table-column>
          <el-table-column
            prop="brand"
            label="品牌">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="price"
            label="售价">
          </el-table-column>
          <el-table-column
            prop="isListing"
            label="上架">
          </el-table-column>
          <el-table-column
            prop="first"
            label="首页">
          </el-table-column>
          <el-table-column
            prop="hot"
            label="热卖">
          </el-table-column>
          <el-table-column
            prop="new"
            label="新品">
          </el-table-column>
          <el-table-column
            prop="recommend"
            label="推荐">
          </el-table-column>
          <el-table-column
            prop="sepcPrice"
            label="特价">
          </el-table-column>
          <el-table-column
            prop="xianhuo"
            label="现货">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>
<style lang="less">
  .good-data {
    margin-top: 10px;
  }

</style>
<script>
  export default{
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        initFormData: {},
        sendData: {
          cate_id: '',
          brand_id: '',
          sex: '',
          template_id: '',
          intro_type: '',
          is_listing: '',
          admin_id: ''
        }
      }
    },
    created() {
      this.$http.get('/api/getGoodListData').then((res) => {
        this.initFormData = res.data.data.initFormData
      })
    },
    components: {},
    methods: {
      selectChange(a) {
        console.log(this.sendData.cate_id)
      },
      submitSearch() {
        this.$http.post('/api/searchGoodListData', this.sendData).then((res) => {
          console.log(res)
        })
        console.log(this.sendData)
      }
    }
  }
</script>
