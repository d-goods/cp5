<template>
<div class="pageBox">
  <h1>Register for an account:</h1>
  <form @submit.prevent="register">
    <fieldset style="border: 0;">
      <div class="regForm">
        <p class="require">All fields are required.</p>

        <div class="regField">
          <label for="name">Real Name</label>
          <input v-model="name" type="text" placeholder="Real Name">
        </div>

        <div class="regField">
          <label for="username">Username</label>
          <input v-model="username" type="text" placeholder="Username">
        </div>

        <div class="regField">
          <label for="password">Password</label>
          <input v-model="password" type="password" placeholder="Password">
        </div>

        <div class="pure-controls">
          <button type="submit">Submit</button>
        </div>
      </div>
    </fieldset>
  </form>
  <p v-if="error" class="error">{{error}}</p>
</div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      name: '',
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async register() {
      try {
        this.error = await this.$store.dispatch("register", {
          name: this.name,
          username: this.username,
          password: this.password
        });
        if (this.error === "")
          this.$router.push('user');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: white;
  margin-left: 1em;
}

.pageBox {
  background-color: #002E5D;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: .33em solid #002E5D;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 20px;
}

.regForm {
  width: fit-content;
}

h1 {
  background-color:
}

.require {
  padding: 1em;
  color: darkslategray;
  font-style: italic;
  text-align: center;
}

.regField {
  padding: .33em;
  margin: 1em;
}

input {
  float: right;
  margin: 0 1em 0 1em;
}

.pure-controls {
  padding: 1em;
  display: flex;
  align-items: center;
  width: 100%;
}

.pure-controls button {
  margin: auto;
}

.error {
  color: white;
  text-align: center;
}
</style>