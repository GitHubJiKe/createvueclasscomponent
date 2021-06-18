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

#### Why should you use this tool?

> Check the [Style Guide](https://vuejs.org/v2/style-guide/) of Vue, you should try your best to follow these rules.

#### How to name filename

> In my opinion, as a component your component name should be same as your .vue filename, in this way you can easily know your component's name and meaning.
> Big CampleCase is my favorite style for name a file, and many popular and great Open-Sourced UI library such as [ElementUI](https://element.eleme.io/#/en-US),[Ant Design](https://ant.design/), they do this too. So why don't we follow them?

### package and publish

[Doc](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

```bash
    // build
    vsce package
    // publish
    vsce publish
```
