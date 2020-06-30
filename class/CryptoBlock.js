const SHA256 = require('crypto-js/sha256');

const CryptoBlock = class CryptoBlock {
    constructor(timestamp, transaction, precedingHash = " ") {
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
        this.nonce = 0;
        this.index = 0;
    }

    computeHash() {
        return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.computeHash();
        }
    }
}
module.exports = CryptoBlock;

