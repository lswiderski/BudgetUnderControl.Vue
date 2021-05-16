<template>
    <div>
       <DataTable :value="categories.items" responsiveLayout="scroll">
            <Column field="name" header="Name"></Column>

        </DataTable>
    </div>
 
</template>

<script>

export default {
    computed: {
         categories () {
            return this.$store.state.categories.categories;
        }
    },
    created () {
        this.$store.dispatch('categories/getAll');
    },
    methods: {
    }
};
</script>