<template>
  <router-link
    class="
      relative
      flex-none
      w-full
      xs:w-1/2
      md:w-1/3
      lg:w-1/4
      pr-6
      mb-2
      mt-2
      ml-4
    "
    :to="{ name: 'ProfileDetails', params: { id: user.uuid } }"
    @click="onClick"
  >
    <div class="profile-card">
      <div class="profile-image-container">
        <v-lazy-image
          class="profile-image"
          :src="imageLarge"
          :src-placeholder="image"
        />
      </div>
      <div class="profile-details pt-4">
        <p
          class="
            person-name
            capitalize
            leading-4
            overflow-ellipsis overflow-hidden
          "
        >
          {{ fullName }}
        </p>
        <p class="person-title overflow-ellipsis overflow-hidden">
          {{ user.dept.title }}
        </p>
        <p class="person-email truncate mt-1">{{ user.email }}</p>
      </div>
    </div>
    <div class="mt-4 h-28">
      <div
        class="dept-badge truncate"
        :style="{
          'background-color': user.dept.backgroundColor,
          color: user.dept.color,
        }"
      >
        <p class="name mb-2">
          {{ user.dept.name }}
        </p>
        <span class="description">
          {{ user.dept.description }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import VLazyImage from "v-lazy-image"
</script>

<script>
export default {
  inject: ["GStore"],
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.GStore.user = this.user
    },
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
.profile-card {
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  filter: grayscale(100%);
}

.profile-card:hover .person-name {
  color: #ea533c;
}

.dept-badge {
  padding: 4px 9px;
  font-size: 0.8rem;
  border-radius: 3px;
  display: inline-block;
  transition: 0.3s ease-out;
  height: 0;
  min-height: 28px;
  width: 100%;
}

.dept-badge:hover {
  display: block;
  height: 100%;
  width: 100%;
}

.name {
  min-width: fit-content;
}

.description {
  white-space: normal;
}

.profile-image-container {
  position: relative;
  background-color: #eeeef1;
  display: block;
  overflow: hidden;
  padding-bottom: 100%;
}

.profile-image {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.v-lazy-image {
  filter: blur(20px);
  transition: filter 1.6s;
  will-change: filter;
}
.v-lazy-image-loaded {
  filter: blur(0);
}

.person-title {
  color: #4c4c45a8;
}
</style>
