import AsyncStorage from "@react-native-async-storage/async-storage";

export const salvarHistorico = async (data: any) => {
    try {
        const historico = JSON.parse(await AsyncStorage.getItem("historico") || "[]");
        historico.unshift(data);
        await AsyncStorage.setItem("historico", JSON.stringify(historico));
    } catch (error) {
        console.error("Erro ao salvar histórico", error);
    }
};

export const carregarHistorico = async () => {
    try {
        const historico = await AsyncStorage.getItem("historico");
        return historico ? JSON.parse(historico) : [];
    } catch (error) {
        console.error("Erro ao carregar histórico", error);
        return [];
    }
};