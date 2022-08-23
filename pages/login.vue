<template>
  <main class="page">
    <div class="login">
      <h1>Welcome!</h1>
      <p style="color:red">{{errorMessage}}</p>
      <form @submit.prevent="onSubmit">
        <input v-model="login" type="email" name="email" id="email" placeholder="Email" />
        <br />
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required="true"
        />
        <br />
        <input
          :disabled="submitting"
          type="submit"
          :value="isLogin ? 'Login' : 'Sign-up'"
          class="button"
          required="true"
          id="done"
        />

        <br />
        <button class="sub-button" @click.prevent="isLogin = false;errorMessage=''" v-if="isLogin">
          Swith to
          <strong>Signup</strong>
        </button>
        <button class="sub-button" @click.prevent="isLogin = true;errorMessage=''" v-if="!isLogin">
          Swith to
          <strong>Login</strong>
        </button>
        <!-- <img src="~/assets/google_icon.svg" alt="Login using Google" /> -->
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Login",
  layout: "empty",
  data() {
    return {
      login: "",
      password: "",
      submitting: false,
      errorMessage: "",
      isLogin: true,
    };
  },
  methods: {
    onSubmit() {
      if (this.submitting) return;
      this.submitting = true;

      this.$store
        .dispatch("authenticateUser", {
          isLogin: this.isLogin,
          login: this.login,
          password: this.password,
        })
        .then((result) => {
          this.submitting = false;
          this.errorMessage = "";
        })
        .catch((error) => {
          this.errorMessage = "User not found. Please verify and try again.";
          this.submitting = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.login {
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  width: 40%;
  text-align: center;
  padding: 5px;
  border-radius: 3rem;
  box-shadow: 0px 0px 8px -5px #000000;
  padding-top: 3%;
  padding-bottom: 5%;
}
h1 {
  cursor: default;
  user-select: none;
}
input,
button {
  border-radius: 3rem;
  border: none;
  padding: 10px;
  text-align: center;
  outline: none;
  margin: 10px;
  width: 50%;
  box-sizing: border-box;
  font-weight: 500;
}
input:hover,
button:hover {
  box-shadow: 0px 0px 8px -5px #000000;
}
input:active,
button:hover {
  box-shadow: 0px 0px 8px -5px #000000;
}
#done {
  background: lightgreen;
}
.button {
  cursor: pointer;
  user-select: none;
}
img {
  height: 2.2rem;
  margin: 10px;
  user-select: none;
}
img:hover {
  box-shadow: 0px 0px 8px -5px #000000;
  cursor: pointer;
  border-radius: 200rem;
}
.sub-button {
  width: auto;
  padding: 5px 15px;
  background-color: #249bfc;
}
@media screen and (max-width: 1200px) {
  input {
    width: 90%;
  }
  .login {
    width: 80%;
  }
  .sub-button {
    width: 70%;
  }
}
</style>