import { AsyncStorage } from "react-native";
import axios from "axios";

const actions = {
  GET_GRAPH_DATA: "GET_GRAPH_DATA",
  fetchGraphsData: () => dispatch => {
    console.log("dashboard_analytics method");

    AsyncStorage.getItem("token", (err, result) => {
      axios
        .get(
          "https://stagingbe.transacthq.com/api/clientadmin/dashboard-analytics",
          {
            headers: {
              Authorization: result
            }
          }
        )
        .then(res => {
          console.log("dashboard_analytics_res", res);
          let sales = [];
          let product = [];
          let rev = [];
          let prof = [];
          res.data.WeeklyDashboardCharts.forEach(day => {
            sales.push(day.salesCount);
            product.push(day.productSoldCount);
            rev.push(day.revenue);
            prof.push(day.profit);
          });
          dispatch({
            type: actions.GET_GRAPH_DATA,
            //
            inventoryCount: res.data.inventoryCount,
            buyersCount: res.data.buyersCount,
            cartSizeAverage: res.data.cartSizeAverage,
            cartValueAverage: res.data.cartValueAverage,
            discount: res.data.discount,
            couponSoldCount: res.data.couponSoldCount,
            unusedCouponAmount: res.data.unusedCouponAmount,
            taxCollected: res.data.taxCollected,

            //
            topSellingProduct: res.data.top5Analytics.topSellingProduct,
            paymentMethods: res.data.top5Analytics.paymentMethods,
            //
            topSellingCashiersByRevenue:
              res.data.top5Analytics.topSellingCashiersByRevenue,
            topSellingCashiersBySoldProducts:
              res.data.top5Analytics.topSellingCashiersBySoldProducts,
            topSellingCashiersByGrossProfit:
              res.data.top5Analytics.topSellingCashiersByGrossProfit,
            //

            topCustomersBySoldProduct:
              res.data.top5Analytics.topCustomersBySoldProduct,
            topCutomersByRevenue: res.data.top5Analytics.topCutomersByRevenue,
            //
            topSellingProduct: res.data.top5Analytics.topSellingProduct,
            topGrossingProduct: res.data.top5Analytics.topGrossingProduct,

            //
            revenues: res.data.revenue,
            profits: res.data.profit,
            salesCounts: res.data.salesCount,
            productSoldCounts: res.data.productSoldCount,
            salesCount: sales,
            productSoldCount: product,
            revenue: rev,
            profit: prof
          });
        })
        .catch(err => {
          console.log("dashboard_analytics_error", err);
        });
    });
  }
};

export default actions;
