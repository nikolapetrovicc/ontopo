<template>
    <div class="bg-gray-100 p-4 md:p-8 rounded-2xl max-w-4xl mx-auto mb-8">
        <!-- Gornji dropdowni (optional) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <location-dropdown />
            <event-dropdown />
        </div>

        <!-- Glavni red sa dropdownima i dugmetom -->
        <div class="flex flex-col md:flex-row" ref="dropdownContainerRef">
            <div class="flex flex-col md:flex-row flex-grow mb-4 md:mb-0">
                <!-- 1. Dropdown za broj osoba -->
                <dropdown v-model="selectedPersons" :options="personOptions" type="persons"
                    buttonClasses="border-r border-gray-300 rounded-t-lg md:rounded-tr-none md:rounded-l-lg"
                    :is-open="activeDropdown === 'persons'" @toggle="toggleDropdown('persons')"
                    ref="personsDropdownRef" />

                <!-- 2. Dropdown za datume -->
                <dropdown v-model="selectedDate" :options="nextSevenDays" type="date"
                    buttonClasses="border-r border-gray-300 md:rounded-none" :is-open="activeDropdown === 'date'"
                    @toggle="toggleDropdown('date')" ref="dateDropdownRef" />

                <!-- 3. Dropdown za vremena -->
                <dropdown v-model="selectedTime" :options="timeSlots" type="time"
                    buttonClasses="rounded-b-lg md:rounded-bl-none md:rounded-r-lg" :max-height="true"
                    :is-open="activeDropdown === 'time'" @toggle="toggleDropdown('time')" ref="timeDropdownRef" />
            </div>

            <!-- Dugme za pretragu -->
            <button @click="search"
                class="bg-gray-950 text-white font-medium py-4 px-8 rounded-lg ml-0 md:ml-4 h-16 hover:bg-gray-800 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                :disabled="isLoading">
                <span v-if="isLoading">Searching...</span>
                <span v-else>Pretraži</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import LocationDropdown from './LocationDropdown.vue';
import EventDropdown from './EventDropdown.vue';
import Dropdown from './Dropdown.vue';

defineProps({
    isLoading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['search']);

// Form state
const activeDropdown = ref(null);
const selectedPersons = ref(4);
const selectedDate = ref(new Date());
const selectedTime = ref('21:30');
const dropdownContainerRef = ref<HTMLElement | null>(null);

// Refs for dropdown components
const personsDropdownRef = ref(null);
const dateDropdownRef = ref(null);
const timeDropdownRef = ref(null);

// Options for dropdowns
const personOptions = computed(() => Array.from({ length: 10 }, (_, i) => i + 1));

const nextSevenDays = computed(() => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date);
    }

    return days;
});

const timeSlots = computed(() => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    for (let hour = 8; hour <= 23; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const slotTime = hour * 60 + minute;
            const slot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

            if (slotTime >= currentTime) {
                slots.push(slot);
            }
        }
    }

    return slots;
});

// Methods
const toggleDropdown = (dropdownName: any) => {
    // If clicking the same dropdown that's already open, close it
    if (activeDropdown.value === dropdownName) {
        activeDropdown.value = null;
    } else {
        // Otherwise, close any open dropdown and open the clicked one
        activeDropdown.value = dropdownName;
    }
};

const search = () => {
    // Format date for the api
    const year = selectedDate.value.getFullYear();
    const month = (selectedDate.value.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.value.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;

    // Format time for the api
    const [hours, minutes] = selectedTime.value.split(':');
    const formattedTime = `${hours}${minutes}`;

    emit('search', {
        date: formattedDate,
        time: formattedTime,
        size: selectedPersons.value.toString()
    });
};

const handleClickOutside = (event: any) => {
    // Only process if a dropdown is open and the click is outside the dropdown container
    if (activeDropdown.value !== null &&
        dropdownContainerRef.value &&
        !dropdownContainerRef.value.contains(event.target)) {
        activeDropdown.value = null;
    }
};

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>
