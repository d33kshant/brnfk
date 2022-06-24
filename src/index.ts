class BrainFuck {
    source: string
    pointer: number
    loopPointer: number
    memory: number[]
    loopStack: number[]

    constructor(source: string, size: number = 5) {
        this.source = source
        this.pointer = 0
        this.loopPointer = 0
        this.memory = Array(size).fill(0)
        this.loopStack = []
    }

    left() {
        // Move the pointer left
        // if the pointer is at the beginning of the memory
        // then add a new cell at the start of the memory
        if (this.pointer === 0) this.memory.unshift(0)
        // decriment pointer by 1 when not the beginning
        else this.pointer--
    }

    right() {
        // Move the pointer right
        // if the pointer is at the end of the memory
        // then add a new cell at the end of the memory
        if (this.pointer === this.memory.length - 1) this.memory.push(0)
        // increment the pointer by 1 on each move
        this.pointer++
    }

    print() {
        // prints ascii value of the value at the pointer
        process.stdout.write(String.fromCharCode(this.memory[this.pointer]))
    }

    read() {
        // Read a character from stdin and store it in the memory
        this.memory[this.pointer] = process.stdin.read(1).charCodeAt(0)
    }

    increment() {
        // Increment the value at the pointer if it is not 255
        // Otherwise set the value at the pointer to 0
        if (this.memory[this.pointer] === 255) this.memory[this.pointer] = 0
        else this.memory[this.pointer]++
    }

    decrement() {
        // Decrement the value at the pointer if it is not 0
        // Otherwise set the value at the pointer to 255
        if (this.memory[this.pointer] === 0) this.memory[this.pointer] = 255
        else this.memory[this.pointer]--
    }

    loop() {
        // Push the current loop pointer to the loop stack
        this.loopStack.push(this.loopPointer)
    }

    run() {
        // Iterate over every character in the source
        for (const ch of this.source) {
            if (' \n\t'.includes(ch)) continue
            switch (ch) {
                case '>':
                    this.right()
                    break
                case '<':
                    this.left()
                    break
                case '+':
                    this.increment()
                    break
                case '-':
                    this.decrement()
                    break
                case '.':
                    this.print()
                    break
                case ',':
                    this.read()
                    break
                default:
                    throw new Error(`Unknown character: ${ch}`)
            }
        }
        console.log('\nFinished')
    }
}

const b = new BrainFuck('>++\n,<++\t')
b.run()
console.log(b.memory)
