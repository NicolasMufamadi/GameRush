const state = {
  nUsers: 0,
  nProducts: 0,
  nCategories: 0,
  nOrders: 0,
  nReviews: 0,
  mostSellingProduct: 0,
  nBannedUser: 0,
  nOutStoreProduct: 0
}

const mutations = {

}

const actions = {

}

const getters = {
  nUsers: state => state.nUsers,
  nProducts: state => state.nProducts,
  nCategories: state => state.nCategories,
  nOrders: state => state.nOrders,
  nReviews: state => state.nReviews,
  mostSellingProduct: state => state.mostSellingProduct,
  nBannedUser: state => state.nBannedUser,
  nOutStoreProduct: state => state.nOutStoreProduct
}

export default {
    state,
    mutations,
    actions,
    getters
}