#!/usr/bin/env node
const fs = require('fs');
const solc = require('solc');

function compileContract(contractFilePath) {
    const sourceCode = fs.readFileSync(contractFilePath, 'utf8');

    const input = {
        language: 'Solidity',
        sources: {
            [contractFilePath]: {
                content: sourceCode,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*'],
                },
            },
        },
    };

    const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
    const bytecode = compiledContract.contracts[contractFilePath][contractFilePath.split('.')[0]].evm.bytecode.object;

    console.log('Bytecode:', `0x${bytecode}`);
    return bytecode;
}

// slice to remove 'node' and 'index.js'
const args = process.argv.slice(2); 

if (args.length !== 1) {
    console.error('Usage: esmac <contractFilePath>');
    process.exit(1);
}

compileContract(args[0]);
