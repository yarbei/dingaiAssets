<template>
<!-- 资产状态组件 -->
    <div class="asset-status" :style="{backgroundColor:assetsState[status].color}">
        {{assetsState[status].title}}
    </div>
</template>
<script>
export default {
    name:'DaAssetsState',
    props:{
        status:{
            default:0,
            required:true
        }
    },
    data(){
        return {
            assetsState:{
                0:{title:'闲置',color:'#67C23A'},
                1:{title:'在用',color:'#409EFF'},
                2:{title:'借用',color:'#1898D1'},
                3:{title:'维修中',color:'#E6A23C'},
                4:{title:'报废',color:'#F56C6C'},
                5:{title:'已归还',color:'#67C23A'},
                6:{title:'已调出',color:'#7465EA'},
                8:{title:'已完成',color:'#67C23A'},
                9:{title:'已取消',color:'#E6A23C'},
                10:{title:'已报修',color:'#409EFF'},
                11:{title:'已接单',color:'#1898D1'},
                12:{title:'维修中',color:'#E6A23C'},
                13:{title:'维修成功',color:'#67C23A'},
                14:{title:'维修失败',color:'#F56C6C'},
            }
        }
    }
}
</script>
<style lang="less">
.asset-status{
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
}
</style>
