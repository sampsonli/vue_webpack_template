import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import store from '~/store';

@Module({ dynamic: true, store, name: 'demo', namespaced: true })
class DemoModule extends VuexModule {
    aa = 1234;

    bb = 'hello world';

    get aplusb () {
        return this.aa + this.bb;
    }

    @Mutation
    setAa (aa) {
        this.aa = aa;
    }
}

export default DemoModule;
