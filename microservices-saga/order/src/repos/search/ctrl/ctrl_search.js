/**
 * @summary Controller of search class
 * holds a business logic
 * @author Amarit Jarasjindarat
 *
 * Created at : 2019-15-07
 */

 class CtrlSearch {

    /**
     * Events 
     * @param {*} events and event base callback
     */
    constructor(events) {
        this.events = events
    }

    /**
     * filter search result
     * @param {*} order an order data
     */
    filterSearch(orders, filter) {
        const filterOrders = []
        orders.forEach(order => {
            // mock filter by name
            if (order.name !== filter.name) {
                filterOrders.push(order)
            }
        })
        this.events[Symbol.iterator]().filterComplete(filterOrders)
    }
 }

 module.exports = CtrlSearch