<template>
  <div id="goods">
    <ul id="goods_left">
      <div>
        <li
          v-for="(item,index) in goodsList"
          :key="index"
          @click="clickLi(index)"
          :class="curSelect == index ? 'titleActive' : '' "
        >{{item.name}}</li>
      </div>
    </ul>

    <div id="goods_right" class="goods_list">
      <div>
        <div v-for="(item,index) in goodsList" :key="index" :id="index">
          <p class="title">{{item.name}}</p>

          <div v-for="(obj,index) in item.foods" :key="index" class="goods_img">
            <img :src="obj.imgUrl" alt class="imgUrl" />

            <div class="title_box">
              <p class="name">{{obj.name}}</p>

              <p class="sell">月售{{obj.sellCount}}份 好评率{{obj.rating}}%</p>
              <div class="icon">
                <p class="price">￥{{obj.price}}</p>

                <div class="circle">
                  <img
                    v-show="obj.num > 0"
                    src="../../assets/images/remove_circle_outline.svg"
                    @click="changeNum(-1,obj.id)"
                  />
                  <span v-show="obj.num > 0" class="num">{{obj.num}}</span>
                  <img src="../../assets/images/add_circle.svg" @click="changeNum(1,obj.id)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Goods_List, baseURL } from "../../api/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      curSelect: 0
    };
  },

  methods: {
    clickLi(i) {
      // console.log(i);
      this.goodsRight.scrollToElement(document.getElementById(i), 600);
    },

    changeNum(val, id) {
      this.$store.commit("changeGoodsNum", { val, id });
      // console.log(this.goodsList);
      // console.log(val, id);

    }
  },

  created() {
    Goods_List().then(res => {
      let obj = res.data.goodsList;

      for (let item of obj) {
        for (let i of item.foods) {
          i.imgUrl = i.imgUrl.replace("http://127.0.0.1:5000", baseURL);
        }
      }

      // 添加一个num
      for (let item of obj) {
        // console.log(item);
        for (let child of item.foods) {
          child.num = 0;
        }
      }

      this.$store.commit("initgoodslist", obj);

    });
  },
  mounted() {
    // console.log(this.data);

    new BScroll("#goods_left", {
      click: true
    });
    this.goodsRight = new BScroll("#goods_right", {
      probeType: 3,
      click: true
    });

    this.goodsRight.on("scroll", obj => {
      let _y = Math.abs(obj.y);
      // console.log(_y);

      for (let obj of this.getHeightArr) {
        if (_y >= obj.min && _y < obj.max) {
          this.curSelect = obj.index;
          break;
        }
      }
    });
  },

  computed: {
    getHeightArr() {
      let totalHeight = 0;
      let arr = [];

      for (let i = 0; i < this.goodsList.length; i++) {
        let divHeight = document.getElementById(i).offsetHeight;

        arr.push({
          index: i,
          max: totalHeight + divHeight,
          min: totalHeight
        });
        totalHeight += divHeight;
      }

      // console.log(arr);

      return arr;
    },

    goodsList() {
      return this.$store.state.goodslist;
    }
  }
};
</script>

<style lang="scss" scoped>
.titleActive {
  background: #fff;
}

#goods {
  height: 100%;
  display: flex;

  ul {
    width: 100px;
    background: #f4f5f7;
    height: 380px;
    overflow: auto;

    li {
      width: 100%;
      font-size: 14px;
      text-align: center;
      padding: 20px 0;
      // &:hover {
      //   background: #fff;
      // }
    }
  }
  .goods_list {
    width: 100%;
    height: 400px;
    overflow: auto;
    .title {
      height: 40px;
      line-height: 40px;
      text-indent: 20px;
      background: #f4f5f7;
      border-left: 4px solid #d9dde1;
    }
    .goods_img {
      padding: 20px;
      display: flex;
      border-bottom: 1px solid #f4f5f7;
      .imgUrl {
        width: 80px;
        height: 80px;
      }
      .title_box {
        flex: 1;
        // text-indent: 5px;
        font-size: 14px;
        margin-left: 10px;
        .name {
          font-weight: bold;
        }
        .sell {
          padding-top: 5px;
          color: #ccc;
        }

        .icon {
          // width: 166px;
          display: flex;
          justify-content: space-between;
          margin-top: 7px;
          .price {
            padding-top: 5px;
            color: red;
            font-size: 18px;
            font-weight: bold;
          }
          .circle {
            width: 100px;
            display: flex;
            justify-content: space-around;
            // padding-left: 10px;
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
      }
    }
  }
}
</style>