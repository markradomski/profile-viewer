<template>
  <div class="mb-8" v-if="users">
    <div
      class="
        profile-list
        flex flex-no-wrap
        overflow-x-scroll
        scrolling-touch
        items-start
        scroll-snap-x
      "
      @scroll="onScroll"
    >
      <ProfileCard
        v-for="user in this.profiles"
        :key="user.uuid"
        :user="user"
      />
    </div>
    <div v-show="showScroller()" class="flex scroll-controls">
      <button
        class="
          flex
          justify-center
          items-center
          flex-shrink-0
          w-8
          h-12
          cursor-default
        "
        :class="{ disabled: isScrollLeft() }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        class="
          flex
          justify-center
          items-center
          flex-shrink-0
          w-8
          h-12
          cursor-default
        "
        :class="{ disabled: isScrollRight() }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import ProfileCard from "@/components/ProfileCard.vue"

export default {
  props: {
    users: {
      validator: (prop) => typeof prop === "object" || prop === null,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  components: {
    ProfileCard,
  },
  data() {
    return {
      scrollPosition: "LEFT",
      profiles: null,
    }
  },
  created() {
    this.profiles = this.users.filter(
      (user) => user.dept.name === this.department
    )
  },

  methods: {
    onScroll({ target: { scrollLeft, clientWidth, scrollWidth } }) {
      if (scrollLeft < 20) {
        this.scrollPosition = "LEFT"
      }
      if (parseInt(scrollWidth - clientWidth) === scrollLeft) {
        this.scrollPosition = "RIGHT"
      }
    },
    isScrollLeft() {
      return this.scrollPosition === "LEFT"
    },
    isScrollRight() {
      return this.scrollPosition === "RIGHT"
    },
    showScroller() {
      return this.profiles && this.profiles.length > 4
    },
  },
}
</script>

<style>
.profile-list {
}
.profile-list .profile-image-container {
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.profile-list:hover .profile-card:hover {
  filter: grayscale(0%);
}

.scroll-controls button {
  transition: opacity 0.2s ease-in-out;
}

.scroll-controls button.disabled {
  opacity: 0.3;
}
</style>
