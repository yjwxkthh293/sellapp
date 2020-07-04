<template>
  <div id="app">
    <div v-show="isshow" style="height:100%;">
      <div class="header">
        <div class="top">
          <img :src="data.avatar" alt class="avatar" />

          <div class="title">
            <div class="brand">
              <img src="../assets/images/brand@2x.png" alt />
              <h2 class="name">{{data.name}}</h2>
            </div>

            <p class="time">{{ data.description}} / {{data.deliveryTime}}分钟送达</p>
            <div class="support">
              <img src="../assets/images/decrease_1@2x.png" alt />
              <div v-for="item in data.supports" :key="item">
                <label class="supports">{{item}}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="buttom">
          <van-notice-bar left-icon="volume-o" :text="data.bulletin" />
        </div>
      </div>

      <div class="center">
        <div class="router-box">
          <router-link to="/">
            <span>商品</span>
          </router-link>
          <router-link to="/ratings">
            <span>评价</span>
          </router-link>
          <router-link to="/seller">
            <span>商家</span>
          </router-link>
        </div>
      </div>
      <router-view></router-view>

      <div class="footer">
        <div class="img_div">
          <div class="img_box">
            <van-icon name="shopping-cart" size="30" @click="showboard = !showboard" />
          </div>
        </div>

        <div class="price_div">
          <h2>￥0</h2>
          <p>另需配送费￥4元</p>
          <div>
            <h4>￥20起送</h4>
          </div>
        </div>
      </div>

      <transition name="slide-fade">
        <Shopcar class="show_box" v-if="showboard"></Shopcar>
      </transition>
    </div>

    <van-loading v-show="!isshow" color="#1989fa" />
  </div>
</template>


<script>
import { Seller, baseURL } from "../api/apis";
import Shopcar from "../pages/Shopcar";

export default {
  data() {
    return {
      data: {},

      isshow: false,
      showboard: false
    };
  },

  created() {
    setTimeout(() => {
      Seller().then(res => {
        let obj = res.data.data;
        obj.avatar = obj.avatar.replace("http://127.0.0.1:5000", baseURL);
        this.data = obj;
        this.isshow = true;
      });
    }, 1000);
  },

  components: {
    Shopcar
  }
};
</script>

<style lang="scss" scope>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

.van-loading {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  height: 100%;
  .header {
    .top {
      background: #ddd;
      padding: 20px;
      display: flex;

      .avatar {
        width: 100px;
        height: 100px;
      }
      .title {
        color: #fff;
        // padding: 0 20px;
        padding-left: 20px;
        .brand {
          display: flex;
          // align-items: center;

          img {
            width: 40px;
            height: 25px;
            margin-top: 4px;
          }
          .name {
            padding: 0 10px;
          }
        }
        .time {
          padding-top: 10px;
        }
        .support {
          display: flex;
          padding-top: 10px;
          img {
            width: 20px;
            height: 20px;
          }
          .supports {
            font-size: 14px;
            margin-top: 4px;
          }
        }
      }
    }
    .buttom {
      // height: 30px;
      // background: #ccc;
      .van-notice-bar {
        background: #ccc;
      }
    }
  }
  .center {
    flex: 1;
    .router-box {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      display: flex;
      justify-content: space-around;

      a {
        color: #ddd;
      }
    }
  }
  .footer {
    width: 100%;
    height: 50px;
    background: #131d26;
    color: #808589;
    position: fixed;
    bottom: 0;
    display: flex;
    // justify-content: space-around;
    z-index: 9999;

    .img_div {
      width: 80px;
      height: 65px;
      position: relative;
      bottom: 18px;
      left: 10px;
      background: #131d26;
      border-radius: 50%;

      .img_box {
        position: relative;
        bottom: -10px;
        left: 8px;
        width: 50px;
        height: 50px;
        background: #2c353e;
        border-radius: 50%;

        .van-icon {
          padding: 10px;
        }
      }
    }
    .price_div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        text-indent: 14px;
        width: 60px;
        border-right: 1px solid #2b343b;
      }
      p {
        font-size: 14px;
      }
      div {
        width: 100px;
        height: 100%;
        // line-height: 20px;
        background: #2b343b;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.show_box {
  width: 100%;
  height: 200px;
  background: #fff;
  position: fixed;
  bottom: 50px;
  overflow: auto;
}
</style>
