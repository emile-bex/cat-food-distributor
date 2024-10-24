import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_URL
})

export async function postServeFood() {
  try {
    await instance.post('/food-servings')
  } catch (err) {
    console.error(err)
  }
}
