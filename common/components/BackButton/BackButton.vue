<script setup lang="ts">
interface Props {
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: "Back",
});

const router = useRouter();
</script>

<template>
  <UiButton variant="ghost" size="sm" @click="router.back()">
    <Icon name="heroicons:arrow-left" class="mr-2 h-4 w-4" />
    {{ label }}
  </UiButton>
</template>
