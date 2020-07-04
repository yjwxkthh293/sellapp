import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        goodslist: []
    },

    mutations: {
        initgoodslist(state, val) {
            state.goodslist = val

            // console.log( state.goodslist);


        },
        changeGoodsNum(state, item) {
            for (let obj of state.goodslist) {
                for (let child of obj.foods) {
                    // console.log(child.id,item.id,item.val);

                    if (child.id == item.id) {
                        child.num += item.val

                        return
                    }
                }
            }
        }
    },
    getters: {
        shopcarlist(state) {

            let arr = []

            // for (let obj of state.goodslist) {
            //     // console.log(obj);

            //     for (let child of obj.foods) {
            //         if (child.num > 0) {
            //             arr.push(child)
            //         }
            //     }

            state.goodslist.forEach(obj => {
                obj.foods.forEach(item => {
                    if (item.num > 0) {
                        arr.push(item)
                    }
                })
            })

            return arr
        }
    }
})

export default store