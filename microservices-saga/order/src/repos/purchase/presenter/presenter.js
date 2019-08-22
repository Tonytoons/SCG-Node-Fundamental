/**
 * @summary presenter class, use to present between ctrl and db
 * @author Amarit Jarasjindarat
 *
 * Created at : 2019-15-07
 */

const MockDB = require('../db/mockdb.js')

const CtrlPurchase = require('../ctrl/ctrl_purchase.js')

class PurchasePresenter {

    constructor() {
        this.events = this.event()
        this.mockdb = new MockDB(this.events)
        this.ctrlPurchase = new CtrlPurchase(this.events)
    }

    /**
     * find a single order and do business logic in controller
     * @param {*} id of the order
     */
    find(id, callback) {
        this.callback = callback
        this.mockdb.retrieve(id)
    }

    /**
     * create a single order
     * @param {*} products product list
     */
    createPurchase(products, callback) {
        this.callback = callback
        this.mockdb.create(products)
    }

    /**
     * event callback from controller
     * specify an action what todo next
     */
    event() {
        const instance = this
        const events = { 
            [Symbol.iterator]() {
                return {
                    orderFound: function(order) {
                        console.log('handle order found')
                        order = instance.ctrlPurchase.bundlePurchase(order)
                        return { done: false, value: order }
                    },
                    orderNotFound: function(errmsg) {
                        console.log('handle order not found')
                        instance.callback(null, errmsg)
                        return { done: false, value: errmsg }
                    },
                    return: function(order) {
                        console.log('do return')
                        instance.callback(order)
                        return { done: true, value: order }
                    },
                    throw: function() {
                        console.log('do throw')
                        throw new Error('foo') 
                    }
                }
             }
          }
          return events
    }
}

module.exports = PurchasePresenter