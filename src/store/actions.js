import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'

export default {
  //点击按钮触发这个函数
  addCart(context, payload) {
    return new Promise((reslove, reject) => {
      /* 使用find方法获得state中cartList里面
           item.id等于payload传进来的对象的id
           并保存在变量oldProduct中 */
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      )
      if (oldProduct) {
        //判断oldProduct是否有值 ture：加一 ；false：设count为一，并push到cartList中
        context.commit(ADD_COUNTER, oldProduct)
        reslove('商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        reslove('添加商品成功')
      }
    })
  }
}
