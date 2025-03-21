<script setup lang="ts">
defineProps<{ result:any}> ();
</script>

<template>
    <div class="quote-card">
      <h2 class="text-lg font-bold">Resultado da Cotação</h2>
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

<style scoped>
.quote-card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
