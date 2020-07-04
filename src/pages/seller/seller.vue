<template>
  <div class="seller">
    <div class="seller_div">
      <div class="top">
        <div class="left">
          <h2>{{data.name}}</h2>
          <div class="deliveryPrice">
            <van-rate v-model="data.deliveryPrice" />
            <p>月售{{data.sellCount}}单</p>
          </div>
        </div>
        <div class="right">
          <van-icon name="like" size="30" color="red" />
          <p>已收藏</p>
        </div>
      </div>
      <div class="bottom">
        <div class="minPrice">
          <label>起送价</label>
          <p class="min">
            <span>{{data.minPrice}}</span>元
          </p>
        </div>
        <div class="deliveryPrice">
          <label>商家配送</label>
          <p class="delivery">
            <span>{{data.deliveryPrice}}</span>元
          </p>
        </div>
        <div>
          <label>平均配送时间</label>
          <p class="time">
            <span>{{data.deliveryTime}}</span>分钟
          </p>
        </div>
      </div>
    </div>

    <div class="notice">
      <h4>公告与活动</h4>
      <p class="bulletin">{{data.bulletin}}</p>
      <ul>
        <li class="supports" v-for="item in data.supports" :key="item.supports">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Seller } from "../../api/apis";

export default {
  data() {
    return {
      data: {}
    };
  },

  created() {
    Seller().then(res => {
      this.data = res.data.data;
      console.log(this.data);
    });
  }
};
</script>

<style lang="scss" scoped>
.seller {
  height: 650px;
  background: #f4f5f7;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  .seller_div {
    border-top: 1px solid #ccc;
    background: #fff;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px;
      border-bottom: 1px solid #ccc;

      .deliveryPrice {
        padding-top: 10px;
        display: flex;
        // align-items: center;
        p {
          text-indent: 10px;
        }
      }
      .right {
        text-align: center;
      }
    }
    .bottom {
      padding: 20px 0;
      display: flex;
      justify-content: space-evenly;

      label {
        color: #ccc;
      }

      p {
        text-align: center;
        span {
          font-size: 28px;
        }
      }

      .minPrice {
        border-right: 1px solid #ccc;
        padding-right: 30px;
      }
      .deliveryPrice {
        border-right: 1px solid #ccc;
        padding-right: 30px;
      }
    }
  }
  .notice {
    margin-top: 20px;
    background: #fff;
    padding: 20px;

    .bulletin {
      color: red;
      padding: 20px;
      line-height: 30px;
      border-bottom: 1px solid #ccc;
    }

    .supports {
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>