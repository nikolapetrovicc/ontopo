<template>
    <div v-if="isOpen"
        class="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
        <ul>
            <li v-for="(option, index) in options" :key="`option-${index}`" @click="$emit('select', option.value)"
                class="p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                :class="{ 'bg-gray-200': option.value === selectedValue }">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isOpen: boolean;
    options: Array<{
        label: string;
        value: string | number;
    }>;
    selectedValue: string | number;
}>();

defineEmits<{
    (e: 'select', value: string | number): void;
}>();
</script>