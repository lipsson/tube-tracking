
import { BuildingsTable } from "@/modules/Buildings/components/buildings-table";
import { buildingTestData } from "@/test/testing-data/building.data";
import { getByText, getByTitle, render, screen } from "@/utils/test-utils";

describe("Building Tests", () => {
    it("list of buildings", async () => {
        render(<BuildingsTable data={buildingTestData} isLoading={false} />);
        const table: HTMLDivElement = screen.getByTestId("table-buildings");
        const name = getByTitle(table, "Budynek 1");
        const city = getByTitle(table, "Warszawa");

        const localization = getByText(table, "52.237049,21.017532")
        expect(name).toBeInTheDocument();
        expect(name).toHaveTextContent("Budynek 1");


        expect(city).toBeInTheDocument();
        expect(city).toHaveTextContent("Warszawa");

        expect(localization).toBeInTheDocument();
        expect(localization).toHaveTextContent("52.237049,21.017532")
    })
})