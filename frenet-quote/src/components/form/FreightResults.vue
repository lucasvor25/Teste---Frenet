<script setup lang="ts">
defineProps<{ result:any}> ();
</script>

<template>
    <div class="mt-4 bg-gray-100 p-4 rounded-md">
        <h2 class="text-lg font-bold">
            Resultado da Cotação
        </h2>
        <ul v-if="result.ShippingSevicesArray">
            <li v-for="service in result.ShippingSevicesArray" :key="service.ServiceCode">
                <p>
                    <strong>Transportadora:</strong> {{ service.Carrier }} <br>
                    <strong>Serviço:</strong> {{ service.ServiceDescription }} <br>
                    <strong>Preço:</strong> R$ {{ service.ShippingPrice }} <br>
                    <strong>Entrega:</strong> {{ service.DeliveryTime }} dias úteis
                </p>
            </li>
        </ul>
    </div>
</template>
