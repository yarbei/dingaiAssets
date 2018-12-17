<template>
    <div class="pending">
        <div :v-model="num">{{num.title}}</div>
        <div :v-model="num">{{num.data}}</div>
    </div>
</template>
<script>
export default {
    name:'Pending',
    props:{
        num:{
            type:Object
        }
    }
}
</script>
<style lang="less">
    .pending{
        width: 90%;
        height:100px;
        padding: 10px;
        color:#fff;
        background: #409eff url('./img/bg.png') center bottom /cover;
        border-radius: 10px;
        margin-bottom: 20px;
        div{
            margin:20px;
        }
    }
</style>
