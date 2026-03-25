<script>
    import { send } from '$lib/connect.ts'
    import forwards from '$lib/assets/forwards.svg'
    import backwards from '$lib/assets/backwards.svg'
    console.log(forwards)
</script>

<div class="flex flex-col justify-center items-center h-dvh w-full">
  <button title="forwards"
    class="border-5 border-purple-400 rounded-full m-[10px] w-30 h-30"
    onmousedown={() => send('forwards')}
    onmouseup={() => send('stop')}
    ontouchstart={(e) => { e.preventDefault(); send('forwards'); }}
    ontouchend={(e) => { e.preventDefault(); send('stop'); }}
    oncontextmenu={(e) => e.preventDefault()}
  ><img src={forwards} alt="forwards"></button>
  <button title="backwards"
    class="border-5 border-purple-400 rounded-full m-[10px] w-30 h-30"
    onmousedown={() => send('backwards')}
    onmouseup={() => send('stop')}
    ontouchstart={(e) => { e.preventDefault(); send('backwards'); }}
    ontouchend={(e) => { e.preventDefault(); send('stop'); }}
    oncontextmenu={(e) => e.preventDefault()}
  ><img src={backwards} alt="backwards"></button>
</div>
