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
    </el-row>
  </div>
</template>
<style>

</style>
<script>
  export default{
    data() {
      return {
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
