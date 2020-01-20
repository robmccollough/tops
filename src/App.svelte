<script>
  import axios from "axios";
  import Artist from "./Artist.svelte";
  import Track from "./Track.svelte";
  export let access_token;
  //defaults for both
  let track_params = {
    limit: 20,
    offset: 0,
    time_range: "medium_term"
  };
  let artist_params = {
    limit: 20,
    offset: 0,
    time_range: "medium_term"
  };

  let errors = {};

  let tracks = axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/top/tracks",
    headers: {
      authorization: "Bearer " + access_token
    },
    params: track_params
  })
    .then(result => {
      if (result.data) {
        console.log(result.data);
        return result.data;
      }
    })
    .catch(error => {
      errors.track = error;
    });

  let artists = axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/top/artists",
    headers: {
      authorization: "Bearer " + access_token
    },
    params: artist_params
  })
    .then(result => {
      if (result.data) {
        console.log(result.data);
        return result.data;
      }
    })
    .catch(error => {
      errors.artist = error;
    });
</script>

<style>
  header {
    font-size: 4em;
    font-weight: 800;
    color: #f1f1f1;
    width: 80%;
    margin: 0 auto;
    height: 15%;
    text-align: center;
    position: relative;
  }
  header h1 {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
  }
  main {
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
    height: 85%;
  }
  .top {
    width: 48%;
    height: 100%;
    min-width: 400px;
  }

  .container {
    height: 95%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
  }
</style>

<header>
  <h1>tops.</h1>
</header>
<main>
  <div class="top tracks">
    {#await tracks}

      <h1>Loading</h1>

    {:then res}

      <h1>Tracks</h1>

      <div class="container">
        {#each res.items as track, i}
          <Track data={track} index={i + 1} />
        {/each}
      </div>

    {:catch error}

      <p style="color: red">{error.message}</p>
    {/await}
  </div>
  <div class="top artists">
    {#await artists}

      <h1>Loading</h1>

    {:then res}
      <h1>Artists</h1>
      <div class="container">

        {#each res.items as artist, i}
          <Artist data={artist} index={i + 1} />
        {/each}
      </div>

    {:catch error}

      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</main>
