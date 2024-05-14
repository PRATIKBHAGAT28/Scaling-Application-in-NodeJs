import cluster from 'cluster'
import os from 'os'
import express from 'express'

const totalCPU = os.cpus().length
// const cpulength = os.availableParallelism
// console.log(totalCPU)

if (cluster.isPrimary) {
  //   console.log(`Primary ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < totalCPU; i++) {
    cluster.fork()
  }
} else {
  const app = express()
  const port = 3000

  app.get('/', (req, res) => {
    res.send(`hello from epxpress ${process.pid}`)
  })

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
  })
}
