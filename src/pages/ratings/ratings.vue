<template>
  <div class="evaluate">
    <div class="evaluate-top">
      <div class="evaluate-left">
        <p class="num">3.9</p>
        <h4>综合评分</h4>
        <p class="exceed">高于周边商家69.2%</p>
      </div>

      <div class="evaluate-right">
        <!-- 综合评分 -->
        <div class="graded">
          <p>综合评分</p>
          <div>
            <van-rate v-model="value" />
          </div>
        </div>
        <!-- 服务态度 -->
        <div class="service">
          <p>服务态度</p>
          <div>
            <van-rate v-model="value1" />
          </div>
        </div>

        <div class="time">
          <p>
            送达时间
            <span style="margin-left: 8px;">44分钟</span>
          </p>
        </div>
      </div>
    </div>

    <div class="evaluate-bottom">
      <div class="badge">
        <p class="all">
          全部
          <span>57</span>
        </p>
        <p class="satisfaction">
          满意
          <span>47</span>
        </p>
        <p class="no-satisfaction">
          不满意
          <span>10</span>
        </p>
      </div>

      <div style="margin-left: 20px; padding:10px 0 ;display:flex;">
        <van-icon name="checked" size="22" color="#B7BABF" />
        <p>只看有内容的评论</p>
      </div>

      <div class="ratings" v-for="(item,index) in ratingslist" :key="index">
        <img :src="item.avatar" />

        <div class="user">
          <div class="rateTime">
            <p>{{item.username}}</p>
            <span>{{item.rateTime | listDate}}</span>
          </div>

          <!-- <Rate allow-half v-model="item.score" style=" margin-left: 0px;" /> -->
          <div style="display:flex;">
            <van-rate v-model="item.score" style=" margin-left: 0px;" />
            <p class="deliveryTime">{{item.deliveryTime}}分钟送达</p>
          </div>

          <p class="text">{{item.text}}</p>

          <div class="thumbs">
            <van-icon name="good-job" size="20" color="#00A0DC" />
            <div class="recommend">
              <p v-for="i in item.recommend" :key="i.value">{{i}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Ratings } from "@/api/apis.js";
import moment from "moment";

export default {
  data() {
    return {
      ratingslist: [],
      value: 3.9,
      value1: 4
    };
  },

  created() {
    Ratings().then(res => {
      console.log(res);

      this.ratingslist = res.data.data;
    });
  },

  filters: {
    listDate(v) {
      return moment(v).format("YYYY-MM-DD HH:MM:SS");
    }
  }
};
</script>

<style lang="less" scoped>
.evaluate {
  width: 100%;
  // height: 100%;
  border-top: 1px solid #ddd;
  background: #ddd;
  .evaluate-top {
    display: flex;
    justify-content: space-evenly;
    background: #fff;
    .evaluate-left {
      // width: 100%;
      height: 80px;
      text-align: center;
      border-right: 1px solid #ddd;
      margin: 20px 0;
      padding-right: 10px;
      .num {
        font-size: 22px;
        color: #fe9900;
      }
      .exceed {
        font-size: 12px;
        color: #c8cbd2;
        margin-top: 5px;
      }
    }
    .evaluate-right {
      color: #000;
      margin: 20px 0;
      line-height: 26px;
      .graded {
        display: flex;

        div {
          padding: 0 10px;
        }
      }
      .service {
        display: flex;

        div {
          padding: 0 10px;
        }
      }
    }
  }
  .evaluate-bottom {
    height: 500px;
    margin-top: 20px;
    background: #fff;
    .badge {
      margin-left: 20px;
      padding: 20px 0;
      display: flex;
      .all {
        width: 60px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 13px;
        text-align: center;
        background: #00a0dc;
        span {
          font-size: 10px;
        }
      }
      .satisfaction {
        width: 60px;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        text-align: center;
        background: #ccecf7;
        margin-left: 10px;
        span {
          font-size: 10px;
        }
      }
      .no-satisfaction {
        width: 70px;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        text-align: center;
        background: #eaebed;
        margin-left: 10px;
        span {
          font-size: 10px;
        }
      }
    }
    .ratings {
      // width: 100%;
      border-top: 1px solid #ccc;
      padding: 20px 0;
      padding-left: 20px;
      display: flex;
      img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
      }
      .user {
        width: 100%;
        margin-left: 10px;
        .deliveryTime {
          text-indent: 10px;
          // font-size: 12px;
        }
        .rateTime {
          width: 97%;
          display: flex;
          justify-content: space-between;
        }
        .thumbs {
          display: flex;
          .recommend {
            width: 275px;
            display: flex;
            p {
              width: 60px;
              text-align: center;
              border: 1px solid #ccc;
              margin-left: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .text {
          padding: 10px 0;
          font-weight: bold;
        }
      }
    }
  }
}
.ivu-rate {
  font-size: 14px;
  margin-left: 10px;
}
</style>