/* import io from "socket.io-client";
import VueSocketIOExt from "vue-socket.io-extended";

const socket = io("http://46.8.146.12:3000");

export default ({ store, Vue }) => {
  Vue.use(VueSocketIOExt, socket, { store });
}; */

/* import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
export default ({ Vue }) => {
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: SocketIO("http://46.8.146.12:4000")
    })
  );
}; */

import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";

const socket = io("http://46.8.146.12:4000");
export default ({ Vue }) => {
  Vue.use(VueSocketIOExt, socket);
};
