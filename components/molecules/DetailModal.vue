<template>
  <b-row>
    <b-col lg="9" md="10" sm="12">
      <b-modal
        id="detail-modal"
        :title="title"
        title-class="detail-modal-title"
        hide-footer
      >
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
  background-color: var(--backgroud-theme);
}
.modal-title {
  font-weight: 500;
  font-size: 1.8rem;
}
.modal-dialog {
  box-shadow: 0 26px 24px -16px rgb(0 0 0);
}
.modal-header {
  border-bottom: none;
}
.detail-modal-title {
  font-size: 1.5rem;
  line-height: 25px;
}
.close {
  color: var(--background-red-theme);
  font-size: 30px;
  text-shadow: none;
  opacity: 1;
}
.carousel-control-next-icon,
.carousel-control-prev-icon {
  background-color: var(--background-red-theme);
  border-radius: 30px;
  background-size: 14px;
  opacity: 1;
}
</style>
