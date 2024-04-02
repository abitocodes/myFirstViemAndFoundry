const fs = require('fs');
const path = require('path');

// JSON ABI 파일 경로와 변환된 TS 파일 경로 설정
const jsonAbiPath = path.join(__dirname, 'out/QuickAcaciaToken.sol/QuickAcaciaToken.json');
const tsOutputPath = path.join(__dirname, 'interactions/QuickAcaciaTokenAbi.ts');

// JSON ABI 읽기
const jsonAbi = JSON.parse(fs.readFileSync(jsonAbiPath, 'utf8'));

// TypeScript 파일로 변환
const tsContent = `export const wagmiAbi = ${JSON.stringify(jsonAbi.abi, null, 2)};\n`;

// 변환된 내용을 TS 파일로 저장
fs.writeFileSync(tsOutputPath, tsContent);

console.log('ABI has been converted to TypeScript successfully.');
