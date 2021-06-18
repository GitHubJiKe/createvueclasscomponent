# Create Vue Class Component

> This is a VSCode plugin to help developer quickly create a class style component .vue file.
> The reason I make it is to save my time in work, because my new team is still using Vue2 and write class style component, so I have to adapt to it.(I am a react user and favor into hooks and functional style.)
> I hope this little tool will help you too.

### support input name style

-   DemoComponent -> DemoComponent `recommend`
-   demo component -> DemoComponent `recommend`
-   demo-component -> DemoComponent `recommend`
-   demoComponent -> DemoComponent
-   Demo-component -> DemoComponent
-   Demo Component -> DemoComponent
-   Demo component -> DemoComponent
-   Democomponent -> Democomponent `not recommend`
-   democomponent -> Democomponent `not recommend`

### code example

```html
<template> </template>

<script lang="ts">
	import { Vue, Component, Prop } from "vue-property-decorator";

	@Component
	export default class ComponentName extends Vue {}
</script>

<style lang="less" scoped></style>
```

### check vue filename

> Help you rename you irregularly vue filename, and it's an options choice,
> you can just choose No to check the files details in terminal panel.

### package and publish

[Doc](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

```bash
    // build
    vsce package
    // publish
    vsce publish
```
