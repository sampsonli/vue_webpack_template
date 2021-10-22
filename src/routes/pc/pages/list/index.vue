<style src="./style.less"></style>
<template>
    <div class="pc-container">
        <div class="header">
            <div
                class="h-ct"
            >
                <i class="h-back" />
                <span class="h-title">
                    漫话历史pc-{{ model.title }}
                </span>
            </div>
        </div>
        <div class="content">
            lichun-{{ model.title }}
            <button
                @click="model.changeTitle()"
                type="primary"
            >
                hello-pc
            </button>
        </div>
    </div>
</template>
<script>
    import { getModule } from 'vuex-module-decorators';
    import PcModule from '../../modules/PcModule';
    export default {
        name: 'PcList',
        data: () => ({ model: getModule(PcModule) }),
    };
</script>
