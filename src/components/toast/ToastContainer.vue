<template>
     <Toast />
</template>

<script>
export default {
   ToastContainer: {
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
       
      if (mutation.type === 'alert/error') {
             this.$toast.add({severity:'error', summary: 'Error', detail: state.alert.message, life: 3000});    

      } else if (mutation.type === 'alert/success') {
             this.$toast.add({severity:'success', summary: state.alert.title, detail: state.alert.message, life: 3000});    

      } else if (mutation.type === 'alert/info') {
             this.$toast.add({severity:'info', summary:  state.alert.title, detail: state.alert.message, life: 3000});
         
      } else if (mutation.type === 'alert/warn') {
             this.$toast.add({severity:'warn', summary:  state.alert.title, detail: state.alert.message, life: 3000});
         
      }
    });
  },
  beforeUnmount() {
    this.unsubscribe();
  },
}
</script>