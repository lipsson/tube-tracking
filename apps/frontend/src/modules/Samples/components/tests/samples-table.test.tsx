import { getByRole, getByTestId, getByText, getByTitle, render, screen } from "@/utils/test-utils";
import { SamplesTable } from "../samples-table";
import { buildingTestData } from "@/test/testing-data/building.data";
import { labWorkersTestData } from "@/test/testing-data/labWorkers.data";
import { samplesTestData } from "@/test/testing-data/samples.data";
import { SampleDetalisPreview } from "../sample-details-preview";


describe("Samples Tests", () => {
    it("list of samples", async () => {
        render(<SamplesTable data={samplesTestData} isLoading={false} buildingsList={buildingTestData} labWorkers={labWorkersTestData} />);
        const table: HTMLDivElement = screen.getByTestId("table-samples");
        const name = getByTitle(table, "Probka 2");
        const pantient = getByTitle(table, "2");
        const buildingId = getByText(table, "Budynek 1")

        expect(name).toBeInTheDocument();
        expect(name).toHaveTextContent("Probka 2");

        expect(pantient).toBeInTheDocument();
        expect(pantient).toHaveTextContent("2");

        expect(buildingId).toBeInTheDocument();
        expect(buildingId).toHaveTextContent("Budynek 1")
    });
})

describe("Sample details Tests", () => {
    it("sample details preview", async () => {
        render(<SampleDetalisPreview data={samplesTestData[0]} isLoading={false} buildingsList={buildingTestData} labWorkers={labWorkersTestData} action={() => vi.fn()} />);
        const grid: HTMLDivElement = screen.getByTestId("sample-details-samples");
        const name = getByTestId(grid, "title-sample-details");
        const pantient = getByText(grid, "2");
        const buildingId = getByText(grid, "Budynek 1");
        const workers = getByText(grid, "Pracownik jeden");
        const workerImage = getByRole(grid, 'img');
        const status = getByText(grid, "status.inQueue");
        const updateAt = getByText(grid, "2024-02-02T21:25:29.795Z");

        expect(name).toBeInTheDocument();
        expect(name).toHaveTextContent("Probka 2 - id: 65bd5dc9bd18132d4f80040a");

        expect(pantient).toBeInTheDocument();
        expect(pantient).toHaveTextContent("2");

        expect(buildingId).toBeInTheDocument();
        expect(buildingId).toHaveTextContent("Budynek 1")

        expect(workerImage).toBeInTheDocument();
        expect(workerImage).toHaveAttribute("src", "/assets/images/scientist.png")

        expect(workers).toBeInTheDocument();
        expect(workers).toHaveTextContent("Pracownik jeden");

        expect(status).toBeInTheDocument();
        expect(status).toHaveTextContent("status.inQueue");

        expect(updateAt).toBeInTheDocument();
        expect(updateAt).toHaveTextContent("2024-02-02T21:25:29.795Z");

    });
})