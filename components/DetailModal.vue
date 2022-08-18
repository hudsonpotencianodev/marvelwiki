<template>
  <b-row>
    <b-col lg="9" md="10" sm="12">
      <b-modal id="detail-modal" :title="title" hide-footer>
        <slot name="modal-content"></slot>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ["id", "title"],
};
</script>
<style lang="scss">
.modal-content {
  background: linear-gradient(to bottom, #ed213a, #93291e);
  color: white;
}
.modal-title {
  font-weight: bold;
  font-size: 1.8rem;
}
.modal-dialog {
  box-shadow: 0 26px 24px -16px rgb(0 0 0);
}
.modal-header {
  border-bottom: none;
}
</style>