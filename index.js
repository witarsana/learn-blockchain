const CryptoBlockchain = require('./class/CryptoBLockchain');
const Transaction = require('./class/Transaction');
const CryptoBlock = require('./class/CryptoBlock');

const Blockchain = new CryptoBlockchain();
Blockchain.createTransaction(new Transaction('address1', 'address2', 30000));
Blockchain.createTransaction(new Transaction('address2', 'address1', 10000));
Blockchain.minePendingTransaction('koyo');
Blockchain.minePendingTransaction('andre');
Blockchain.minePendingTransaction('deva');

console.dir(Blockchain, { depth: null })
console.log('Balance of Koyo : ' + Blockchain.getBalance('koyo'));
console.log('Balance of Address 1 : ' + Blockchain.getBalance('address1'));
console.log('Balance of Address 2 : ' + Blockchain.getBalance('address2'));
console.log('-----------------------------------------------------------');
console.log('Validity of Blockchain : ' + Blockchain.checkChainValidity());
