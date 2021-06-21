<template>
<div>
    <Card>
        <template #title>
        Account
    </template>
      <template #content>
    <EditAccountForm :id= id />
     </template>
    </Card>
</div>
</template>

<script>
import EditAccountForm from '../../components/accounts/EditAccountForm';
export default {
    components: {
        EditAccountForm,
    },
    data() {
        return {
        }
    },
    computed: {
        id (){
            return this.$route.params.id;
        }
    },
    mounted() {
    }
}
</script>