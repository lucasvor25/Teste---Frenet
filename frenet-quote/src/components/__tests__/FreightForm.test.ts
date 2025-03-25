import { vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import FreightForm from "../form/FreightForm.vue";
import { useFreightStore } from "@/stores/useFreightStore";
import { getFreightQuote } from "@/services/freightService";

vi.mock("@/services/freightService", () => ({
    getFreightQuote: vi.fn().mockResolvedValue({
        price: 50,
        estimatedDelivery: "2025-03-30"
    })
}));

describe("FreightForm", () => {

    let pinia: any;
    let store: any;

    beforeEach(() => {

        pinia = createPinia();
        setActivePinia(pinia);

        store = useFreightStore();

        vi.clearAllMocks();
    });

    it("deve chamar getFreightQuote e atualizar o histórico", async () => {

        const wrapper = mount(FreightForm, {
            global: {
                plugins: [pinia]
            }
        });

        await wrapper.find('input[name="cep_origin"]').setValue('12345678');
        await wrapper.find('input[name="cep_destination"]').setValue('87654321');
        await wrapper.find('input[name="weight"]').setValue('10');
        await wrapper.find('input[name="width"]').setValue('20');
        await wrapper.find('input[name="height"]').setValue('30');
        await wrapper.find('input[name="length"]').setValue('40');
        await wrapper.find('input[name="declared_value"]').setValue('500');

        await wrapper.find('form').trigger('submit');

        await vi.waitFor(() => {
            expect(getFreightQuote).toHaveBeenCalled();
        });
    });
});
