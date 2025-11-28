<script>
  function toggle() {
    document.documentElement.classList.toggle("dark")
  }
</script>

<button
  class="fixed top-1 right-1 rounded-xl bg-slate-300 p-2 font-mono font-semibold shadow dark:bg-slate-950/50"
  on:click={toggle}
>
  Toggle Theme
</button>
