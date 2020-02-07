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

  let toggle = "tracks";
  function handleSwitch(data) {
    if (toggle !== data) {
      toggle = data;
    }
  }
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
    margin: 0px auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    height: 85%;
    max-width: 1300px;
  }

  .switcher {
    width: 30%;
    height: 100px;
    border: 1px solid white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    margin: 5px auto 5px auto;
  }

  /* .switcher.h1:after {
    content: "";
    width: 28%;
    position: absolute;
    bottom: -10px;
    height: 5px;
  } */

  .top {
    width: 98%;
    min-width: 400px;
    overflow-y: scroll;
  }

  .container {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .legend {
    width: auto;
    height: 50px;
    display: grid;
    grid-template-areas: ". rank title artists . duration";
    grid-template-columns: 128px 128px 256px 192px auto 128px;
    grid-template-rows: 1fr;
    align-items: center;
    justify-items: center;
  }

  .rank {
    grid-area: rank;
  }

  .title {
    grid-area: title;
  }

  .artists {
    grid-area: artists;
  }

  .duration {
    grid-area: duration;
  }
  /* @media (min-width: 640px) {
    main {
      width: 80%;
    }
  } */
</style>

<header>
  <h1>tops.</h1>
</header>
<main>

  <div class="switcher">
    <h1
      class={`tracks ${toggle == 'tracks' ? 'active' : ''}`}
      on:click={() => handleSwitch('tracks')}>
      Tracks
    </h1>
    <h1
      class={`tracks ${toggle == 'artists' ? 'active' : ''}`}
      on:click={() => handleSwitch('artists')}>
      Artists
    </h1>
  </div>

  {#if toggle === 'tracks'}
    <div class="top tracks">
      {#await tracks}

        <h1>Loading</h1>

      {:then res}
        <div class="legend">
          <span class="rank">Rank</span>
          <span class="title">Title</span>
          <span class="artists">Artists</span>
          <span class="duration">Duration</span>
        </div>
        <div class="container">
          {#each res.items as track, i}
            <Track data={track} index={i + 1} />
          {/each}
        </div>

      {:catch error}

        <p style="color: red">{error.message}</p>
      {/await}
    </div>
  {:else if toggle === 'artists'}
    <div class="top artists">
      {#await artists}

        <h1>Loading</h1>

      {:then res}
        <div class="container">
          {#each res.items as artist, i}
            <Artist data={artist} index={i + 1} />
          {/each}
        </div>

      {:catch error}

        <p style="color: red">{error.message}</p>
      {/await}
    </div>
  {/if}

</main>
