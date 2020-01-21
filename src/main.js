import Struct from "./Struct.svelte";
import dotenv from "dotenv";
dotenv.config();

const struct = new Struct({
  target: document.body,
  props: {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI
  }
});

export default struct;
