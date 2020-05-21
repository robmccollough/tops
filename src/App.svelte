<script>
  import axios from "axios";
  import Artist from "./Artist.svelte";
  import Track from "./Track.svelte";
  import { fly, fade } from "svelte/transition";
  import Switcher from "./Switcher.svelte";
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
        return result.data;
      }
    })
    .catch(error => {
      errors.artist = error;
    });

  let toggle = "artists";
  function handleSwitch(data) {
    if (toggle !== data) {
      toggle = data;
    }
  }
</script>

<style type="text/scss">
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
    transition: width 1s ease-in-out;
  }

  .top {
    width: 98%;
    min-width: 400px;
    position: relative;
    overflow-y: scroll;
  }

  .container {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 50px;
  }

  .legend {
    width: 100%;
    height: 50px;
    display: grid;
    grid-template-areas: ". rank title artists . duration";
    grid-template-columns: 128px 128px 256px 190px auto 128px;
    grid-template-rows: 1fr;
    align-items: center;
    justify-items: center;
    position: absolute;
    top: 0;
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

  /* Bigger than 1300px */
  @media (min-width: 1400px) {
    main {
      width: 65%;
    }
  }

  /* smaller than 1024 */
  @media (max-width: 1399px) {
    /* switch to 64 px grid legend */
    /* :global(body){
      background-color: orange;
    } */
    main {
      width: 80%;
    }
  }

  @media (max-width: 1024px) {
    .legend {
      grid-template-columns: 64px 64px 128px 95px auto 64px;
    }
  }

  @media (max-width: 650px) {
    main {
      width: 95%;
    }
  }
</style>

<header>
  <h1>tops.</h1>
</header>
<main>

  <Switcher left="tracks" right="artists" {toggle} handleClick={handleSwitch} />

  {#if toggle === 'tracks'}
    <div
      class="top"
      in:fly={{ x: -500, duration: 500 }}
      out:fly={{ x: 500, duration: 500 }}>
      {#await tracks}

        <h1>Loading</h1>

      {:then res}
        <div class="legend" in:fade={{ duration: 400, delay: 500 }}>
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
    <div
      class="top"
      in:fly={{ x: 500, duration: 500 }}
      out:fly={{ x: -500, duration: 500 }}>

      {#await artists}

        <h1>Loading</h1>

      {:then res}
        <div class="legend" in:fade={{ duration: 400, delay: 500 }}>
          <span class="rank">Rank</span>
          <span class="title">Title</span>
          <span class="artists">Preview</span>
          <span class="duration">Popularity</span>
        </div>
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
