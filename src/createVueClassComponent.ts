import *  as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import convertWords2BigCamelCaseStyle from './convertWords2BigCamelCaseStyle'


function getTemplate(componentName: string) {
    return `<template>\n</template>
    \n<script lang="ts">
    \nimport { Vue, Component, Prop } from "vue-property-decorator";
    \n@Component\nexport default class ${componentName} extends Vue {}
    \n</script>
    \n<style lang="less" scoped>
    \n</style>`;
}

function writeFile(content: Buffer | string, filePath: string, componentName: string) {
    const _filePath = path.resolve(filePath, `./${componentName}.vue`);

    fs.writeFileSync(_filePath, content);
}

async function createComponent(uri: vscode.Uri, componentName: string) {
    const path = uri.path;
    const arr = path.split('/');

    if (fs.lstatSync(path).isFile()) {
        arr.pop();
    }

    const filePath = arr.join('/');

    if (fs.existsSync(`${filePath}/${componentName}.vue`)) {
        vscode.window.showWarningMessage(`You already have one ${componentName} component.`);
        return;
    }


    writeFile(getTemplate(componentName), filePath, componentName);
}

module.exports = function (context: { subscriptions: any[]; }) {
    context.subscriptions.push(vscode.commands.registerCommand('createvueclasscomponent.create', async (uri: vscode.Uri) => {
        const componentName = await vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: 'MyComponent',
            prompt: 'What is the name of the new component?',
        });

        createComponent(uri, convertWords2BigCamelCaseStyle(componentName!));
    }));
};