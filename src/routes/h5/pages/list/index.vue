<style src="./style.less"></style>
<template>
    <div class="h5-container">
        <div class="header">
            <div
                class="h-ct"
            >
                <i class="h-back" />
                <span class="h-title">
                    漫话历史H5-{{ model.title }}
                </span>
            </div>
        </div>
        <div class="content">
            lichun-{{ model.title }}
            <button
                @click="model.changeTitle()"
                type="primary"
            >
                hello-h5
            </button>
        </div>
    </div>
</template>
<script>
    import { getModule } from 'vuex-module-decorators';
    import H5Module from '../../modules/H5Module';
    export default {
        name: 'List',
        data: () => ({ model: getModule(H5Module) }),
    };
</script>
