const CryptoBlock = require('./CryptoBlock');

const CryptoBlockchain = class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
        this.dificulty = 2;
    }
    startGenesisBlock() {
        return new CryptoBlock(0, "01/01/2020", "Initial Blockchain", "0");
    }
    obtainedLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainedLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        newBlock.proofOfWork(this.dificulty);
        this.blockchain.push(newBlock);
        //console.log(Buffer.from(JSON.stringify(newBlock)));
    }

    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const prevBlock = this.blockchain[i - 1];

            if (currentBlock.hash != currentBlock.computeHash()) return false;
            if (prevBlock.hash !== currentBlock.precedingHash) return false;
            return true;
        }
    }
}

module.exports = CryptoBlockchain;