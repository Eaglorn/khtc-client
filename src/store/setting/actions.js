export function updateDate (context, value) {
  context.commit('updateDate', value)
}

export function getDate (context, value) {
  value.app.$axios({
    method: 'post',
    url: 'http://46.8.146.12:4300/api/get/date',
    data: { },
    timeout: 5000,
    responseType: 'json'
  })
    .then((response) => {
      context.commit('updateDate', response.data.date)
    })
}

export function setDate (context, value) {
  value.app.$axios({
    method: 'post',
    url: 'http://46.8.146.12:4300/api/set/date',
    data: { date: value.date },
    timeout: 5000,
    responseType: 'json'
  })
    .then((response) => {
      context.commit('updateDate', value.data)
    })
}

export function getRateStandart (context, value) {
  value.app.$axios({
    method: 'post',
    url: 'http://46.8.146.12:4300/api/get/date',
    data: { },
    timeout: 5000,
    responseType: 'json'
  })
    .then((response) => {
      context.commit('rateRoom', response.data.RateRoom)

      context.commit('standartHotEnergy', response.data.HotEnergy[0])
      context.commit('rateHotEnergy', response.data.HotEnergy[1])

      context.commit('standartHotWaterEnergy', response.data.HotWaterEnergy[0])
      context.commit('rateHotWaterEnergy', response.data.HotWaterEnergy[1])

    })
}
