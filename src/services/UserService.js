export default {
  getUsers() {
    return fetch("./db.json").then((resp) => resp.json())
  },
}
