<script setup lang="ts">
import { ref } from "vue";
import { useForm, Field, configure } from "vee-validate";
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
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .min(1, "Largura mínima é 1 cm")
    .required("Largura é obrigatória"),

  height: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .min(1, "Altura mínima é 1 cm")
    .required("Altura é obrigatória"),

  length: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
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

  try {
    const result = await getFreightQuote(values); 

    if (result) {
      quoteResult.value = result;
      freightStore.addToHistory(result);
    }

    resetForm();
  } catch (error) {
    console.error("Erro ao buscar cotação de frete:", error);
  }
});

configure({
  validateOnBlur: false
})

</script>

<template>
  <div class="freight-container">
    <form @submit.prevent="onSubmit" class="freight-form">
      <div class="cep-container">
        <div class="cep-box">
          <label for="cep_origin">CEP de origem</label>
          <Field name="cep_origin" v-slot="{ field, errorMessage }">
            <input v-bind="field" class="input-field" />
            <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
          </Field>
        </div>
        <div class="cep-box">
          <label for="cep_destination">CEP de destino</label>
          <Field name="cep_destination" v-slot="{ field, errorMessage }">
            <input v-bind="field" class="input-field" />
            <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
          </Field>
        </div>
      </div>

      <div class="dimensions-container">
        <div class="input-group">
  <label for="width">Largura</label>
  <Field name="width" v-slot="{ field, errorMessage }">
    <div class="input-with-unit">
      <input v-bind="field" class="input-field" type="number" />
      <span class="unit">CM</span>
    </div>
    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
  </Field>
</div>

<div class="input-group">
  <label for="height">Altura</label>
  <Field name="height" v-slot="{ field, errorMessage }">
    <div class="input-with-unit">
      <input v-bind="field" class="input-field" type="number" />
      <span class="unit">CM</span>
    </div>
    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
  </Field>
</div>

<div class="input-group">
  <label for="length">Comprimento</label>
  <Field name="length" v-slot="{ field, errorMessage }">
    <div class="input-with-unit">
      <input v-bind="field" class="input-field" type="number" />
      <span class="unit">CM</span>
    </div>
    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
  </Field>
</div>

        
        <div class="input-group">
          <label for="weight">Peso</label>
          <Field name="weight" v-slot="{ field, errorMessage }">
            <div class="input-with-unit">
              <input v-bind="field" class="input-field" />
              <span class="unit">KG</span>
            </div>
            <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
          </Field>
        </div>
        <div class="input-group">
          <label for="declared_value">Valor</label>
          <Field name="declared_value" v-slot="{ field, errorMessage }">
            <div class="input-with-unit">
              <input v-bind="field" class="input-field" />
              <span class="unit">R$</span>
            </div>
            <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
          </Field>
        </div>
      </div>

      <button type="submit" class="calculate-button">Calcular Frete</button>
    </form>
  </div>
  
  <FreightResults v-if="quoteResult" :result="quoteResult" />
</template>

<style scoped>
.freight-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.freight-form {
  background: white;
  border: 1px solid #009ee3;
  border-radius: 8px;
  padding: 20px;
  width: 700px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 100%;
}

.cep-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
}

.cep-box {
  flex: 1;
}

.icon {
  font-size: 24px;
  margin: 0 10px;
}

.dimensions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.input-group {
  flex: 1 1 30%;
  min-width: 120px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-field:focus {
  border-color: #ccc; /* Defina a borda para não mudar no foco */
}

.input-with-unit {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  height: '100%'
}

.input-with-unit input {
  flex: 1;
  border: none;
  padding: 8px;
}

.unit {
  background: #f1f1f1;
  padding: 8px;
  font-weight: bold;
  text-transform: uppercase;
}

.calculate-button {
  background: #ff6600;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.error {
  color: red;
  font-size: 12px;
}

@media (min-width: 1366px) {
  .freight-form {
    width: 700px;
  }
  .input-group {
    flex: 1 1 30%; 
  }
}

@media (max-width: 1365px) and (min-width: 768px) {
  .freight-form {
    width: 90%;
  }
  .input-group {
    flex: 1 1 45%;
  }
  .calculate-button {
    font-size: 14px;
  }
}

@media (max-width: 767px) {
  .freight-form {
    width: 95%;
    padding: 10px;
  }
  .cep-container {
    flex-direction: column;
  }
  .input-group {
    flex: 1 1 100%;
  }
  .calculate-button {
    font-size: 14px;
    padding: 8px;
  }
}
</style>
