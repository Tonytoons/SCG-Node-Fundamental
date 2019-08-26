/**
 * @summary mock db connection class
 * retrieve data from db
 * @author Amarit Jarasjindarat
 *
 * Created at : 2019-15-07
 */

 class MockDB {

    /**
     * Events 
     * @param {*} events and event base callback
     */
    constructor(events) {
        this.events = events
    }

    /**
     * retrieve a single order
     * @param {*} id of the order
     */
    retrieve(id) {
        setTimeout(() => {
            switch(id) {
                case 'id1':
                    const order = { id: id, name: 'user1' }
                    this.events[Symbol.iterator]().orderFound(order)
                    break
                default:
                    const errmsg = { message: 'order does not exist' }
                    this.events[Symbol.iterator]().orderNotFound(errmsg)
            }
        }, 1000)
    }

    /**
     * list of orders
     */
    list() {
        setTimeout(() => {
            const orders = [{ id: 'id1', name: 'user1' }, { id: 'id2', name: 'user2' }]
            this.events[Symbol.iterator]().ordersFound(orders)
        }, 1000)
    }

    /**
     * create a single order
     * @param {*} products list of products
     */
    create(products) {
        setTimeout(() => {
            const order = { id: 'id1', name: 'user1', products: products }
            this.events[Symbol.iterator]().return(order)
        }, 1000)
    }
 }

 module.exports = MockDB