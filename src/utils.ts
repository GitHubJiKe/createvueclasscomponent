import * as vscode from 'vscode';

/**
 * 获取需要忽略的组建名
 * @param withEndfix 是否添加.vue后缀
 * @returns
 */
export function getIgnoreFilenames(withEndfix = true) {
    const names = vscode.workspace
        .getConfiguration('check')
        .get('ignoreFilename') as string[];

    if (withEndfix) {
        return names.map((v) => v + '.vue');
    }

    return names;
}
