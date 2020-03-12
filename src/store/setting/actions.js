export function updateDate(context, value) {
  context.commit("updateDate", value);
}

export function getDate(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/get/date",
      data: {},
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit("updateDate", response.data.date);
    })
    .catch(response => {
      value.app.$q.notify({
        color: "negative",
        position: "top",
        message: "Нет соединения с сервером",
        icon: "report_problem"
      });
    });
}

export function setDate(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/set/date",
      data: { date: value.date },
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit("updateDate", value.data);
    })
    .catch(response => {
      value.app.$q.notify({
        color: "negative",
        position: "top",
        message: "Нет соединения с сервером",
        icon: "report_problem"
      });
    });
}

export function getRateStandart(context, value) {
  value.app
    .$axios({
      method: "post",
      url: "http://46.8.146.12:4000/api/get/date",
      data: {},
      timeout: 5000,
      responseType: "json"
    })
    .then(response => {
      context.commit("rateRoom", response.data.RateRoom);

      context.commit("standartHotEnergy", response.data.HotEnergy[0]);
      context.commit("rateHotEnergy", response.data.HotEnergy[1]);

      context.commit("standartHotWaterEnergy", response.data.HotWaterEnergy[0]);
      context.commit("rateHotWaterEnergy", response.data.HotWaterEnergy[1]);

      context.commit("standartWaterOut", response.data.WaterOut[0]);
      context.commit("rateWaterOut", response.data.WaterOut[1]);

      context.commit("standartWaterIn", response.data.WaterIn[0]);
      context.commit("rateWaterIn", response.data.WaterIn[1]);

      context.commit("standartHotWaterHot", response.data.HotWaterHot[0]);
      context.commit("rateHotWaterHot", response.data.HotWaterHot[1]);

      context.commit("standartHotWaterEnergy", response.data.HotWaterEnergy[0]);
      context.commit("rateHotWaterEnergy", response.data.HotWaterEnergy[1]);

      context.commit("rateElectricity", response.data.Electricity);

      context.commit("standartTrash", response.data.Trash[0]);
      context.commit("rateTrash", response.data.Trash[1]);

      context.commit("rateServices", response.data.Services);
    })
    .catch(response => {
      value.app.$q.notify({
        color: "negative",
        position: "top",
        message: "Нет соединения с сервером",
        icon: "report_problem"
      });
    });
}
