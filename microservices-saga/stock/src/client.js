const PROTO_PATH = __dirname + '/../protos/stock_guide.proto'
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
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

function main() {
  const client = new stockguide.StockGuide('localhost:50052', grpc.credentials.createInsecure())
  let id = 'stockid1'

  client.getStock({ id: id }, function(err, response) {
    console.log('getStock:', response)
  })

  const call = client.listStocks({ index: 1, limit: 20 })
  call.on('data', function(stock) {
    console.log('data listStocks', stock)
  })
  call.on('error', function(e) {
    console.log('error listStocks', e)
  })
  call.on('status', function(status) {
    console.log('status listStocks', status)
  })
}

main()