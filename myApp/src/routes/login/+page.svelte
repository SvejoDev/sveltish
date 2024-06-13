<script lang="ts">
    import { auth } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    let loginInProgress = false;

    async function signInWithGoogle() {
        if (loginInProgress) return;

        loginInProgress = true;
        try {
            const provider = new GoogleAuthProvider();
            const user = await signInWithPopup(auth, provider);
            console.log(user);
        } catch (error) {
            if (error instanceof Error) {
                if ((error as any).code === 'auth/cancelled-popup-request') {
                    console.error("Sign-in popup was cancelled because another popup was opened.", error);
                } else {
                    console.error("Error during sign in:", error);
                }
            } else {
                console.error("An unknown error occurred during sign in.");
            }
        } finally {
            loginInProgress = false;
        }
    }
</script>

<h2>Login</h2>
<button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
