<template>
    <button class="flex items-center justify-center w-full h-16 bg-gray-200 hover:bg-gray-300 transition-colors"
        :class="[className, { 'bg-gray-300': isOpen }]" @click.stop="$emit('toggle')">
        <span class="font-medium">{{ label }}</span>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    label: string;
    isOpen: boolean;
    className?: string;
}>();

defineEmits<{
    (e: "toggle"): void;
}>();
</script>
