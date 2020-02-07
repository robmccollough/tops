import Struct from "./Struct.svelte";

const struct = new Struct({
  target: document.body,
  props: {
    client_id: "3e5b56661b4b42d1bbac49ebc178cfdc",
    redirect_uri: "https://robmccollough.dev/tops"
  }
});

export default struct;
