<template>
  <div class="not-found">
    <h1>
      {{msg}}<div class="svg-icon postfix"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27" height="32" viewBox="0 0 27 32">
<path d="M20.25 21.946q0.143 0.446-0.071 0.866t-0.661 0.563-0.875-0.071-0.571-0.679q-0.446-1.429-1.652-2.313t-2.705-0.884-2.705 0.884-1.652 2.313q-0.143 0.464-0.563 0.679t-0.866 0.071q-0.464-0.143-0.679-0.563t-0.071-0.866q0.661-2.161 2.464-3.482t4.071-1.321 4.071 1.321 2.464 3.482zM11.429 11.429q0 0.946-0.67 1.616t-1.616 0.67-1.616-0.67-0.67-1.616 0.67-1.616 1.616-0.67 1.616 0.67 0.67 1.616zM20.571 11.429q0 0.946-0.67 1.616t-1.616 0.67-1.616-0.67-0.67-1.616 0.67-1.616 1.616-0.67 1.616 0.67 0.67 1.616zM25.143 16q0-2.321-0.911-4.438t-2.438-3.643-3.643-2.438-4.438-0.911-4.438 0.911-3.643 2.438-2.438 3.643-0.911 4.438 0.911 4.438 2.438 3.643 3.643 2.438 4.438 0.911 4.438-0.911 3.643-2.438 2.438-3.643 0.911-4.438zM27.429 16q0 3.732-1.839 6.884t-4.991 4.991-6.884 1.839-6.884-1.839-4.991-4.991-1.839-6.884 1.839-6.884 4.991-4.991 6.884-1.839 6.884 1.839 4.991 4.991 1.839 6.884z"></path>
</svg></div>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  data () {
    return {
      msg: 'Page Not Found'
    }
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.not-found {
  width: 100%;
	display: flex;
  flex-direction: row nowrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  @include breakpoint(medium) {
    align-items: center;
  }
}

</style>
