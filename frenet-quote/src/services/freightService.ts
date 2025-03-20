import axios from 'axios';

const API_URL = "/api/shipping/quote";
const TOKEN = '1039DC91RE200R440BR9FC3RC0F5BFDCE3FB';

export const getFreightQuote = async (formData: any) => {
    try {
        const payload = {
            SellerCEP: formData.cep_origin,
            RecipientCEP: formData.cep_destination,
            ShipmentInvoiceValue: formData.declared_value,
            ShippingServiceCode: null,
            ShippingItemArray: [
                {
                    Height: formData.height,
                    Length: formData.length,
                    Quantity: 1,
                    Weight: formData.weight,
                    Width: formData.width
                }
            ],
            RecipientCountry: "BR"
        };

        const response = await axios.post(API_URL, payload, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': TOKEN
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar cotação de frete:', error);
        return null;
    }
};

