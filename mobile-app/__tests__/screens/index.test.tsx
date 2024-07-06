import React from "react";
import { render, screen } from "@testing-library/react-native";
import App from '../../app/index';

test('renders correctly', async () => {
    render(<App />);

    // check if the specific elements are rendered
    expect(screen.getByText("Gratitude Journal")).toBeOnTheScreen();
    expect(screen.getByText("Keeping a log of what you're thankful for can lower stress, help you sleep better, and may even reduce the risk of heart disease")).toBeOnTheScreen();
})