<!--
@Author: 左盐
@Date:   2018-03-24 15:30:33
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-24 15:49:07
-->

<template lang="html">
    <div class="vl-notify-task" ></div>
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
        },
    }
</script>

<style lang="css">
    .vl-notify-task {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAXCAYAAABJXhw0AAABRUlEQVR42u3TUUuDUBQH8PNpepJVzlwuDTEnJPoiDba22F5qzkFCgik0SXB+7na2Llgo233Ybjf2cLg//xz/cB8uAMDZP5nTRU4XOci0Wq0r8iEIgkTMYb4NRFHs1Lndbl/TmFXP5iKyLHdJoCgKlav/Mu1RVVUjgaZpt7tc3W8yo55tYBiGzrM3F+n1encksCzL3OWmfaY9tm1bJODc28BxnPs6u65r05hVDz72c9/3+3h++6HifoP/3A4EQTDQdf0Cp8mLxWJIk7PoAdM0L3HCMBxX/LSHx3v4aD2wfv1iFEVTPHk2xHH8vH40Eg7PBs/zJJwkSebEaZoGdXmTm/aP2QPDwUBeLpeveFI4pNw/eA9kWfY2Gj12cH45ojTTHphOJgpOnufvPBtms5duURQfePJsKMsyn/v+Dc4Pr1afVGbc8wVKPsFj35kLRQAAAABJRU5ErkJggg==");
        width: 100%;
        height: 45px;
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>
