<template>
  <ul v-once class="no-bullet">
    <li v-for="(item, index) in items">
      <strong>
          {{ item.title }}
      </strong><span v-html="item.subtitle"></span>
      <br />
      <span v-html="item.desc"></span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'academic',
  data () {
    return {
      items: [
        {
          title: 'The University of the Arts',
          subtitle: '(UArts), 2003 &#8212; 2007',
          desc: 'Bachelor of Fine Arts in Multimedia<br/> Minor in Game Design'
        },
        {
          title: 'The University of the Sciences in Philadelphia',
          subtitle: '&#8212;  2007',
          desc: 'Studied business through their student exchange program.'
        },
        {
          title: 'The Eddie Oliver Entrepreneurial Spirit Award',
          subtitle: '&#8212;  2007',
          desc: 'Awarded by De Angela Duff (<a href="http://polishedsolid.com" target="_blank" title="De Angela L. Duff">polishedsolid.com</a>) and UArts Multimedia Department.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../../../styles/settings';

  li {
    padding-bottom: $global-padding*2;
  }
</style>
