<template>
    <div class="relative flex-1">
        <button class="flex items-center justify-center w-full h-16 bg-gray-200 hover:bg-gray-300 transition-colors"
            :class="buttonClasses" @click.stop="onToggle">
            <span class="font-medium">{{ displayText }}</span>
        </button>

        <!-- Dropdown content -->
        <div v-if="isOpen" class="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1"
            :class="{ 'max-h-60 overflow-y-auto': maxHeight }">
            <ul v-if="options.length > 0">
                <li v-for="(option, index) in options" :key="`option-${index}`" @click="selectOption(option)"
                    class="p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    :class="{ 'bg-gray-200': isOptionSelected(option) }">
                    {{ formatOptionText(option) }}
                </li>
            </ul>
            <div v-else class="p-4 border-b border-gray-100">
                Nema dostupnih opcija
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useFormatters } from '../utils/useFormatters';

const { formatDate, isSameDate, getPersonText } = useFormatters();

type DropdownType = 'persons' | 'date' | 'time';

const props = defineProps({
    // Core props
    modelValue: {
        type: [String, Date, Number],
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    type: {
        type: String as PropType<DropdownType>,
        required: true,
        validator: (value: string) => ['persons', 'date', 'time'].includes(value)
    },
    isOpen: {
        type: Boolean,
        required: true
    },

    // Styling
    buttonClasses: {
        type: String,
        default: ''
    },
    maxHeight: {
        type: Boolean,
        default: false
    },

    // Custom formatters (optional)
    formatDisplay: {
        type: Function,
        default: null
    },
    formatOption: {
        type: Function,
        default: null
    },
    compareOptions: {
        type: Function,
        default: null
    }
});

const emit = defineEmits(['update:modelValue', 'toggle']);

// Display text logic
const displayText = computed(() => {
    if (props.formatDisplay) {
        return props.formatDisplay(props.modelValue);
    }

    // Default formatters based on type
    if (props.type === 'persons') {
        return `${props.modelValue} ${getPersonText(props.modelValue)}`;
    } else if (props.type === 'date') {
        return formatDate(props.modelValue);
    } else {
        return props.modelValue;
    }
});

// Format option text
const formatOptionText = (option: any) => {
    if (props.formatOption) {
        return props.formatOption(option);
    }

    // Default formatters based on type
    if (props.type === 'persons') {
        return `${option} ${getPersonText(option)}`;
    } else if (props.type === 'date') {
        return formatDate(option);
    } else {
        return option;
    }
};

// Check if option is selected
const isOptionSelected = (option: any) => {
    if (props.compareOptions) {
        return props.compareOptions(props.modelValue, option);
    }

    // Default comparisons based on type
    if (props.type === 'date') {
        return isSameDate(props.modelValue, option);
    } else {
        return props.modelValue === option;
    }
};


const onToggle = () => {
    emit('toggle');
};

const selectOption = (option: any) => {
    emit('update:modelValue', option);
    emit('toggle'); // Close the dropdown
};

// Expose methods to parent component
defineExpose({
    close: () => {
        emit('toggle');
    }
});
</script>
