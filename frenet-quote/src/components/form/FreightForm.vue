<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useForm, Field } from "vee-validate";
import * as yup from "yup";
import { getFreightQuote } from "@/services/freightService";
import { useFreightStore } from "@/stores/useFreightStore";
import FreightResults from "./FreightResults.vue";

const freightStore = useFreightStore();

const schema = yup.object({
  cep_origin: yup
    .string()
    .matches(/^\d{8}$/, "CEP de origem inválido, deve ter 8 dígitos.")
    .required("CEP de origem é obrigatório"),

  cep_destination: yup
    .string()
    .matches(/^\d{8}$/, "CEP de destino inválido, deve ter 8 dígitos.")
    .required("CEP de destino é obrigatório"),

  weight: yup
    .number()
    .min(0.1, "Peso mínimo é 0.1kg")
    .required("Peso é obrigatório"),

  width: yup
    .number()
    .min(1, "Largura mínima é 1 cm")
    .required("Largura é obrigatória"),

  height: yup
    .number()
    .min(1, "Altura mínima é 1 cm")
    .required("Altura é obrigatória"),

  length: yup
    .number()
    .min(1, "Comprimento mínimo é 1 cm")
    .required("Comprimento é obrigatório"),

  declared_value: yup
    .number()
    .min(0, "Valor declarado deve ser positivo")
    .required("Valor declarado é obrigatório"),
});

const { handleSubmit, resetForm } = useForm({ validationSchema: schema });

const quoteResult = ref<any>(null);

const onSubmit = handleSubmit(async (values) => {
  console.log("Valores enviados:", values);

  try {
    const result = await getFreightQuote(values); 
    console.log("Resposta da API:", result);

    if (result) {
      quoteResult.value = result;
      freightStore.addToHistory(result);
    }

    resetForm();
  } catch (error) {
    console.error("Erro ao buscar cotação de frete:", error);
  }
});

</script>

<template>
  <form @submit.prevent="onSubmit" class="p-4 bg-white shadow rounded-md">
    <div
      v-for="field in ['cep_origin', 'cep_destination', 'weight', 'width', 'height', 'length', 'declared_value']"
      :key="field"
    >
      <label :for="field">
        {{ field.replace("_", " ").toUpperCase() }}
      </label>
      <Field :name="field" v-slot="{ field: slotProps, errorMessage }">
        <input v-bind="slotProps" class="border p-2 w-full rounded-md" />
        <span v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</span>
      </Field>
    </div>
    <button type="submit" class="bg-blue-500 text-white p-2 mt-3 rounded-md w-full">
      Calcular Frete
    </button>
  </form>
  
  <FreightResults v-if="quoteResult" :result="quoteResult" />
</template>
