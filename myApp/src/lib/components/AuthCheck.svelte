<script lang="ts">
    import { user } from "$lib/firebase";
</script>
  
{#if $user}
  <slot />
{:else}
<div class="container flex flex-col self-center max-w-52">
    <p class="text-error align-middle">
        You must be signed in to view this page.
        
    </p>
    <a class="btn btn-primary" href="/login">Sign in</a>
</div>
    
{/if}