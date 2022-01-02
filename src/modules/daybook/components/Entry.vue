<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: entry.id } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-5">{{ month }}</span>
      <span class="mx-2 fw-light">{{ year }},</span>
      <span class="mx-2 fw-light">{{ weekday }}</span>
    </div>
    <div class="entry-description">
      {{ shortText }}
    </div>
  </div>
</template>

<script>
import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear.js";

export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shortText() {
      return this.entry.text.length > 130
        ? this.entry.text.substring(0, 130) + "..."
        : this.entry.text;
    },
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
  },
};
</script>

<style lang='scss' scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all eaase-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description {
    font-size: 12px;
  }
}
</style>