import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as uppercamelcase from 'uppercamelcase';

function getTemplate(componentName: string) {
    const tPath = vscode.workspace
        .getConfiguration('create')
        .get('templatePath');

    if (tPath) {
        const filePath = path.resolve(__dirname, tPath as string);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath);
            return content.toString().replace('ComponentName', componentName);
        }
        vscode.window.showErrorMessage(
            "Can't find your template file, please check your path!"
        );
        return;
    }

    return `<template>\n</template>
    \n<script lang="ts">
    \nimport { Vue, Component, Prop } from "vue-property-decorator";
    \n@Component\nexport default class ${componentName} extends Vue {}
    \n</script>
    \n<style lang="less" scoped>
    \n</style>`;
}

function writeFile(
    content: Buffer | string,
    filePath: string,
    componentName: string
) {
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
        vscode.window.showWarningMessage(
            `You already have one ${componentName} component.`
        );
        return;
    }
    const content = getTemplate(componentName);

    if (content) {
        writeFile(content, filePath, componentName);
    }
}

function createVueClassComponent(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'createvueclasscomponent.create',
            async (uri: vscode.Uri) => {
                const componentName = await vscode.window.showInputBox({
                    ignoreFocusOut: true,
                    placeHolder: 'MyComponent',
                    prompt: 'What is the name of the new component?',
                });

                createComponent(uri, uppercamelcase(componentName!));
            }
        )
    );
}

export default createVueClassComponent;
