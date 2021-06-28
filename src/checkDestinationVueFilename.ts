import * as vscode from 'vscode';
import * as fs from 'fs';
import { getIgnoreFilenames } from './utils';
import * as uppercamelcase from 'uppercamelcase';

interface Data {
    oldPath: string;
    tempPath: string;
    newPath: string;
}

function readFilesOfDest(uri: vscode.Uri) {
    const ignoreFilenames = getIgnoreFilenames();
    const _path = uri.path;
    if (fs.lstatSync(_path).isFile()) {
        const arr = _path.split('/');
        const filename = arr.pop();
        if (_path.endsWith('.vue') && !ignoreFilenames.includes(filename!)) {
            const dir = arr.join('/');
            const res = handleFile(filename!, dir);
            return res ? [res] : [];
        }

        return [];
    }

    const res: Data[] = [];

    function handleFile(v: string, dir: string): Data {
        if (
            /\.vue$/.test(v) &&
            !ignoreFilenames.includes(v) &&
            !/[A-Z]/g.test(v[0])
        ) {
            const upperCamelCaseName = uppercamelcase(v);
            return {
                oldPath: `${dir}/${v}`,
                tempPath: `${dir}/${upperCamelCaseName}.temp`,
                newPath: `${dir}/${upperCamelCaseName}`,
            };
        }

        return null as any as Data;
    }

    function read(dir: string) {
        const files = fs.readdirSync(dir);
        files.map((v) => {
            if (fs.lstatSync(`${dir}/${v}`).isFile()) {
                const d = handleFile(v, dir);
                d && res.push(d);
            } else {
                read(`${dir}/${v}`);
            }
        });
    }

    read(_path);

    return res;
}

function rename({ oldPath, tempPath, newPath }: Data) {
    fs.copyFileSync(oldPath, tempPath);
    fs.unlinkSync(oldPath);
    fs.copyFileSync(tempPath, newPath);
    fs.unlinkSync(tempPath);
}

function checkDestinationVueFilename(context: vscode.ExtensionContext) {
    const win = vscode.window;
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'createvueclasscomponent.check',
            async (uri: vscode.Uri) => {
                const files = readFilesOfDest(uri);
                if (!files.length) {
                    win.showInformationMessage(
                        'Congratulations， your vue filenames are all regularly!'
                    );
                    return;
                }
                win.showInformationMessage(
                    `You have some files that are not named irregularly,\n
            do you want me to rename them?\n
            If you choose yes, I'll automatically rename them for you\n
            or I'll show you where they are.`,
                    'Yes',
                    'No'
                ).then((v) => {
                    if (v === 'Yes') {
                        files.forEach((v) => rename(v));
                        win.showInformationMessage(
                            'Already renamed for you, please refresh editor to check.'
                        );
                    } else {
                        const str = files.map((v) => v.oldPath).join('\n');
                        const terminal = win.createTerminal('File Details');
                        terminal.sendText(str, true);
                        terminal.show();
                    }
                });
            }
        )
    );
}

export default checkDestinationVueFilename;
