/**
 * @summary presenter class, use to present between ctrl and db
 * @author Amarit Jarasjindarat
 *
 * Created at : 2019-15-07
 */

const MockDB = require('../db/mockdb.js')

const CtrlSearch = require('../ctrl/ctrl_search.js')
const CtrlPurchase = require('../../purchase/ctrl/ctrl_purchase.js')

class SearchPresenter {

    constructor() {
        this.events = this.event()
        this.mockdb = new MockDB(this.events)
        this.ctrlSearch = new CtrlSearch(this.events)
        this.ctrlPurchase = new CtrlPurchase(this.events)
    }

    /**
     * search orders by a given keyword or id 
     * and do business logic in controller
     * @param {*} search id and keyword
     */
    search(search, calllback) {
        this.calllback = calllback
        this.mockdb.searchKeyword(search.keyword)
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
                    searchFound: function(orders) {
                        console.log('handle search orders found')
                        instance.ctrlSearch.filterSearch(orders, { name: 'user2' })
                        return { done: false, value: orders }
                    },
                    searchNotFound: function(errmsg) {
                        console.log('handle search orders not found')
                        instance.calllback(null, errmsg)
                        return { done: false, value: errmsg }
                    },
                    filterComplete: function(orders) {
                        console.log('handle filter orders complete')
                        instance.ctrlPurchase.bundlePurchases(orders, { name: 'user2' })
                        return { done: false, value: orders }
                    },
                    return: function(orders) {
                        console.log('do return')
                        instance.calllback(orders)
                        return { done: true, value: orders }
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

module.exports = SearchPresenter