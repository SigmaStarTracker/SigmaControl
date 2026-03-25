<script>
  import Connect from '$lib/components/Connect.svelte'
  import Controls from '$lib/components/Controls.svelte'
  import { onMount } from 'svelte'
  
  let connected = $state(false);
  let mounted = $state(false);
  onMount(() => mounted = true);
</script>

{#if mounted}
  {#if !connected}
    <Connect onconnected={(value) => connected = value}/>
  {:else}
    <Controls />
  {/if}
{/if}

