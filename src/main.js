import Struct from "./Struct.svelte";

const struct = new Struct({
	target: document.body,
	props: {
		client_id: "76fcd2e72e5c44aabcf9530cdb899522",
		redirect_uri: "https://robmccollough.dev/tops",
	},
});

export default struct;
