<script>
  import "../app.css";
</script>

<div
  class="quizzes-container w-[700px] m-auto flex justify-center h-screen items-center"
>
  <slot />
</div>

<style lang="postcss">
    :global(html){
        background-color: theme('colors.gray.400');
    }
</style>
