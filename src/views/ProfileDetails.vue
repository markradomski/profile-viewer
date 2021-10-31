<template>
  <div v-if="user">
    <div
      class="container px-16 xs:px-8 md:px-10 xl:px-0 mx-auto max-w-6xl pt-20"
    >
      <div class="bio-container">
        <div class="profile-image-container mb-10 md:mr-20">
          <img class="profile-image" :src="imageLarge" />
        </div>
        <div class="bio-text slideUp">
          <h1 class="capitalize text-5xl mb-2">{{ fullName }}</h1>
          <p class="text-2xl mb-8">{{ user.dept.title }}</p>
          <p class="text-lg">
            {{ user.dept.bio }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  inject: ["GStore"],
  data() {
    return {
      user: null,
    }
  },
  created() {
    if (this.GStore.user) {
      this.user = this.GStore.user
    }
  },

  computed: {
    fullName() {
      const { first, last } = this.user.name
      return `${first + " " + last}`
    },
    image() {
      return require(`@/${this.user.picture.thumbnail}`)
    },
    imageLarge() {
      return require(`@/${this.user.picture.large}`)
    },
  },
}
</script>

<style scoped>
.bio-container {
  display: flex;
  flex-direction: column;
}

.bio-text {
  width: 100%;
}

.profile-image-container {
  height: fit-content;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
@media (min-width: 768px) {
  .bio-container {
    flex-direction: row;
  }
  .profile-image-container {
    width: 30%;
  }
  .bio-text {
    width: 40%;
  }
}

.slideUp {
  animation-name: slideUp;
  animation-duration: 0.7s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
