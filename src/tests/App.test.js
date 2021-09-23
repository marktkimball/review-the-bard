import { render, screen } from "@testing-library/react";
import App from "../components/App";

test("renders the correct title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Review the Bard/i);
  expect(titleElement).toBeInTheDocument();
});
