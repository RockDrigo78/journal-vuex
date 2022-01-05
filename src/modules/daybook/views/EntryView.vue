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
        <input
          v-show="false"
          type="file"
          @change="onSelectedfile"
          ref="imageSelector"
          accept="image/png, image/jpeg"
        />
        <button
          v-if="entry.id"
          class="btn btn-danger mx-2"
          @click="onDeleteEntry"
        >
          Delete <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary" @click="onSelectImage">
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
    v-if="entry.picture && !localImage"
    :src="entry.picture"
    alt="photo"
    class="img-thumbnail test"
  />
  <img
    v-if="!entry.picture && localImage"
    :src="localImage"
    alt="photo"
    class="img-thumbnail test1"
  />
  <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import swal from "sweetalert2";
import getDayMonthYear from "../helpers/getDayMonthYear.js";
import uploadImage from "../helpers/uploadImage.js";

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
      localImage: null,
      file: null,
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
      new swal({
        title: "Please wait",
        allowOutsideClick: false,
      });
      swal.showLoading();

      const picture = await uploadImage(this.file);

      this.entry.picture = picture;

      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        await this.createEntry(this.entry).then(() =>
          this.$router.push({ name: "entry", params: { id: this.entry.id } })
        );
      }

      swal.fire("Saving", "Entry successfuly registered", "success");
      this.localImage = null;
    },
    async onDeleteEntry() {
      const result = await swal.fire({
        title: "Are you sure to delete?",
        text: "this action cannot be undone",
        showDenyButton: "true",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        new swal({
          title: "Please wait",
          allowOutsideClick: false,
        });
        swal.showLoading();

        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });

        swal.fire("Deleted", "", "success");
      }
    },
    onSelectedfile(evt) {
      const file = evt.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }

      this.file = file;

      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => (this.localImage = fr.result);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
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