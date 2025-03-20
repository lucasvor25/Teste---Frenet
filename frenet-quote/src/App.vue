<script setup lang="ts">
import FreightForm from '@/components/form/FreightForm.vue';
import { useFreightStore } from '@/stores/useFreightStore';

const freightStore = useFreightStore();
console.log('freightStore', freightStore.history)
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Cotação de Frete</h1>
    <FreightForm />

    <div v-if="freightStore.history.length" class="mt-6">
      <h2 class="text-xl font-bold">Histórico de Cotações</h2>
      <ul>
        <li v-for="(quote, index) in freightStore.history" :key="index">
          <div v-if="quote.ShippingSevicesArray && quote.ShippingSevicesArray.length">
            <div v-for="(service, serviceIndex) in quote.ShippingSevicesArray" :key="serviceIndex">
              <strong>Transportadora:</strong> {{ service.Carrier }} <br>
              <strong>Serviço:</strong> {{ service.ServiceDescription }} <br>
              <strong>Preço:</strong> R$ {{ service.ShippingPrice }} <br>
              <strong>Tempo de Entrega:</strong> {{ service.DeliveryTime }} dias úteis
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
