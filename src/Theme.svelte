<script>
 import { Theme } from "./setting.ts";

 $: {
     document.documentElement.setAttribute("data-theme", Theme.Dark);
 }

 console.log("abc");
</script>
