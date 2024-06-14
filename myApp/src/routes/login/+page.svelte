<script lang="ts">
  // Importerar user store och Firebase-tjänster
  import { user } from '$lib/firebase';
  import { auth } from "$lib/firebase";
  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  // Variabel för att hålla koll på om en inloggning pågår
  let loginInProgress = false;

  // Funktion för att logga in med Google
  async function signInWithGoogle() {
    if (loginInProgress) return; // Om en inloggning redan pågår, gör inget
    loginInProgress = true;
    try {
        const provider = new GoogleAuthProvider(); // Skapa en Google-inloggningsleverantör
        await signInWithPopup(auth, provider); // Visa Google-inloggningspopup
    } catch (error) {
        console.error("Fel vid inloggning:", error); // Visa fel om inloggningen misslyckas
    } finally {
        loginInProgress = false; // Återställ loginInProgress när klart
    }
  }
</script>

<h2>Login</h2>

<!-- Visar olika innehåll beroende på om användaren är inloggad eller inte -->
{#if $user}
  <!-- Om användaren är inloggad -->
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <p class="text-center text-success">Du är inloggad</p>
  <button class="btn btn-warning" on:click={() => signOut(auth)}>Logga ut</button>
{:else}
  <!-- Om användaren inte är inloggad -->
  <button class="btn btn-primary" on:click={signInWithGoogle}>Logga in med Google</button>
{/if}
