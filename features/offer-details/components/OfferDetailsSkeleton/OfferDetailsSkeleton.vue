<template>
  <div class="space-y-8">
    <OfferCardSkeleton class="border-gray-20 border p-4" />

    <div>
      <div class="flex gap-4">
        <UiSkeleton class="h-12 w-48" />
        <UiSkeleton class="h-12 w-32" />
        <UiSkeleton class="h-12 w-40" />
      </div>
      <div class="pt-10">
        <UiSkeleton class="h-64" />
      </div>
    </div>
  </div>
</template>
