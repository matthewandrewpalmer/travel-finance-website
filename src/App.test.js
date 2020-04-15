import React from "react";
import { render } from "@testing-library/react";
import App from "./App";


test("renders title on page", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Travel finance/i);
    expect(linkElement).toBeInTheDocument();
});
