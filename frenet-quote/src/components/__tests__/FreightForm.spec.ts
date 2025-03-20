import { mount } from '@vue/test-utils';
import FreightForm from '../form/FreightForm.vue';
import axios from 'axios';
import { flushPromises } from '@vue/test-utils';

jest.mock('axios');

beforeAll(() => {
    // Mock para o localStorage
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: jest.fn(() => '[]'),
            setItem: jest.fn(),
        },
        writable: true,
    });
});

describe('FreightForm.vue', () => {
    let wrapper: any;

    beforeEach(() => {
        // Criando o wrapper do componente
        wrapper = mount(FreightForm);
    });

    it('deve renderizar o formulário corretamente', () => {
        // Testando a renderização do formulário
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('form').exists()).toBe(true);
        expect(wrapper.find('[name="cep_origin"]').exists()).toBe(true);
        expect(wrapper.find('[name="cep_destination"]').exists()).toBe(true);
        expect(wrapper.find('[name="weight"]').exists()).toBe(true);
        expect(wrapper.find('[name="width"]').exists()).toBe(true);
        expect(wrapper.find('[name="height"]').exists()).toBe(true);
        expect(wrapper.find('[name="length"]').exists()).toBe(true);
        expect(wrapper.find('[name="declared_value"]').exists()).toBe(true);
    });

    it('deve exibir erros de validação para campos obrigatórios vazios', async () => {
        // Submetendo o formulário com campos vazios
        await wrapper.find('form').trigger('submit.prevent');

        // Verificando se os erros de validação são exibidos
        expect(wrapper.text()).toContain('CEP de origem é obrigatório');
        expect(wrapper.text()).toContain('CEP de destino é obrigatório');
        expect(wrapper.text()).toContain('Peso é obrigatório');
    });

    it('deve enviar os dados corretamente para a API', async () => {
        const mockResponse = { data: { price: 50.0 } };
        (axios.post as jest.Mock).mockResolvedValue(mockResponse);

        // Preenchendo os campos do formulário
        await wrapper.find('[name="cep_origin"]').setValue('12345678');
        await wrapper.find('[name="cep_destination"]').setValue('87654321');
        await wrapper.find('[name="weight"]').setValue(2);
        await wrapper.find('[name="width"]').setValue(50);
        await wrapper.find('[name="height"]').setValue(60);
        await wrapper.find('[name="length"]').setValue(70);
        await wrapper.find('[name="declared_value"]').setValue(100);

        // Submetendo o formulário
        await wrapper.find('form').trigger('submit.prevent');

        // Espera até que as promessas da API sejam resolvidas
        await flushPromises();

        // Verificando se a requisição foi feita com os dados corretos
        expect(axios.post).toHaveBeenCalledWith(
            'https://api.frenet.com.br/shipping/quote', // Ajuste a URL conforme sua implementação
            {
                cep_origin: '12345678',
                cep_destination: '87654321',
                weight: 2,
                width: 50,
                height: 60,
                length: 70,
                declared_value: 100,
            }
        );

        // Verificando a resposta da API
        expect(wrapper.text()).toContain('Preço do frete: 50.0');
    });

    it('deve armazenar o histórico de cotações no localStorage', async () => {
        const mockResponse = { data: { price: 50.0 } };
        (axios.post as jest.Mock).mockResolvedValue(mockResponse);

        // Preenchendo o formulário e enviando
        await wrapper.find('[name="cep_origin"]').setValue('12345678');
        await wrapper.find('[name="cep_destination"]').setValue('87654321');
        await wrapper.find('[name="weight"]').setValue(2);
        await wrapper.find('[name="width"]').setValue(50);
        await wrapper.find('[name="height"]').setValue(60);
        await wrapper.find('[name="length"]').setValue(70);
        await wrapper.find('[name="declared_value"]').setValue(100);

        await wrapper.find('form').trigger('submit.prevent');
        await flushPromises();

        // Verificando se o histórico foi armazenado no localStorage
        const history = JSON.parse(localStorage.getItem('freightHistory') || '[]');
        expect(history.length).toBeGreaterThan(0);
        expect(history[0].price).toBe(50.0);

        // Verificando se localStorage.setItem foi chamado corretamente
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'freightHistory',
            JSON.stringify([{ price: 50.0 }])
        );
    });
});
