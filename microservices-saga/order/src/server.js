/**
 * @summary server grpc function of order
 * @author Amarit Jarasjindarat
 *
 * Created at : 2019-15-07
 */

const PROTO_PATH = __dirname + '/../protos/order_guide.proto'
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
      PROTO_PATH,
      { keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      })

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
// The protoDescriptor object has the full package hierarchy
const orderguide = protoDescriptor.orderguide
// console.log("orderguide", orderguide)

/**
 * Import Presenter
 */
const PurchasePresenter = require('./repos/purchase/presenter/presenter.js')
const SearchPresenter = require('./repos/search/presenter/presenter.js')
const purchasePresenter = new PurchasePresenter()
const searchPresenter = new SearchPresenter()

/**
 * getOrder request handler. Gets an order with an id, 
 * and responds with a single object.
 * @param {EventEmitter} call Call object for the handler to process
 * @param {function(Error, feature)} callback Response callback
 */
function getOrder(call, callback) {
    purchasePresenter.find(call.request.id, function(order, errmsg) {
        if (errmsg) {
            return callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: errmsg.message,
              })
        }
        callback(null, order)
    })
}

/**
 * listOrders request handler. Gets all list of orders.
 * @param {Writable} call Writable stream for responses with an additional
 * request property for the request value.
 */
function listOrders(call) {
    purchasePresenter.list(function(orders, err) {
        if (err) {
            return callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "Length of `Name` cannot be more than 10 characters",
              })
        }
        orders.forEach(order => {
            call.write(order)
        })
        call.end()
    })
}

/**
 * listOrders request handler. Gets all list of orders.
 * @param {Writable} call Writable stream for responses with an additional
 * request property for the request value.
 */
function searchOrders(call) {
    searchPresenter.search(call.request, function(orders, errmsg) {
        if (errmsg) {
            return callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: errmsg.message,
              })
        }
        orders.forEach(order => {
            call.write(order)
        })
        call.end()
    })
}

/**
 * createOrder request handler. Create an order with a product, 
 * and responds with a single object.
 * @param {EventEmitter} call Call object for the handler to process
 * @param {function(Error, feature)} callback Response callback
 */
function createOrder(call, callback) {
    purchasePresenter.createPurchase(call.request.products, function(order, errmsg) {
        if (errmsg) {
            return callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: errmsg.message,
              })
        }
        callback(null, order)
    })
}

/**
 * Setup gRPC services
 */
function getServer() {
    const server = new grpc.Server()
    server.addService(orderguide.OrderGuide.service, {
        getOrder: getOrder,
        listOrders: listOrders,
        searchOrders: searchOrders,
        createOrder: createOrder
    })
    return server
}
  
const routeServer = getServer()
routeServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
routeServer.start()

console.log('grpc is working on port 50051')