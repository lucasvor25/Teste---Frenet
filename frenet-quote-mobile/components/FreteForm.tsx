import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

interface FormData {
    cep_origin: string;
    cep_destination: string;
    weight: string;
    width: string;
    length: string;
    declared_value: string;
}

const FreteForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    return (
        <View style={styles.container}>
            {["cep_origin", "cep_destination", "weight", "width", "height", "length", "declared_value"].map((field) => (
                <Controller
                    key={field}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder={field.replace("_", " ").toUpperCase()}
                            value={value}
                            onChangeText={onChange}
                            keyboardType="numeric"
                        />
                    )}
                    name={field as keyof FormData}
                />
            ))}
            <Button title="Calcular Frete" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 }
});

export default FreteForm;