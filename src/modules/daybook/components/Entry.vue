<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: 10 } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">December</span>
      <span class="mx-1 fs-5">31</span>
      <span class="mx-2 fw-light">2021</span>
    </div>
    <div class="entry-description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
      voluptatibus dolore exercitationem veniam quaerat, enim id nihil
      doloremque temporibus! Esse iste voluptas at reiciendis officiis iure
      velit sed quaerat distinctio.
    </div>
  </div>
</template>

<script>
export default {};
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