import axios from "axios";
import Constants from "expo-constants";

const API_URL = "https://private-anon-b42bafcbb4-frenetapi.apiary-mock.com/shipping/quote";
const API_TOKEN = Constants.manifest2.extra.apiToken;

export const cotarFrete = async (data: any) => {
    try {
        const response = await axios.post(API_URL, data, {
            headers: { Authorization: API_TOKEN },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar cotação", error);
        throw error;
    }
};