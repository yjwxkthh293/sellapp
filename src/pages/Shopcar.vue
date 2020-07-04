<template>
  <div>
    <div class="sell">
      <span>已满足起送价</span>
    </div>

    <div class="title">
      <p>购物车</p>
      <p class="delete">
        <van-icon name="delete" size="18" />清空购物车
      </p>
    </div>

    <div class="goods_div">
      <div v-for="(item,index) in getshopcarlist" :key="index" class="shop_div">
        <p class="name">{{item.name}}</p>
        <p class="price">￥{{ gettotalprice }}</p>

        <div class="circle">
          <img
            v-show="item.num > 0"
            src="@/assets/images/remove_circle_outline.svg"
            @click="changeNum(-1,item.id)"
          />
          <span v-show="item.num > 0" class="num">{{item.num}}</span>
          <img src="@/assets/images/add_circle.svg" @click="changeNum(1,item.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showboard: false
    };
  },
  methods: {
    changeNum(val, id) {
      this.$store.commit("changeGoodsNum", { val, id });
      // console.log(this.goodsList);
      // console.log(val, id);
    }
  },

  created() {
    console.log(this.getshopcarlist);
  },
  computed: {
    getshopcarlist() {
      return this.$store.getters.shopcarlist;
    },

    gettotalprice() {
      let total = 0;

      for (let obj of this.getshopcarlist) {
        total += obj.price * obj.num;
      }

      return total.toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.sell {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background: #fff1d0;
  text-align: center;
  span {
    width: 100%;
  }
}

.name {
  width: 50%;
}
.price {
  color: red;
}
.title {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  background: #f4f4f4;

  .delete {
    display: flex;

    .van-icon {
      padding: 0 5px;
      margin-top: 1px;
    }
  }
}
.shop_div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin: 0 10px;
  padding: 10px 0;
  .circle {
    width: 100px;
    display: flex;
    justify-content: space-around;
    img {
      width: 30px;
      height: 30px;
    }
    .num {
      position: relative;
      top: 8px;
      left: 0;
    }
  }
}

.goods_div {
  display: flex;
  flex-direction: column;
  max-height: 150px;
  overflow-x: scroll;
}
</style>