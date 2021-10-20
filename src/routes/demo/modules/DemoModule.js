import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '~/store';

@Module({ dynamic: true, store, name: 'demo', namespaced: true })
class DemoModule extends VuexModule {
    aa = 1234;

    title = 'hello world'

    bb = 'hello world';

    get aplusb () {
        return this.aa + this.bb;
    }

    @Mutation
    SET_TITLE (title) {
        this.title = title;
    }

    @Action
    changeTitle() {

        // this.context.commit('SET_TITLE', Math.floor(Math.random() * 1000))
        this.SET_TITLE(Math.floor(Math.random() * 1000))
    }
}

export default DemoModule;
