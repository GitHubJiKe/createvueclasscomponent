import * as vscode from 'vscode';
import createVueClassComponent from './createVueClassComponent';

export function activate(context: vscode.ExtensionContext) {
	createVueClassComponent(context);
}

export function deactivate() { }
