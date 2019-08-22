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
     * search orders by id
     * @param {*} id of the order
     */
    searchId(id) {
        setTimeout(() => {
            switch(id) {
                case 'id1':
                    const orders = [{ id: 'id1', name: 'user1' }, { id: 'id2', name: 'user2' }]
                    this.events[Symbol.iterator]().searchFound(orders)
                    break
                default:
                    const errmsg = { message: 'order does not exist' }
                    this.events[Symbol.iterator]().searchNotFound(errmsg)
            }
        }, 1000)
    }

    /**
     * search orders by keyword
     * @param {*} keyword of the order
     */
    searchKeyword(keyword) {
        setTimeout(() => {
            switch(keyword) {
                case 'user1':
                    const orders = [{ id: 'id1', name: 'user1' }, { id: 'id2', name: 'user2' }, { id: 'id3', name: 'user3' }]
                    this.events[Symbol.iterator]().searchFound(orders)
                    break
                default:
                    const errmsg = { message: 'order does not exist' }
                    this.events[Symbol.iterator]().searchNotFound(errmsg)
            }
        }, 1000)
    }
 }

 module.exports = MockDB