const CryptoBlockchain = require('./class/CryptoBLockchain');
const CryptoBlock = require('./class/CryptoBlock');

const Blockchain = new CryptoBlockchain();
Blockchain.addNewBlock(new CryptoBlock(1, Math.floor(Date.now() / 1000), { sender: "Koyo", recipient: "Indra", amount: 10 }));
Blockchain.addNewBlock(new CryptoBlock(1, Math.floor(Date.now() / 1000), { sender: "Koyo", recipient: "Indra", amount: 10 }));


console.dir(Blockchain, { depth: null })
console.log("Blockchain Validity : " + Blockchain.checkChainValidity() + "")