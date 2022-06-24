import BrainFuck from './brnfk'
import { readFile } from 'fs'
;(function () {
    // Get arguments from the cli
    const args = process.argv.slice(2)

    // If no arguments are passed, print usage
    if (args.length <= 0) return console.log('[ERROR] Usage: yarn start <filename>')

    // For every file specified in the argument
    for (const file of args) {
        readFile(file, (err, data) => {
            if (err) throw err
            console.log(`[INFO] Processing ${file}`)
            const bf = new BrainFuck(data.toString())
            bf.run()
        })
    }
})()
