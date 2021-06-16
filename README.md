# Create Vue Class Component

> This is a VSCode plugin to help developer quickly create a class style component .vue file.
> The reason I make it is to save my time in work, because my new team is still using Vue2 and write class style component, so I have to adapt to it.(I am a react user and favor into hooks and functional style.)
> I hope this little tool will help you too.

### support input name style

- DemoComponent -> DemoComponent `recommand`
- demo component -> DemoComponent `recommand`
- demo-component -> DemoComponent `recommand`
- demoComponent -> DemoComponent
- Demo-component -> DemoComponent
- Demo Component -> DemoComponent
- Demo component -> DemoComponent
- Democomponent -> Democomponent `not recommand`
- democomponent -> Democomponent `not recommand`


### code example

```html
<template>
</template>
    
<script lang="ts">
    
import { Vue, Component, Prop } from "vue-property-decorator";
    
@Component
export default class A extends Vue {}
    
</script>
    
<style lang="less" scoped>
    
</style>
```