<script>
 import Theme from "@nftrans/Theme.svelte";
 import Button from "@design/Button.svelte";

 const title = "Connect Wallet";

 const click =() => {
     alert("Hello, world!");
 }
</script>

<style>
 main {
     width: 250px;
     height: 250px;
     display: flex;
     align-items: center;
     justify-content: center;
 }
</style>

<Theme />

<main>
    <Button variant="primary">Connect Wallet</Button>
</main>
