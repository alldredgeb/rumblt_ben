let utils = require('./../../utils/profileFunctions')

describe('all of my unit tests', () => {

  test('get the profile information', () => {
    return utils.retriveProfileData('http://localhost:3334/api/users/Lc6wJqWCFwVXfLUm0FhqwUa09AL2').then(res => {
    expect(res.data).toBeTruthy();
    })
  })

  test('should return name', () => {
    return utils.retriveProfileData('http://localhost:3334/api/users/Lc6wJqWCFwVXfLUm0FhqwUa09AL2').then(res => {
      expect(res.data[0].name).toBeTruthy();
    })
  })

  test('should return username', () => {
    return utils.retriveProfileData('http://localhost:3334/api/users/Lc6wJqWCFwVXfLUm0FhqwUa09AL2').then(res => {
      expect(res.data[0].username).toBeTruthy();
    })
  })

  test('should return blog title', () => {
    return utils.retriveProfileData('http://localhost:3334/api/users/Lc6wJqWCFwVXfLUm0FhqwUa09AL2').then(res => {
      expect(res.data[0].blogtitle).toBeTruthy();
    })
  })

  test('should return user image', () => {
    return utils.retriveProfileData('http://localhost:3334/api/users/Lc6wJqWCFwVXfLUm0FhqwUa09AL2').then(res => {
      expect(res.data[0].userimg).toBeTruthy();
    })
  })

})

