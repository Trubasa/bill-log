<template>
  <div class="bill-panel">
    <a-modal
      :title="modelName"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="名称">
          <a-input v-model="form.name"></a-input>
        </a-form-item>
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="类型">
          <a-radio-group v-model="form.type" :options="typeOptions" @change="onChange" defaultValue="me"/>
        </a-form-item>

        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="价格">
          <a-input-number :min="1" :max="100000" v-model="form.price"/>
        </a-form-item>
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="备注">
          <a-textarea v-model="form.remark" :autosize="{ minRows: 2, maxRows: 6 }">

          </a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import statusCollection from '../../assets/statusCollection'

  const typeOptions = []

  _.forEach(statusCollection.billType,(val,key)=>{
    typeOptions.push({
      label:val,
      value:key
    })
  })

  const defaultForm = () => {
    return {
      id: Date.now() + '-' + parseInt(Math.random() * 10000),
      name: '',
      price: 0,
      remark: '',
      type: 'me',
      create_time:new Date().Format("yyyy-MM-dd HH:mm:ss")
    }
  }
  export default {
    name: "bill-panel",
    data() {
      return {
        typeOptions,
        visible: false,
        panelMode: 'create',
        form: defaultForm()
      }
    },
    computed: {
      modelName() {
        return this.panelMode == 'create' ? "新建记录" : "编辑记录";
      },
      ...mapState({
        billList: state => state.billList
      }),
    },
    methods: {
      onChange() {

      },
      show(data) {
        if (data) {
          this.form = JSON.parse(JSON.stringify(data))
          this.panelMode = 'edit'
        } else {
          this.form = defaultForm()
          this.panelMode = 'create'
        }

        this.visible = true
      },
      handleOk(e) {
        console.log(e);

        if (this.panelMode == 'create') {  //创建
          this.billList.push(this.form)
        } else {    //编辑
          let index = _.findIndex(this.billList, (ele) => {
            return ele.id == this.form.id;
          })
          if (index > -1) {
            // this.billList[index] = this.form;
            this.$set(this.billList,index,this.form)
          }
        }


        this.$store.dispatch('saveBill', this.billList)



        this.$message.success(this.panelMode == 'create'?"创建成功":"删除成功");
        this.$emit("refresh")
        this.visible = false
      },
    }
  }
</script>

<style scoped lang="less">
  .bill-panel {

  }
</style>
