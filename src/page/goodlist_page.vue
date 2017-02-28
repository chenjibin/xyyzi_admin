<template>
  <div class="good-list-page">
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
      <el-col :span="24" class="tool-btn-wrapper">
        <el-button type="primary" size="small" @click="addGood">添加商品</el-button>
        <el-select v-model="allHandle" style="width:100px;" clearable placeholder="批量操作" name="allHandle" size="small">
          <el-option
            v-for="item in initFormData.allHandleData"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small">批量</el-button>
      </el-col>
      <el-col :span="24" class="good-data">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          :data="tableData"
          stripe
          style="width: 100%;border-right:1px solid #dfe6ec;">
          <el-table-column
            fixed
            type="selection"
            width="40">
            <template scope="scope">

            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            fixed
            prop="image"
            label="图片">
            <template scope="scope">
              <img :src="scope.row.image" width="60" height="60">
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="title"
            label="标题"
            width="300">
          </el-table-column>
          <el-table-column
            prop="admin"
            label="管理员">
          </el-table-column>
          <el-table-column
            prop="date"
            label="编辑时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="cate"
            label="分类">
          </el-table-column>
          <el-table-column
            prop="brand"
            label="品牌"
            width="120">
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
            <template scope="scope">
              <i :class="[+scope.row.isListing ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="first"
            label="首页">
            <template scope="scope">
              <i :class="[+scope.row.first ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="hot"
            label="热卖">
            <template scope="scope">
              <i :class="[+scope.row.hot ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="new"
            label="新品">
            <template scope="scope">
              <i :class="[+scope.row.new ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="recommend"
            label="推荐">
            <template scope="scope">
              <i :class="[+scope.row.recommend ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="sepcPrice"
            label="特价">
            <template scope="scope">
              <i :class="[+scope.row.sepcPrice ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="xianhuo"
            label="现货">
            <template scope="scope">
              <i :class="[+scope.row.xianhuo ? trueClass : falseClass]"></i>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="address"
            label="操作"
            width="160">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="pagination-wrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </el-col>
    </el-row>
    <transition name="fade">
      <el-row v-if="modelShow" class="model-popup">
        <el-form ref="form" :model="form" label-width="80px">
          <el-col :span="8" class="add-left-area">
          <el-form-item label="标题">
            <el-input v-model="form.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.region" placeholder="请选择分类" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌">
            <el-select v-model="form.region" placeholder="请选择品牌" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" clearable placeholder="请选择性别" size="small">
              <el-option label="中" value="0"></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递模板">
            <el-select v-model="form.region" placeholder="请选择快递模板" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="属性">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="上架" name="type"></el-checkbox>
              <el-checkbox label="包邮" name="type"></el-checkbox>
              <el-checkbox label="首页" name="type"></el-checkbox>
              <el-checkbox label="热卖" name="type"></el-checkbox>
              <el-checkbox label="新品" name="type"></el-checkbox>
              <el-checkbox label="推荐" name="type"></el-checkbox>
              <el-checkbox label="特价" name="type"></el-checkbox>
              <el-checkbox label="现货" name="type"></el-checkbox>
              <el-checkbox label="活动" name="type"></el-checkbox>
              <el-checkbox label="双11" name="type"></el-checkbox>
              <el-checkbox label="活动2" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input v-model="form.seoDesc" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="SEO标题">
            <el-input v-model="form.seoTitle" size="small"></el-input>
          </el-form-item>
          <el-form-item label="SEO关键词">
            <el-input v-model="form.seoKeyWord" size="small"></el-input>
          </el-form-item>
          <el-form-item label="SEO描述">
            <el-input v-model="form.seoTalk" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="7天销量">
            <el-input v-model="form.weekSale" size="small" style="width:120px;"></el-input>
          </el-form-item>
            <div class="title">商品详情</div>
            <u-editor></u-editor>
            </el-col>
          <el-col :span="14" class="add-right-area">
            <el-form-item label="规格类型">
              <el-select v-model="form.guige" placeholder="请选择分类" size="small">
                <el-option label="默认(无)" value="0"></el-option>
                <el-option label="鞋" value="1"></el-option>
                <el-option label="服" value="2"></el-option>
                <el-option label="包" value="3"></el-option>
                <el-option label="篮球" value="4"></el-option>
                <el-option label="足球" value="5"></el-option>
                <el-option label="童鞋" value="6"></el-option>
                <el-option label="其他" value="7"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商家编码">
              <el-input v-model="form.name" placeholder="商家编码" size="small" style="width:193px;"></el-input>
            </el-form-item>
            <el-form-item label="销售价格">
              <el-input v-model="form.name" placeholder="销售价格" size="small" style="width:193px;"></el-input>
            </el-form-item>
            <el-form-item label="市场价格">
              <el-input v-model="form.name" placeholder="市场价格" size="small" style="width:193px;"></el-input>
            </el-form-item>
            <el-form-item label="库存数量">
              <el-input v-model="form.name" placeholder="库存数量" size="small" style="width:193px;"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </transition>
  </div>
</template>
<style lang="less">
  .good-list-page{
    position: relative;
    min-height: 100%;
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
    .good-data {
      margin-top: 10px;
    }
    .model-popup {
      position: absolute;
      z-index: 99;
      left:0;
      width: 100%;
      top:0;
      bottom:0;
      background-color: #fff;
      overflow: hidden;
      overflow-y: scroll;
      .el-form-item {
        margin-bottom: 10px;
        .el-checkbox+.el-checkbox {
          margin: 0;
        }
      }
      .add-left-area {
        .title {
          font-size: 14px;
          color: #48576a;
          text-indent:10px;
          margin-bottom: 10px;
        }
      }
      .add-right-area {
        float: right;
      }
    }
    .tool-btn-wrapper {
      margin-top: 10px;
    }
    .pagination-wrapper {
      margin-top: 10px;
    }
    [class*=" el-icon-"], [class^=el-icon-] {
      font-size: 18px;
      &.el-icon-circle-check {
        color: #00ab00;
      }
      &.el-icon-circle-cross {
        color: #dc0707;
      }
  }
  }
</style>
<script type="text/ecmascript-6">
  import UEditor from 'components/UEditor'
  export default{
    components: {
      'u-editor': UEditor
    },
    data() {
      return {
        totalCount: null,
        pageSize: 5,
        currentPage: 1,
        modelShow: false,
        trueClass: 'el-icon-circle-check',
        falseClass: 'el-icon-circle-cross',
        loading: false,
        tableData: [],
        initFormData: {},
        sendData: {
          cate_id: '',
          brand_id: '',
          sex: '',
          template_id: '',
          intro_type: '',
          is_listing: '',
          admin_id: ''
        },
        allHandle: '',
        form: {
          guige: '0',
          sex: '',
          name: '',
          seoTitle: '',
          seoDesc: '',
          seoKeyWord: '',
          seoTalk: '',
          region: '',
          date1: '',
          date2: '',
          weekSale: '',
          delivery: false,
          type: ['上架', '包邮', '首页', '热卖'],
          resource: '',
          desc: ''
        }
      }
    },
    created() {
      let options = {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }
      this.getGoodListData(options)
    },
    methods: {
      addGood() {
        this.modelShow = true
      },
      getGoodListData(options) {
        this.loading = true
        this.$http.get('/api/getGoodListData', options).then((res) => {
          this.initFormData = res.data.initFormData
          this.tableData = res.data.tableData
          this.totalCount = +res.data.totalCount
          setTimeout(() => {
            this.loading = false
          }, 500)
      })
      },
      selectChange(a) {
        console.log(this.sendData.cate_id)
      },
      submitSearch() {
        this.getGoodListData()
//        this.$http.post('/api/searchGoodListData', this.sendData).then((res) => {
//          console.log(res)
//        })
        console.log(this.sendData)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        let options = {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }
        }
        this.getGoodListData(options)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        let options = {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }
        }
        console.log(`当前页: ${val}`)
        this.getGoodListData(options)
      }
    }
  }
</script>
