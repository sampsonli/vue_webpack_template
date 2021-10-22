import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '~/store';

@Module({ dynamic: true, store, name: 'h5', namespaced: true })
class H5Module extends VuexModule {
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

export default H5Module;
