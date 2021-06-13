import *  as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';


function convertComponentName(componentName: string) {
    return componentName.split('').reduce((acc: string, cur: string, idx: number) => {
        if (idx === 0) {
            return acc + cur.toUpperCase();
        }

        return acc + cur;
    }, '');
}


function getTemplate(componentName: string) {
    return `<template>\n</template>
    \n<script lang="ts">
    \nimport { Vue, Component, Prop } from "vue-property-decorator";
    \n@Component
    \nexport default class ${componentName} extends Vue {}
    \n</script>
    \n<style lang="less" scoped>
    \n</style>`;
}

function writeFile(content: Buffer | string, filePath: string, componentName: string) {
    const _filePath = path.resolve(filePath, `./${componentName}.vue`);

    fs.writeFileSync(_filePath, content);
}

function createComponent(uri: { path: string }, componentName: string) {
    const content = getTemplate(componentName);


    const arr = uri.path.split('/');

    if (fs.lstatSync(uri.path).isFile()) {
        arr.pop();
    }

    const filePath = arr.join('/');


    writeFile(content, filePath, componentName);
}

module.exports = function (context: { subscriptions: any[]; }) {
    context.subscriptions.push(vscode.commands.registerCommand('createvueclasscomponent.create', async (uri: { path: string }) => {
        const componentName = await vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: 'MyComponent',
            prompt: 'What is the name of the new component?',
        });
        
        createComponent(uri, convertComponentName(componentName!));
    }));

};