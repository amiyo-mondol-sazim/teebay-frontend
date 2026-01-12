<script lang="ts" setup>
import { useFieldValue, useSetFieldValue } from 'vee-validate';

const props = defineProps<{ name: string }>();
const categoryId = useFieldValue<number | undefined>(`${props.name}.category.id`);
const setSubcategoryValue = useSetFieldValue(`${props.name}.subcategory`);

const { data: categories } = useCategoriesQuery();
const { data: subcategories } = useSubCategoriesQuery(categoryId);

watch(categoryId, () => {
  setSubcategoryValue(undefined);
});
</script>

<template>
  <FormComboboxObject
    label="Select Category"
    placeholder="Select or search category"
    :name="`${name}.category`"
    :options="categories?.map((cat) => ({ name: cat.name, id: cat.id })) ?? []"
  />
  <FormComboboxObject
    label="Select Subcategory"
    placeholder="Select or search subcategory"
    :name="`${name}.subcategory`"
    :options="subcategories?.map(({ id, name }) => ({ name: name, id: id })) ?? []"
  />
</template>
