<script>
  import { connect } from '$lib/connect.ts'
  import connecticon from '$lib/assets/connect.svg'
  
  let { onconnected } = $props();
</script>

<div class="flex flex-col justify-center items-center h-dvh w-full">
  <button class="" onclick={async () => onconnected(await connect())}>
    <img src={connecticon} alt="Connect to star tracker">
  </button>
</div>
