<template>
  <div class="myorder">
    <!-- 右侧订单 -->
    <div class="order_info">
      <div class="right_wrap">
        <form action="/userAPI.php/Order/orderList.html" method="get">
          <div class="order_status">
            <div>
              <ul class="all_orders">
                <a href>
                  <li id="all" class="statusCheck current">全部订单</li>
                </a>
                <a href>
                  <li id="topay" class="statusCheckWAIT_BUYER_PAY">待付款</li>
                </a>
                <a href>
                  <li id="waitsend" class="statusCheckWAIT_SELLER_SEND_GOODS">待发货</li>
                </a>
                <a href>
                  <li id="tosign" class="statusCheckWAIT_BUYER_CONFIRM_GOODS">待收货</li>
                </a>
                <!--<a href="/userAPI.php/Order/orderList/status/WAIT_COMMENT.html">-->
                <!--<li id="write_review" class="statusCheckWAIT_COMMENT">待评价</li>-->
                <!--</a>-->
                <a href>
                  <li id="write_review" class="statusCheckNO_APPLY">退换货</li>
                </a>
              </ul>
            </div>
            <div class="order_search">
              <div class="order_num">
                共
                <span>{{$store.state.cartData.length}}</span>条订单
              </div>
              <input type="text" placeholder="请输入订单号/商品名称" name="tid" value />
              <!--<a href="" class="order_search_btn">搜索订单</a>-->
              <input type="submit" value="搜索订单" class="order_search_btn" />
            </div>
          </div>
        </form>
        <input type="hidden" name="status" id="status" value />
        <div style="clear:both;"></div>
        <div
          style="text-align: left; margin: 4px auto 0px;text-indent: 2em;width: 920px;line-height:16px;color:red"
        >
          现金与积分混合支付的订单，需先支付积分再使用支付宝支付现金部分金额，如果积分支付成功，支付宝支付不成功，则积分将在24小时后返回个人账户，或在【个人中心】查询当前订单，点击【取消订单】，可即时返回支付积分。
          <br />
          <p style="text-indent: 2em">订单退换货请于工作日联系人工客服办理：400-833-0288</p>
        </div>
        <div class="order_details">
          <div class="order_details_title" style="margin-bottom: 20px;">
            <div class="name">商品详情</div>
            <div class="price">单价</div>
            <div class="number">数量</div>
            <div class="aftersale">商品操作</div>
            <div class="totalmoney">订单总金额</div>
            <div class="status">订单状态</div>
            <div class="operation">订单操作</div>
          </div>
          <!-- 订单1 -->
          <div class="my_order" v-for="(item,i) in orderData" :key="i">
            <div class="orders closed">
              <!-- 订单号 -->
              <div class="orderid">
                <div class="time">2020-06-06 14:16:34&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div>订单编号：200606141634079586</div>
                
              </div>
              <!-- 订单详情 -->
              <div class="order_list">
                <div class="order_preview">
                  <div class="pics">
                    <!-- <a href="https://shop.lishe.cn/Info/index/itemId/136444" target="_balck"> -->
                    <a href="javascript:void(0)" onclick="gotoItemInfo('136444');">
                      <img
                        :src="item.cover"
                        width="78px"
                        height="78px"
                      />
                    </a>
                  </div>
                  <div class="goods_name">
                    <p>{{item.name}}</p>
                    <p class="category"></p>
                  </div>
                  <div class="perprice">
                    <br />{{item.price}}
                  </div>
                  <div class="ammount">&times;{{item.num}}</div>
                  <div class="ammount" style="margin-left: 50px;">
                    <a href="/userAPI.php/Order/applyAfterSaleTwo/aftersales_bn/">无售后</a>
                  </div>
                </div>
                <div class="paid_money">
                  <span>{{parseInt(item.price)*item.num}}元</span>
                  <br />(含运费：&nbsp;0积分)
                </div>

                <div class="order_progress">
                  <span v-if="item.payStatus==0">待付款</span>
                  <span v-if="item.payStatus==1">待发货</span>
                  <br />
                  <a href="#">订单详情</a>
                </div>
                <div class="order_operation" v-if="item.payStatus==0">等待付款</div>
                <div class="order_operation" v-if="item.payStatus==1">付款成功</div>
                <!--用户操作状态-->
              </div>
            </div>
            <div class="order_details_btn">
              <div class="order_left">
                <div class="payment_id">支付单号：P200606141634795861</div>
              </div>
              <div class="order_btns" v-if="item.payStatus==0">
                <a
                  href="javascript:void(0);"
                  class="paynow userOp userSubmit"
                  data-type="pay"
                  data-order-id="P200606141634795861"
                  data-status="PAY"
                >立即付款</a>
                <a
                  href="javascript:void(0);"
                  class="cancelOrd userOp userSubmit"
                  data-type="cancel"
                  data-order-id="P200606141634795861"
                  data-status="CANCEL"
                >取消订单</a>
              </div>

            </div>
          </div>

          <div class="pages">
            <div class="page1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "myorder",
  computed: {
	  ...mapGetters(["orderData"]),
  },
  methods: {
	  buy(){
	  }
  },
};
</script>

<style lang="less" scoped>
.myorder {
  font-size: 12px;
  color: black;

  a {
    &:hover {
      color: black !important;
    }
  }
}
a {
  color: black;
}

input {
  outline: none;
}

.order_info {
  float: left;
  width: 918px;
  height: auto;
  background-color: #fff;
  margin-left: 10px;
  color: #666;
  padding-bottom: 46px;
}

.right_wrap {
  width: 918px;
  height: 100%;
  margin: 0 auto;
  clear: both;
}

.order_status {
  height: 35px;
  margin-top: 15px;
}

.all_orders {
  float: left;
  height: 35px;
  text-align: center;

  li {
    float: left;
    line-height: 14px;
    font-size: 14px;
    padding: 11px 12px 8px 12px;
    border-bottom: 2px solid #ccc;
    cursor: pointer;
  }

  .current {
    border-color: #f55053;
  }
}

.order_search {
  float: right;
  font-size: 14px;
  line-height: 33px;

  input {
    display: inline-block;
    margin-left: 16px;
    height: 33px;
    padding-left: 16px;
    width: 182px;
    border: 1px solid #dadada;
    vertical-align: middle;
  }
}

.order_search_btn {
  display: inline-block;
  background-color: #f0f0f0;
  height: 33px;
  width: 98px;
  text-align: center;
  border: 1px solid #dadada;
  margin-left: -5px;
  vertical-align: middle;
}

.order_num {
  display: inline-block;
  color: #666;
  vertical-align: middle;
  padding-left: 20px;
  background: url(../../assets/imgs/icon/order.png) no-repeat;
  background-position: 2px 9px;

  span {
    color: #f55053;
  }

  .order_search_btn {
    display: inline-block;
    background-color: #f0f0f0;
    height: 33px;
    width: 98px;
    text-align: center;
    border: 1px solid #dadada;
    margin-left: -5px;
    vertical-align: middle;
  }

  input {
    display: inline-block;
    margin-left: 16px;
    height: 33px;
    padding-left: 16px;
    width: 182px;
    border: 1px solid #dadada;
    vertical-align: middle;
  }
}

.order_details_title {
  width: 918px;
  height: 33px;
  border: 1px solid #dadada;
  margin-top: 15px;
  margin-bottom: 30px;

  > div {
    display: inline-block;
    line-height: 35px;
    font-size: 14px;
    text-align: center;
    float: left;
  }
  .name {
    width: 333px;
  }
}

.price,
.number {
  width: 75px;
}

.aftersale {
  width: 90px;
}

.totalmoney {
  width: 140px;
}

.status,
.operation {
  width: 100px;
}

.orders {
  width: 920px;
  height: auto;
  border: 1px solid #ccc;
  margin-top: 10px;

  > div:nth-child(2) .order_preview {
    border-top: none;
  }
}

.orderid {
  width: 100%;
  height: 33px;
  padding-left: 15px;
  border-bottom: 1px solid #ccc;
  background-color: #f0f0f0;

  div {
    display: inline-block;
    float: left;
    line-height: 32px;
  }

  input {
    margin: 10px 11px 11px 13px;
    background: #fff;
  }

  .store_name {
    margin-left: 50px;
  }

  a {
    display: inline-block;
    vertical-align: bottom;
  }

  span a {
    display: inline-block;
    vertical-align: bottom;
    width: 33px;
    height: 33px;
    background: url(../../assets/imgs/icon/order_ic_service.png) no-repeat;
    background-position: -3px 0;
  }
}

.order_list {
  width: 920px;
  height: auto;
  overflow: hidden;
  display: table;

  > div:first-child {
    border-left: none;
  }

  > div {
    display: table-cell;
    border-left: 1px solid #ccc;
  }
}

.order_preview {
  width: 575px;
  min-height: 100px;
  display: table-row;
  border-top: 1px solid #ccc;
  float: left;

  > div {
    float: left;
  }
}

.pics {
  width: 78px;
  height: 78px;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-left: 10px;
}

.goods_name {
  width: 220px;
  margin-left: 10px;
  margin-top: 25px;

  .category {
    color: #999;
    margin-top: 6px;
  }
}

.perprice {
  width: 75px;
}

.perprice,
.ammount,
.return {
  margin-left: 26px;
  margin-top: 25px;
}

.paid_money {
  width: 140px;

  span {
    font-size: 14px;
    font-weight: bold;
    color: #f55053;
  }
}

.paid_money,
.order_progress,
.order_operation {
  text-align: center;
  vertical-align: middle;
  line-height: 20px;
}

.order_progress {
  width: 100px;
}

.order_operation {
  width: 100px;
}

.order_details_btn {
  border: 1px solid #dadada;
  height: 50px;
  border-top: none;
}

.order_left {
  float: left;

  .payment_id {
    width: 200px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
    display: inline-block;
    margin-left: 10px;
  }
}

.order_btns {
  display: inline-block;
  float: right;
  margin-right: 13px;

  .userOp {
    width: 70px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
    display: inline-block;
    margin-left: 10px;
  }

  .cancelOrd {
    background-color: #e6e6e6;
    border-radius: 3px;
  }
}

.paynow {
  display: block;
  width: 70px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  text-align: center;
  background-color: #f55053;
  color: #fff;
  border-radius: 3px;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
}

.orders {
  width: 918px;
  height: auto;
  border: 1px solid #ccc;
  margin-top: 10px;
}
</style>
