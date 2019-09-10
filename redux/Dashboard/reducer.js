import actions from "./actions";

const initialState = {
  //
  inventoryCount: 0,
  buyersCount: 0,
  cartSizeAverage: 0,
  cartValueAverage: 0,
  discount: 0,
  couponSoldCount: 0,
  unusedCouponAmount: 0,
  taxCollected: 0,

  //
  paymentMethods: [],
  topSellingProduct: [],
  //
  topSellingCashiersByRevenue: [],
  topSellingCashiersBySoldProducts: [],
  topSellingCashiersByGrossProfit: [],
  //

  topCutomersByRevenue: [],
  topCustomersBySoldProduct: [],

  //

  topSellingProduct: [],
  topGrossingProduct: [],

  //
  revenues: 0,
  profits: 0,
  salesCounts: 0,
  productSoldCounts: 0,
  salesCount: [],
  productSoldCount: [],
  revenue: [],
  profit: []
};

export default function cashReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_GRAPH_DATA:
      return {
        ...state,

        //
        inventoryCount: action.inventoryCount,
        buyersCount: action.buyersCount,
        cartSizeAverage: action.cartSizeAverage,
        cartValueAverage: action.cartValueAverage,
        discount: action.discount,
        couponSoldCount: action.couponSoldCount,
        unusedCouponAmount: action.unusedCouponAmount,
        taxCollected: action.taxCollected,

        //
        topSellingProduct: action.topSellingProduct,
        paymentMethods: action.paymentMethods,
        //
        topSellingCashiersByRevenue: action.topSellingCashiersByRevenue,
        topSellingCashiersBySoldProducts:
          action.topSellingCashiersBySoldProducts,
        topSellingCashiersByGrossProfit: action.topSellingCashiersByGrossProfit,

        //

        topCutomersByRevenue: action.topCutomersByRevenue,
        topCustomersBySoldProduct: action.topCustomersBySoldProduct,

        //

        topSellingProduct: action.topSellingProduct,
        topGrossingProduct: action.topGrossingProduct,
        //
        revenues: action.revenues,
        profits: action.profits,
        salesCounts: action.salesCounts,
        productSoldCounts: action.productSoldCounts,
        salesCount: action.salesCount,
        productSoldCount: action.productSoldCount,
        revenue: action.revenue,
        profit: action.profit
      };
    default:
      return state;
  }
}
