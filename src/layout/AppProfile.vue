<template>
	<div class="layout-profile">
		<div>
			<!--<img src="assets/layout/images/profile.png" alt="" />-->
		</div>
		<button class="p-link layout-profile-link" @click="onClick">
			<span class="username">{{name}}</span>
			<i class="pi pi-fw pi-cog"></i>
		</button>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li><button class="p-link"><i class="pi pi-fw pi-user"></i><span>Account</span></button></li>
                <li><button class="p-link" @click="logout($event)"><i class="pi pi-fw pi-power-off"></i><span>Logout</span></button></li>
            </ul>
        </transition>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				expanded: false
			}
		},
		computed:{
			name(){
				return `${this.$store.state.authentication.user.firstName} ${this.$store.state.authentication.user.lastName}`;
			}
		},
		methods: {
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
			},
			logout() {
				this.$store.dispatch('authentication/logout');
				this.$router.push('login');
			}
		}
	}
</script>

<style scoped>

</style>