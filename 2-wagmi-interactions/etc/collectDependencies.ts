import * as fs from 'fs';
import * as path from 'path';

const nodeModulesPath = path.join(__dirname, 'node_modules');

// 디렉터리를 재귀적으로 탐색하여 package.json 파일을 찾는 함수
function findPackageJsonFiles(dirPath: string): string[] {
    let filesInDirectory = fs.readdirSync(dirPath);
    let packageJsonFiles: string[] = [];

    for (let file of filesInDirectory) {
        let fullPath = path.join(dirPath, file);

        // 디렉터리인 경우, 재귀적으로 함수 호출
        if (fs.statSync(fullPath).isDirectory()) {
            packageJsonFiles = packageJsonFiles.concat(findPackageJsonFiles(fullPath));
        } else if (file === 'package.json') {
            // package.json 파일을 찾은 경우 배열에 추가
            packageJsonFiles.push(fullPath);
        }
    }

    return packageJsonFiles;
}

// package.json 파일을 읽고 dependencies와 devDependencies 정보를 출력하는 함수
function printDependencies(filePaths: string[]): void {
    filePaths.forEach(filePath => {
        const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const hasDependencies = !!packageJson.dependencies && Object.keys(packageJson.dependencies).length > 0;
        const hasDevDependencies = !!packageJson.devDependencies && Object.keys(packageJson.devDependencies).length > 0;

        // dependencies 또는 devDependencies가 있는 경우에만 출력
        if (hasDependencies || hasDevDependencies) {
            console.log(`Package: ${path.dirname(filePath)}`);
            if (hasDependencies) {
                console.log('Dependencies:', packageJson.dependencies);
            }
            if (hasDevDependencies) {
                console.log('DevDependencies:', packageJson.devDependencies);
            }
            console.log('-----------------------------------');
        }
    });
}

// 메인 함수
function main() {
    const packageJsonFiles = findPackageJsonFiles(nodeModulesPath);
    printDependencies(packageJsonFiles);
}

main();
