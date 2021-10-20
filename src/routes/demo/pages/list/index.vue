<style scoped src="./style.css"></style>
<template>
    <div class="l-full l-flex-column container">
        <div class="header">
            <div
                class="h-ct"
                v-tap="{methods: model.changeTitle}"
            >
                <i class="h-back" />
                <span class="h-title">
                    漫话历史-{{model.title}}
                </span>
            </div>
        </div>
        <div class="l-flex-1 l-relative">
            <div
                class="l-full"
                ref="container"
            >
               tttttttttttttt-{{model.bb}}
            </div>
        </div>
    </div>
</template>
<script>
    import { Component, Vue } from 'vue-property-decorator'
    import { getModule } from 'vuex-module-decorators';
    import DemoModule from '../../modules/DemoModule';
    const model = getModule(DemoModule)
    
    @Component({ name: 'List'})
    class List extends Vue {
        /**
         * @type {DemoModule}
         */
        model = model;
        mounted() {
            
        }

    }
    export default List;
</script>
