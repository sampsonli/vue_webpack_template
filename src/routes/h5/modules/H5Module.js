import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '~/store';
const name = module.id.split('/').join('-');
@Module({ dynamic: true, store, name, namespaced: true })
class DemoModule extends VuexModule {
    title = 'hello world'

    @Mutation
    SET_TITLE (title) {
        this.title = title;
    }

    @Action
    changeTitle () {
        // this.context.commit('SET_TITLE', Math.floor(Math.random() * 1000))
        this.SET_TITLE(Math.floor(Math.random() * 1000));
    }
}

export default DemoModule;
