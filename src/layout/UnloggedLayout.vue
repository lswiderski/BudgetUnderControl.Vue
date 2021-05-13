<template>
  <div :class="containerClass">
		<div class="layout-main ">
			<router-view />
		</div>
		<AppFooter />
	</div>
</template>
<script>
import AppFooter from './AppFooter.vue';
export default {
  mainLayout: {
  },
  data() {
        return {
            layoutMode: 'static',
            layoutColorMode: 'dark',
        }
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        }
    },
    methods: {
       
        isDesktop() {
            return window.innerWidth > 1024;
        },  
    },
    computed: {
        containerClass() {
            return ['layout-wrapper',
            'unlogged-layout', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
				'p-input-filled': this.$appState.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
     
    },
   
    components: {
        'AppFooter': AppFooter,
    }
};
</script>
<style lang="scss" >
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.layout-wrapper.layout-static.unlogged-layout .layout-main,
.layout-wrapper.layout-static.unlogged-layout .layout-footer {
    margin-left: 0;
}
</style>
