<script>
  export let data;
  export let index;

  // console.log(data, index);
</script>

<style>
  main {
    margin-bottom: 3%;
    width: 100%;
    height: 20%;
    min-height: 20%;
    display: grid;
    grid-template-areas: "index image artist length preview .";
    grid-template-columns: 0.5fr 30% 1fr 0.5fr 0.5fr 5%;
    grid-template-rows: 1fr;
    background-color: black;
    color: white;
    justify-items: center;
    align-items: center;
    overflow: hidden;
  }

  main h2 {
    grid-area: index;
  }
  .img-cont {
    height: 100%;
    width: 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
    grid-area: image;
  }
  main p {
    grid-area: artist;
    font-size: 1.5em;
    font-weight: 300;
  }
</style>

<main>

  <h2>{index}</h2>
  <div
    class="img-cont"
    style={`background-image: url('${data.album.images[0].url}');`} />

  <p>{data.name}</p>

</main>
