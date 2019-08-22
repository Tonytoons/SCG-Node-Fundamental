const PROTO_PATH = __dirname + '/../protos/stock_guide.proto'
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
const stockguide = protoDescriptor.stockguide

/**
 * getStock request handler. Gets an stock with a given id, 
 * and responds with a single object.
 */
function getStock(call, callback) {
    callback(null, { id: call.request.id, name: 'stock1', product: { id: 'id1', name: 'product1', count: 0 }, date: 1565335087976 })
}

/**
 * listStocks request handler. Gets all list of stocks.
 * @param {Writable} call Writable stream for responses with an additional
 * request property for the request value.
 */
function listStocks(call) {
    const stocks = [{ id: 'id1', name: 'stock1', date: 1565335087976 }, { id: 'id2', name: 'stock1', date: 1565335088976 }]
    stocks.forEach(stock => {
        stock.product = { id: 'id1', name: 'product1', count: 0 }
        call.write(stock)
    })
    call.end()
}

function getServer() {
    const server = new grpc.Server()
    server.addService(stockguide.StockGuide.service, {
        getStock: getStock,
        listStocks: listStocks
    })
    return server
}
  
const routeServer = getServer()
routeServer.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure())
routeServer.start()

console.log('grpc is working on port 50052')