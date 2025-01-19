import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Table from "../components/table";

describe("Table Component", () => {
  it("renders table with projects", () => {
    const mockProjects = [
      {
        "s.no": 0,
        "amt.pledged": 15823,
        "percentage.funded": 186,
      },
      {
        "s.no": 1,
        "amt.pledged": 6859,
        "percentage.funded": 8,
      },
    ];

    render(<Table currentProjects={mockProjects} />);

    // Check for table headers
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
  });

  it("renders empty table when no projects", () => {
    render(<Table currentProjects={[]} />);

    // Check that the table structure exists
    expect(screen.getByRole("table")).toBeInTheDocument();
    // Check that headers are still present
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
    // Check that tbody exists but is empty
    const tbody = screen.getAllByRole("rowgroup")[1];
    expect(tbody.children.length).toBe(0);
  });

  it("renders correct number of rows for projects", () => {
    const mockProjects = [
      {
        "s.no": 0,
        "amt.pledged": 15823,
        "percentage.funded": 186,
      },
      {
        "s.no": 1,
        "amt.pledged": 6859,
        "percentage.funded": 8,
      },
    ];

    render(<Table currentProjects={mockProjects} />);

    const tbody = screen.getAllByRole("rowgroup")[1];
    const rows = tbody.querySelectorAll("tr");
    expect(rows.length).toBe(mockProjects.length);
  });
});
