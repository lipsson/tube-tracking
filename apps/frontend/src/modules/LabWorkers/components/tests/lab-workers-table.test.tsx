
import { getByText, getByTitle, render, screen } from "@/utils/test-utils";
import { LabWorkersTable } from "../lab-workers-table";
import { labWorkersTestData } from "@/test/testing-data/labWorkers.data";
import { buildingTestData } from "@/test/testing-data/building.data";

describe("Lab Workers Tests", () => {
    it("list of lab workers", async () => {
        render(<LabWorkersTable data={labWorkersTestData} isLoading={false} buildingsList={buildingTestData} />);
        const table: HTMLDivElement = screen.getByTestId("table-labWorkers");
        const firstName = getByTitle(table, "Pracownik");
        const surname = getByTitle(table, "jeden");

        const buildingId = getByText(table, "65bd5affeec5fa59905adcf1")

        expect(firstName).toBeInTheDocument();
        expect(firstName).toHaveTextContent("Pracownik");

        expect(surname).toBeInTheDocument();
        expect(surname).toHaveTextContent("jeden");

        expect(buildingId).toBeInTheDocument();
        expect(buildingId).toHaveTextContent("65bd5affeec5fa59905adcf1")
    })
})