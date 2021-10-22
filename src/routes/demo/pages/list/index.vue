<style src="./style.less"></style>
<template>
    <div class="demo-container">
        <div class="header">
            <div
                class="h-ct"
                v-tap="{methods: model.changeTitle}"
            >
                <i class="h-back" />
                <span class="h-title">
                    漫话历史-{{ model.title }}
                </span>
            </div>
        </div>
        <div class="content">
            tttttttttttttt-{{ model.title }}
        </div>
    </div>
</template>
<script>
    import { getModule } from 'vuex-module-decorators';
    import DemoModule from '../../modules/DemoModule';
    export default {
        name: 'List',
        data: () => ({ model: getModule(DemoModule) }),
    };

</script>
