const crypto = require('crypto');
class Block {
    constructor(index, data, prevHas) {
        this.index = index;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.data = data;
        this.prevHas = prevHas;
        this.hash = this.getHash();
    }

    getHash() {
        var encript = JSON.stringify(this.data) + this.prevHas + this.index + this.timestamp;
        var hash = crypto.createHmac('sha256', 'secret').update(encript).digest('hex');
        return hash;
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
    }

    addBlock(data) {
        let index = this.chain.length;
        let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
        let block = new Block(index, data, prevHash);
        this.chain.push(block);
    }

    chainIsValid() {
        for (var i = 0; i < this.chain.length; i++) {
            if (this.chain[i].hash !== this.chain[i].getHash()) return false;
            if (i > 0 && this.chain[i].prevHas !== this.chain[i - 1].hash) return false;
        }
        return true;
    }


}

const BChain = new Blockchain();
BChain.addBlock({ sender: "Bruce wayne", reciver: "Tony stark", amount: 100 });
BChain.addBlock({ sender: "Harrison wells", reciver: "Han solo", amount: 50 });
BChain.addBlock({ sender: "Tony stark", reciver: "Ned stark", amount: 75 });
console.dir(BChain, { depth: null });
console.log("******** Validity of this blockchain: ", BChain.chainIsValid());