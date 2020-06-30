const CryptoBlock = require('./CryptoBlock');
const Transction = require('./Transaction');

const CryptoBlockchain = class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
        this.dificulty = 2;
        this.pendingTransaction = [];
        this.miningReward = 100;
    }
    startGenesisBlock() {
        return new CryptoBlock("01/01/2020", "Initial Blockchain", "0");
    }
    obtainedLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    minePendingTransaction(miningRewardAddress) {
        let block = new CryptoBlock(Date.now(), this.pendingTransaction[0], this.obtainedLatestBlock().hash);
        block.mineBlock(this.dificulty);
        console.log('BLock successfully mined');
        this.blockchain.push(block);
        this.pendingTransaction.shift();
        this.pendingTransaction.push(new Transction('main', miningRewardAddress, 100));
    }
    createTransaction(transaction) {
        this.pendingTransaction.push(transaction);
    }

    getBalance(address) {
        let balance = 0;
        this.blockchain.forEach(block => {
            const { transaction } = block;
            if (transaction.fromAddress == address) balance -= transaction.amount;
            if (transaction.toAddress == address) balance += transaction.amount;
        })
        return balance;
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