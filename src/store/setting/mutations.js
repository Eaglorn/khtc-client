export function updateDate(state, value) {
  state.date = value;
}

export function rateRoom(state, value) {
  state.room = value;
}

export function standartHotEnergy(state, value) {
  state.hot_energy[0] = value;
}
export function rateHotEnergy(state, value) {
  state.hot_energy[1] = value;
}

export function standartWaterOut(state, value) {
  state.water_out[0] = value;
}
export function rateWaterOut(state, value) {
  state.water_out[1] = value;
}

export function standartWaterIn(state, value) {
  state.water_in[0] = value;
}
export function rateWaterIn(state, value) {
  state.water_in[1] = value;
}

export function standartHotWaterHot(state, value) {
  state.hot_water_hot[0] = value;
}
export function rateHotWaterHot(state, value) {
  state.hot_water_hot[1] = value;
}

export function standartHotWaterEnergy(state, value) {
  state.hot_water_energy[0] = value;
}
export function rateHotWaterEnergy(state, value) {
  state.hot_water_energy[1] = value;
}

export function rateElectricity(state, value) {
  state.electricity = value;
}

export function standartTrash(state, value) {
  state.trash[0] = value;
}
export function rateTrash(state, value) {
  state.trash[1] = value;
}

export function rateServices(state, value) {
  state.services = value;
}
