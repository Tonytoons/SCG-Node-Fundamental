/**
 * @summary client grpc function of order
 * @author Amarit Jarasjindarat
 *
 * Created at : 2019-15-07
 */

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

function getOrderGuide() {
    const PROTO_PATH = __dirname + '/../protos/order_guide.proto'

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
    return  protoDescriptor.orderguide
    // console.log("orderguide", orderguide)
}

function getStockGuide() {
    const PROTO_PATH = __dirname + '/../../stock/protos/stock_guide.proto'

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
    return  protoDescriptor.stockguide
    // console.log("orderguide", orderguide)
}

function main() {
    const orderguide = getOrderGuide()

    const client = new orderguide.OrderGuide('localhost:50051', grpc.credentials.createInsecure())
    let id = 'id1'
    let keyword = 'user1'

    // client.getOrder({ id: id }, function(err, response) {
    //     console.log('err:', err)
    //     console.log('getOrder:', response)
    // })

    const call = client.listOrders({ index: 1, limit: 20 })
    call.on('data', function(order) {
      console.log('data listOrders', order)
    })
    call.on('end', function() {
      console.log('end listOrders')
    })
    call.on('error', function(e) {
      console.log('error listOrders', e)
    })
    call.on('status', function(status) {
      console.log('status listOrders', status)
    })

    // const call = client.searchOrders({ id: id, keyword: keyword })
    // call.on('data', function(order) {
    //   console.log('data searchOrders', order)
    // })
    // call.on('end', function() {
    //   console.log('end searchOrders')
    // })
    // call.on('error', function(e) {
    //   console.log('error searchOrders', e)
    // })
    // call.on('status', function(status) {
    //   console.log('status searchOrders', status)
    // })
}

function createOrder() {
    const orderguide = getOrderGuide()
    const stockguide = getStockGuide()

    const clientOrder = new orderguide.OrderGuide('localhost:50051', grpc.credentials.createInsecure())
    const clientStock = new stockguide.StockGuide('localhost:50052', grpc.credentials.createInsecure())

    const products = { products: [{ id: 'id1', name: 'product_name1', price: 10 }, { id: 'id2', name: 'product_name2', price: 20 }] }
    clientOrder.createOrder(products, function(err, response) {
        console.log('err:', err)
        console.log('createOrder:', response)

        const call = clientStock.listStocks({ index: 1, limit: 20 })
        call.on('data', function(stock) {
            console.log('data listStocks', stock)
        })
        call.on('end', function() {
            console.log('end listStocks')
        })
        call.on('error', function(e) {
            console.log('error listStocks', e)
        })
        call.on('status', function(status) {
            console.log('status listStocks', status)
        })
    })
}

main()
// createOrder()