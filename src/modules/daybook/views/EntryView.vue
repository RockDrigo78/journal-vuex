<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ year }},</span>
        <span class="mx-2 fs-4 fw-light">{{ weekday }}</span>
        <span class="mx-2 fs-4 fw-light">{{ hour }}</span>
      </div>
      <div>
        <button
          v-if="entry.id"
          class="btn btn-danger mx-2"
          @click="onDeleteEntry"
        >
          Delete <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary">
          Upload photo <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea
        placeholder="What happened today?"
        v-model="entry.text"
      ></textarea>
    </div>
  </template>
  <img
    src="https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159_640.jpg"
    alt="photo"
    class="img-thumbnail"
  />
  <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear.js";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  data: () => {
    return {
      entry: null,
    };
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },
    async saveEntry() {
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        await this.createEntry(this.entry).then(() =>
          this.$router.push({ name: "entry", params: { id: this.entry.id } })
        );
      }
    },
    async onDeleteEntry() {
      await this.deleteEntry(this.entry.id);
      this.$router.push({ name: "no-entry" });
    },
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      return getDayMonthYear(this.entry.date).day;
    },
    weekday() {
      return getDayMonthYear(this.entry.date).weekday;
    },
    month() {
      return getDayMonthYear(this.entry.date).month;
    },
    year() {
      return getDayMonthYear(this.entry.date).year;
    },
    hour() {
      const today = new Date();
      return (
        (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) +
        ":" +
        (today.getMinutes() < 10
          ? "0" + today.getMinutes()
          : today.getMinutes()) +
        ":" +
        (today.getSeconds() < 10
          ? "0" + today.getSeconds()
          : today.getSeconds())
      );
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0 5px 10px rgba($color: #000, $alpha: 0.2);
}
</style>