let axios = require('axios');

module.exports = {
  retriveProfileData(url) {
    return axios.get(url).then(res => {
      return res;
    })
  }
}