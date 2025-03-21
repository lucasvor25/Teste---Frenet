<script setup lang="ts">
import FreightForm from '@/components/form/FreightForm.vue';
import { useFreightStore } from '@/stores/useFreightStore';

const freightStore = useFreightStore();

</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Cotação de Frete</h1>
    <FreightForm />

    <div v-if="freightStore.history.length" class="mt-6">
      <h2 class="text-xl font-bold mb-4">Histórico de Cotações</h2>
      <div class="history-grid">
        <div
          v-for="(quote, index) in freightStore.history.slice(0, 10)"
          :key="index"
          class="quote-card"
        >
          <div v-if="quote.ShippingSevicesArray && quote.ShippingSevicesArray.length">
            <div v-for="(service, serviceIndex) in quote.ShippingSevicesArray" :key="serviceIndex">
              <strong>Transportadora:</strong> {{ service.Carrier }} <br>
              <strong>Serviço:</strong> {{ service.ServiceDescription }} <br>
              <strong>Preço:</strong> R$ {{ service.ShippingPrice }} <br>
              <strong>Tempo de Entrega:</strong> {{ service.DeliveryTime }} dias úteis
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.quote-card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
