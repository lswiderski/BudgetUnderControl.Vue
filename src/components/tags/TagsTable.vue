<template>
    <div>
         <div class="card">
              <Toolbar class="p-mb-4">
                <template #right>
                    <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
                </template>
            </Toolbar>
       <DataTable :value="tags.items" responsiveLayout="scroll" dataKey="id" 
         :paginator="true" :rows="10"  :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tags">

                <template #header>
                    <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h5 class="p-mb-2 p-m-md-0 p-as-md-center">Manage Tags</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>
            <Column field="name" header="Name"></Column>
        <Column :exportable="false">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editTag(slotProps.data)" />
                        
                    </template>
                </Column>
        </DataTable>
         </div>

              <Dialog v-model:visible="tagDialog" :style="{width: '450px'}" header="tag Details" :modal="true" class="p-fluid">
            <div class="p-field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="tag.name" required="true" autofocus :class="{'p-invalid': submitted && !tag.name}" />
                <small class="p-error" v-if="submitted && !tag.name">Name is required.</small>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveTag" />
            </template>
        </Dialog>

    </div>
 
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import { tagsService } from '../../services';
export default {
    data() {
        return {
        tagDialog:false,
        tag:{},
        submitted:false,
         filters: {},
        }
    },
    computed: {
         tags () {
            return this.$store.state.tags.tags;
        }
    },
    created () {
        this.$store.dispatch('tags/getAll');
        this.initFilters();
    },
    methods: {
         openNew() {
            this.tag = {};
            this.submitted = false;
            this.tagDialog = true;
        },
         hideDialog() {
            this.tagDialog = false;
            this.submitted = false;
        },
          editTag(item) {
              const _self = this;
             tagsService
        .get(item.externalId)
        .then(dto => {
          _self.tag =  {...dto}; //Object.assign({}, dto);
          _self.tagDialog = true;
        })
        .catch(errors => {
          _self.errors = errors;
        });
        },
        saveTag() {
            this.submitted = true;

			if (this.tag.name.trim()) {
                if (this.tag.id) {
                
                    this.tags.items[this.findIndexById(this.tag.id)] = this.tag;
                     tagsService.edit(this.tag.externalId, this.tag)
                      .then(() => {
                    this.$store.dispatch("tags/getAll");
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'tag Updated', life: 3000});
            });
                }
                else {
                      this.tags.items.push(this.tag);
                     tagsService.add(this.tag)
                      .then(() => {
                    this.$store.dispatch("tags/getAll");
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'tag Created', life: 3000});
            });
                }

                this.tagDialog = false;
                this.tag = {};
            }
        },
         findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.tags.items.length; i++) {
                if (this.tags.items[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        },
         initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
    }
};
</script>