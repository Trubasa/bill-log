<template>
  <div class="bill-list">

    <a-button type="primary" class="mgb_5" @click="showCreatePanel">新建记录</a-button>

    <a-table :columns="columns"
             size="small"
             :rowKey="record => record.id"
             :dataSource="billList"
             :pagination="false">
      <template slot="index" slot-scope="text, record, index">
        <span>{{index+1}}</span>
      </template>

      <template slot="type" slot-scope="text, record, index">
        <span>{{$statusCollection.billType[text]}}</span>
      </template>

      <template slot="operation" slot-scope="text, record, index">
        <a @click="edit(record)">编辑</a>
        <a-popconfirm title='确定删除?' @confirm="() => deleteRow(record)">
          <a style="color: #ff5549;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>

    <!--记录新建、编辑-->
    <bill-panel ref="billPanel"></bill-panel>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import BillPanel from "../components/BillList/BillPanel";
  const columns = [/*{
    title: 'id',
    dataIndex: 'id',
  },*/ {
    title: '#',
    dataIndex: 'id',
    scopedSlots: { customRender: 'index' },

    width: 50
  },{
    title: '名称',
    dataIndex: 'name',
    width: 240
  }, {
    title: '类型',
    dataIndex: 'type',
    width: 120,
    scopedSlots: { customRender: 'type' },
  } ,{
    title: '金额(元)',
    dataIndex: 'price',
    width: 120
  } ,{
    title: '备注',
    dataIndex: 'remark',
    width: 240
  }, {
    title: '时间',
    dataIndex: 'create_time',
    width: 120
  }, {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 80
  }];

  const data = [{
    id: '1',
    name: 'John Brown',
    type:'me',
    money: '￥300,000.00',
    remark: 'New York No. 1 Lake Park',
  }];


  export default {
    name: "bill-list",
    components: {BillPanel},
    computed:{
      ...mapState({
        billList:state=>state.billList
      })
    },
    data(){
      return {
        data,
        columns,
      }
    },
    methods:{
      showCreatePanel(){
        this.$refs.billPanel.show();
      },
      edit(data){
        this.$refs.billPanel.show(data);
      },
      deleteRow(row){
        let index = _.findIndex(this.billList, (ele) => {
          return ele.id == row.id;
        })
        if (index > -1) {
          this.billList.splice(index,1)
        }
        this.$store.dispatch('saveBill', this.billList)
        this.$message.success("删除成功")
      }
    }
  }
</script>

<style scoped>
  .bill-list {
    padding: 5px;
  }
</style>
