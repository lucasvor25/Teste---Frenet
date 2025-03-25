import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { quoteShipping } from "../../services/frenetService";
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FreteCalculator = () => {

    const [showResults, setShowResults] = useState(false);
    const [resultData, setResultData] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: {
            SellerCEP: "",
            RecipientCEP: "",
            ShipmentInvoiceValue: "",
            Height: "",
            Length: "",
            Quantity: "",
            Weight: "",
            Width: "",
        },
        mode: "onChange",
    });

    const loadHistory = async () => {
        try {
            const storedHistory = await AsyncStorage.getItem('history');
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Erro ao carregar o histórico", error);
        }
    };

    const saveHistory = async (newQuote: any) => {
        try {
            const updatedHistorico = [...history, newQuote];
            await AsyncStorage.setItem('history', JSON.stringify(updatedHistorico));
            setHistory(updatedHistorico);
        } catch (error) {
            console.error("Erro ao salvar o histórico", error);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    const onSubmit = async (data: any) => {
        const requestData = {
            SellerCEP: data.SellerCEP,
            RecipientCEP: data.RecipientCEP,
            ShipmentInvoiceValue: parseFloat(data.ShipmentInvoiceValue),
            ShippingServiceCode: null,
            ShippingItemArray: [
                {
                    Height: parseFloat(data.Height),
                    Length: parseFloat(data.Length),
                    Quantity: parseInt(data.Quantity, 10),
                    Weight: parseFloat(data.Weight),
                    Width: parseFloat(data.Width),
                },
            ],
            RecipientCountry: "BR",
        };

        try {
            const result = await quoteShipping(requestData);

            setResultData(result);
            setShowResults(true);

            const quote = {
                Carrier: result?.ShippingSevicesArray?.[0]?.Carrier,
                ShippingPrice: result?.ShippingSevicesArray?.[0]?.ShippingPrice,
                deliveryTime: result?.ShippingSevicesArray?.[0]?.deliveryTime,
            };

            saveHistory(quote);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível buscar a cotação.");
        }
    };

    const handleBack = () => {
        setShowResults(false);
        reset();
    };

    return (
        <View style={styles.container}>
            {!showResults ? (
                <View>
                    <Text style={styles.title}>Calculadora de Frete</Text>

                    <View style={styles.formBox}>
                        <Controller
                            control={control}
                            name="SellerCEP"
                            rules={{
                                required: "CEP de origem é obrigatório",
                                minLength: { value: 8, message: "CEP deve ter 8 dígitos" },
                                maxLength: { value: 8, message: "CEP deve ter 8 dígitos" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    placeholder="CEP de origem"
                                    value={value}
                                    onChangeText={onChange}
                                    style={[styles.input, errors.SellerCEP && styles.errorInput]}
                                    keyboardType="numeric"
                                />
                            )}
                        />
                        {errors.SellerCEP && <Text style={styles.errorText}>{errors.SellerCEP.message}</Text>}

                        <Controller
                            control={control}
                            name="RecipientCEP"
                            rules={{
                                required: "CEP de destino é obrigatório",
                                minLength: { value: 8, message: "CEP deve ter 8 dígitos" },
                                maxLength: { value: 8, message: "CEP deve ter 8 dígitos" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    placeholder="CEP de destino"
                                    value={value}
                                    onChangeText={onChange}
                                    style={[styles.input, errors.RecipientCEP && styles.errorInput]}
                                    keyboardType="numeric"
                                />
                            )}
                        />
                        {errors.RecipientCEP && <Text style={styles.errorText}>{errors.RecipientCEP.message}</Text>}

                        <View style={styles.row}>
                            <Controller
                                control={control}
                                name="Height"
                                rules={{
                                    required: "Altura é obrigatória",
                                    min: { value: 1, message: "Altura deve ser maior ou igual a 1" },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder="Altura"
                                        keyboardType="numeric"
                                        value={value}
                                        onChangeText={onChange}
                                        style={[styles.input, styles.rowInput, errors.Height && styles.errorInput]}
                                    />
                                )}
                            />
                            {errors.Height && <Text style={styles.errorText}>{errors.Height.message}</Text>}

                            <Controller
                                control={control}
                                name="Width"
                                rules={{
                                    required: "Largura é obrigatória",
                                    min: { value: 1, message: "Largura deve ser maior ou igual a 1" },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder="Largura"
                                        keyboardType="numeric"
                                        value={value}
                                        onChangeText={onChange}
                                        style={[styles.input, styles.rowInput, errors.Width && styles.errorInput]}
                                    />
                                )}
                            />
                            {errors.Width && <Text style={styles.errorText}>{errors.Width.message}</Text>}
                        </View>

                        <View style={styles.row}>
                            <Controller
                                control={control}
                                name="Length"
                                rules={{
                                    required: "Comprimento é obrigatório",
                                    min: { value: 1, message: "Comprimento deve ser maior ou igual a 1" },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder="Comprimento"
                                        keyboardType="numeric"
                                        value={value}
                                        onChangeText={onChange}
                                        style={[styles.input, styles.rowInput, errors.Length && styles.errorInput]}
                                    />
                                )}
                            />
                            {errors.Length && <Text style={styles.errorText}>{errors.Length.message}</Text>}

                            <Controller
                                control={control}
                                name="Weight"
                                rules={{
                                    required: "Peso é obrigatório",
                                    min: { value: 0.1, message: "Peso deve ser maior ou igual a 0.1" },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder="Peso"
                                        keyboardType="numeric"
                                        value={value}
                                        onChangeText={onChange}
                                        style={[styles.input, styles.rowInput, errors.Weight && styles.errorInput]}
                                    />
                                )}
                            />
                            {errors.Weight && <Text style={styles.errorText}>{errors.Weight.message}</Text>}
                        </View>

                        <Button
                            title="Calcular Frete"
                            onPress={handleSubmit(onSubmit)}
                            color="#007BFF"
                            disabled={!isValid}
                        />
                    </View>

                    {history.length > 0 && (
                        <View style={styles.historicoBox}>
                            <Text style={styles.title}>Histórico</Text>
                            {history.map((item, index) => (
                                <View key={index} style={styles.historicoItem}>
                                    <Text>Empresa: {item.Carrier}</Text>
                                    <Text>Preço: R${item.ShippingPrice}</Text>
                                    <Text>Tempo de Entrega: {item.deliveryTime} dias</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            ) : (
                <View>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <FontAwesome name="arrow-left" size={30} color="#007BFF" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Resultado da Cotação</Text>

                    {resultData?.ShippingSevicesArray?.length && (
                        <View style={styles.resultBox}>
                            {
                                resultData?.ShippingSevicesArray?.map((res: any, index: number) => (
                                    <React.Fragment key={index}>
                                        <Text style={styles.resultItem}>Empresa: {res.Carrier}</Text>
                                        <Text style={styles.resultItem}>Preço: R${res.ShippingPrice}</Text>
                                        <Text style={styles.resultItem}>Tempo de Entrega: {res.deliveryTime} dias</Text>
                                    </React.Fragment>
                                ))
                            }
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f7f7f7",
        flex: 1,
    },
    backButton: {
        marginBottom: 20
    },
    backText: {
        fontSize: 16,
        color: "#007BFF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    formBox: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        fontSize: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    rowInput: {
        width: "48%",
    },
    errorInput: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
    },
    resultBox: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
        marginTop: 20,
    },
    resultItem: {
        fontSize: 18,
        marginBottom: 10,
    },
    historicoBox: {
        marginTop: 30,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    historicoItem: {
        marginBottom: 10,
        fontSize: 16,
    },
});

export default FreteCalculator;
