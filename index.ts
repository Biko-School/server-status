import { createServer, Server, IncomingMessage, ServerResponse } from 'http'
import { totalmem, freemem, cpuCount, cpuUsage } from 'os-utils'
import * as chalk from 'chalk'

const port: number = 3001

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log(`${chalk.bgBlue(req.method)} - ${chalk.blue(req.url)}`)

    cpuUsage(cpuUsagePercentage => {
        res.setHeader('refresh', 0.5)
        res.end(JSON.stringify({
            totalmem: totalmem(),
            freemem: freemem(),
            cpuCount: cpuCount(),
            cpuUsagePercentage
        }))
    })
})

server.listen(port, () => console.log(chalk.black.bgGreen(`Server listening at port ${port}`)))