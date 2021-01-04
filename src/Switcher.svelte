
<script>
  export let handleClick;
  export let toggle;
  export let left;
  export let right;
</script>

<style>
  .switcher {
    width: 400px;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 5px auto 5px auto;
    position: relative;
    background-color: rgba(255,255,255, 0.2);
    border-radius: 30px;
  }

  .side {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    font-size: 1.2em;
    font-weight: 800;
    z-index: 3;
  }

  .overlay {
    width: 50%;
    height: 100%;
    background-color: #1db954;
    border-radius: 30px;
    position: absolute;
    transition: left 1s;
  }

    .l{
        left:0;
    }

  .r {

      left: 50%;
    }
</style>



<main class="switcher">
  <div class={`overlay ${toggle == left ? 'l' : 'r'}`}/>
  <div class="side" on:click={() => handleClick(left)}>
    <span>Tracks</span>
  </div>

  <div class="side" on:click={() => handleClick(right)}>
    <span>Artists</span>
  </div>

</main>