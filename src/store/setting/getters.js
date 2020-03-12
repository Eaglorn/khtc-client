export function date(state) {
  return state.date;
}

export function rateRoom(state) {
  return state.room;
}

export function standartHotEnergy(state) {
  return state.hot_energy[0];
}
export function rateHotEnergy(state) {
  return state.hot_energy[1];
}

export function standartWaterOut(state) {
  return state.water_out[0];
}
export function rateWaterOut(state) {
  return state.water_out[1];
}

export function standartWaterIn(state) {
  return state.water_in[0];
}
export function rateWaterIn(state) {
  return state.water_in[1];
}

export function standartHotWaterHot(state) {
  return state.hot_water_hot[0];
}
export function rateHotWaterHot(state) {
  return state.hot_water_hot[1];
}

export function standartHotWaterEnergy(state) {
  return state.hot_water_energy[0];
}
export function rateHotWaterEnergy(state) {
  return state.hot_water_energy[1];
}

export function rateElectricity(state) {
  return state.electricity;
}

export function standartTrash(state) {
  return state.trash[0];
}
export function rateTrash(state) {
  return state.trash[1];
}

export function rateServices(state) {
  return state.services;
}
