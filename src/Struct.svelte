<script>
  import queryString from "query-string";
  import App from "./App.svelte";
  export let client_id;
  export let redirect_uri;

  let parsed = {};

  if (typeof window !== "undefined") {
    parsed = queryString.parse(window.location.hash);
  }

  let href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;

  let has_access = typeof parsed.access_token !== "undefined" ? true : false;
</script>

<style>
  :global(body) {
    background: #232b2b;
    color: #f1f1f1;
    overflow: hidden;
  }
  :global(*) {
    margin: 0;
    padding: 0;
  }
</style>

<!-- conditional styling : login page -->

{#if has_access}
  <App access_token={parsed.access_token} />
{:else}
  <main>
    <h1>My Top Tracks</h1>
    <h3>Connect With Spotify</h3>
    <a {href}>AUTHORIZE</a>
  </main>
  <style>
    main {
      text-align: center;
      padding: 1em;
      max-width: 240px;
      margin: 10% auto auto auto;
    }

    h1 {
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }

    h3 {
      font-weight: 100;
      text-transform: uppercase;
    }

    a {
      display: block;
      margin: 10px auto;
      padding-top: 10px;
      color: inherit;
      text-decoration: none;
      background-color: #1db954;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
      font-family: "Circular", "Helvetica", "Arial", "sans-serif";
      text-align: center;
      width: 150px;
      height: 30px;
      border-radius: 20px;
      border: none;
    }
    a:visited {
      color: inherit;
    }

    a:hover {
      background-color: #189243;
    }

    @media (min-width: 640px) {
      main {
        max-width: none;
      }
    }
  </style>
{/if}
