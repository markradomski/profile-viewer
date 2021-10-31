<template>
  <div v-if="users">
    <div
      class="container px-16 xs:px-8 md:px-10 xl:px-0 mx-auto max-w-6xl pt-20"
    >
      <div class="max-w-lg mb-20 slideRight">
        <h1 class="text-5xl my-8">Our team</h1>
        <p class="text-lg">
          We help leaders adapt to a world of accelerating change and empower
          them to leverage tech to improve the planet.
        </p>
      </div>
      <div class="fadeIn">
        <ProfileList :users="users" :department="'Engineering'" />
        <ProfileList :users="users" :department="'Computer Science'" />
        <ProfileList :users="users" :department="'Humanities'" />
        <ProfileList :users="users" :department="'Architecture'" />
      </div>
    </div>

    <!-- OLD -->
    <div
      class="container px-16 xs:px-8 md:px-10 xl:px-0 mx-auto max-w-6xl mt-20"
    >
      <div
        class="
          profile-list
          grid grid-cols-1
          xs:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        <!--  -->
      </div>
    </div>
    <div class="bg-gray-100 mt-12 pt-4 pb-8">
      <div
        class="container px-16 xs:px-8 md:px-10 xl:px-0 mx-auto max-w-6xl my-20"
      >
        <div class="max-w-lg mb-20 slideRight">
          <h1 class="text-5xl my-8">Our Global Network</h1>
          <p class="text-lg">The Singularity is everywhere. And so are we.</p>
        </div>
        <div class="fadeIn">
          <BaseMap v-if="users" :users="users" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js"
import ProfileList from "@/components/ProfileList.vue"
import BaseMap from "@/components/BaseMap.vue"

export default {
  components: {
    ProfileList,
    BaseMap,
  },
  data() {
    return {
      users: null,
    }
  },
  created() {
    UserService.getUsers()
      .then((response) => {
        if (response && response.results) {
          this.users = response.results
        }
      })
      .catch((err) => {
        console.log("Error:" + err)
      })
  },
}
</script>

<style scoped>
.slideRight {
  animation-name: slideRight;
  animation-duration: 0.7s;
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translate3d(-10%, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  animation: fadeIn 1s ease-in;
}
</style>
