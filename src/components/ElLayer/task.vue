<!--
@Author: 左盐
@Date:   2018-03-24 15:30:33
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-24 15:49:07
-->

<template lang="html">
    <h2 class="vl-task" @click="isOpen" :id="id + '_task'">{{title}}</h2>
</template>

<script>
    import helper from './helper/helper.js';

    export default {
        data() {
            return {
                id: '',
                type: 0, //0（alert默认）1（页面层）2（iframe层）3（loading）4（tips层）,5(msg)
                title: '信息',
                content: '',
                area: 'auto',
                offset: 'auto',
                icon: -1,
                btn: '确定',
                time: 0,
                shade: true,
                yes: '',
                cancel: ''
            }
        },
        props: {

        },
        methods: {
            isOpen(){
                let task = document.getElementById(this.id);
                if (task.style.display === 'none'){
                    task.style.display = 'inherit'
                }
                this.resetZIndex()
            },
            resetZIndex() {
                let doms = document.querySelectorAll('.vl-notify-iframe');
                let max = 0;
                let dom = null;
                for (let i = 0, len = doms.length; i < len; i++) {
                    let value = parseInt(this.getStyle(doms[i].id, 'z-index'));
                    if (this.id == doms[i].id) {
                        dom = doms[i];
                    }
                    if (value > max){
                        max = value;
                    }
                }
                dom.style.zIndex = max + 1;
            },
            getStyle(el, styleProp) {
                var x = document.getElementById(el);
                if (window.getComputedStyle) {
                    var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
                } else if (x.currentStyle) {
                    var y = x.currentStyle[styleProp];
                }
                return y;
            },
            close(event) {
                if (this.shadeClose) {
                    helper.clickMaskCloseAll(event, this.layer, this.id);
                }
            },

        },
    }
</script>

<style lang="css">
    .vl-task{
        box-sizing: border-box;
        width: 85px;
        height: 44px;
        float: right;
        text-align: center;
        line-height: 43px;
        background-color: #F8F8F8;
        border: 1px solid #eee;
        font-size: 14px;
        -moz-user-select: -moz-none;
        -webkit-user-select: none;
        margin: 0;

    }
    .selected{
        box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.3);
    }
</style>
