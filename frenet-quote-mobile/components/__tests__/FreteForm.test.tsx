import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Home from "../form/Home";
import { quoteShipping } from "../../services/frenetService";
import axios from "axios";
import Constants from "expo-constants";

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

jest.mock("axios");

describe("Test quoteShipping", () => {
    it("should call quoteShipping and return the mocked response", async () => {

        (axios.post as jest.Mock).mockResolvedValue({
            data: {
                ShippingServicesArray: [
                    {
                        Carrier: "Transportadora XYZ",
                        ShippingPrice: 100.0,
                        deliveryTime: "2 dias",
                    },
                ],
            },
        });

        const API_TOKEN = Constants.manifest2?.extra.apiToken;

        const requestData = {
            SellerCEP: "12345-678",
            RecipientCEP: "98765-432",
            ShipmentInvoiceValue: 100.0,
            ShippingServiceCode: null,
            ShippingItemArray: [
                {
                    Height: 10,
                    Length: 20,
                    Quantity: 1,
                    Weight: 2,
                    Width: 15,
                },
            ],
            RecipientCountry: "BR",
        };

        const result = await quoteShipping(requestData);

        expect(axios.post).toHaveBeenCalledWith(
            "https://private-anon-b42bafcbb4-frenetapi.apiary-mock.com/shipping/quote",
            requestData,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': API_TOKEN
                }
            }
        );

        expect(result).toEqual({
            ShippingServicesArray: [
                {
                    Carrier: "Transportadora XYZ",
                    ShippingPrice: 100.0,
                    deliveryTime: "2 dias",
                },
            ],
        });
    });
});

test("Preenchimento do formulário e envio", async () => {
    const { getByPlaceholderText, getByText } = render(<Home />);

    fireEvent.changeText(getByPlaceholderText("CEP de origem"), "01001000");
    fireEvent.changeText(getByPlaceholderText("CEP de destino"), "02002000");
    fireEvent.changeText(getByPlaceholderText("Largura"), "30");
    fireEvent.changeText(getByPlaceholderText("Altura"), "20");
    fireEvent.changeText(getByPlaceholderText("Comprimento"), "50");
    fireEvent.changeText(getByPlaceholderText("Peso"), "5");

    fireEvent.press(getByText("Calcular Frete"));
});
