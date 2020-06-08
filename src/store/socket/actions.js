// eslint-disable-next-line camelcase
export function socket_updateNumb(context, value) {
  context.commit("SOCKET_UPDATE_NUMB", value);
}

export function updateNumb(context, value) {
  context.commit("updateNumb", value);
}
