<script>
  export let data;
  export let index;

  // console.log(data, index);
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
</script>

<style>
  main {
    box-sizing: border-box;
    border-top: 2px solid rgba(200, 200, 200, 0.5);
    width: 100%;
    height: 128px;
    position: relative;
    /* flex-direction: row;
    flex-wrap: nowrap;
    color: white;
    justify-content: space-between;
    align-items: center; */
  }

  .left {
    height: 100%;
    width: auto;
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .right {
    height: 100%;
    width: 128px;
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3em;
    font-weight: 275;
    color: #6a6a6a;
  }

  .cont {
    height: 128px;
    width: 128px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
  }

  .title {
    width: 256px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .title span {
    font-size: 1.5em;
    font-weight: 300;
    max-width: 70%;
    color: #e2e2e2;
  }

  .subtitle {
    display: flex;
    width: auto;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .subtitle a {
    text-decoration: none;
    font-size: 1.3em;
    font-weight: 275;
    color: #6a6a6a;
  }

  .subtitle span {
    color: #6a6a6a;
  }

  .subtitle a:hover {
    color: #8f8f8f;
  }
</style>

<main>
  <div class="left">
    <div
      class="cont"
      style={`background-image: url('${data.album.images[0].url}');`} />

    <div class="cont">
      <span>{index}</span>
    </div>

    <div class="title">
      <span>{data.name}</span>
    </div>

    <div class="subtitle">
      {#each data.artists as artist}
        <span>
          <a href={artist.href} target="blank">{artist.name}</a>
        </span>
      {/each}
    </div>

  </div>

  <div class="right">
    <span>{millisToMinutesAndSeconds(data.duration_ms)}</span>
  </div>

</main>
