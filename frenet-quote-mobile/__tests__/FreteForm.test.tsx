import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FreteForm from "../components/FreteForm";

test("Preenchimento do formulário e envio", () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<FreteForm onSubmit={mockSubmit} />);

    fireEvent.changeText(getByPlaceholderText("CEP ORIGIN"), "01001000");
    fireEvent.changeText(getByPlaceholderText("CEP DESTINATION"), "02002000");
    fireEvent.press(getByText("Calcular Frete"));

    expect(mockSubmit).toHaveBeenCalled();
});