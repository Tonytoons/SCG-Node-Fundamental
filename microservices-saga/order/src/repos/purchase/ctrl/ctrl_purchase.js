/**
 * @summary Controller of purchase class
 * holds a business logic
 * @author Amarit Jarasjindarat
 *
 * Created at : 2019-15-07
 */

 class CtrlPurchase {

    /**
     * Events 
     * @param {*} events and event base callback
     */
    constructor(events) {
        this.events = events
    }

    /**
     * Bundle a purchase data into order
     * @param {*} order an order data
     */
    bundlePurchase(order) {
        order.purchases = [{ id: 'purchase_id1', name: 'purchase_name1' },
                           { id: 'purchase_id2', name: 'purchase_name2' }]
        
        this.events[Symbol.iterator]().return(order)
    }

    /**
     * Bundle a purchase data into order
     * @param {*} order an order data
     */
    bundlePurchases(orders) {
        orders.forEach(order => {
            order.purchases = [{ id: 'purchase_id1', name: 'purchase_name1' },
                           { id: 'purchase_id2', name: 'purchase_name2' }]
        })
        
        this.events[Symbol.iterator]().return(orders)
    }
 }

 module.exports = CtrlPurchase