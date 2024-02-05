import { fireEvent, getByRole, getByTestId, getByText, render, screen } from "@/utils/test-utils";
import { EditSampleModal } from "../edit-samples.modal";
import { samplesTestData } from "@/test/testing-data/samples.data";
import { DeleteSampleModal } from "../delete-samples.modal";
import { setupServer } from 'msw/node';
import { HttpResponse, http as rest } from 'msw'

const server = setupServer(
    rest.delete('/samples/65bd5dc9bd18132d4f80040a', () => {
        return new HttpResponse(null, {
            status: 200,
            statusText: 'delete'
        })
    }),
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Sample details models Tests", () => {
    const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    afterAll(() => {
        consoleMock.mockReset();
    });

    const mockClose = vi.fn().mockReturnValue(console.log('close'));

    it("sample details edit", async () => {
        render(<EditSampleModal onClose={mockClose} _id={samplesTestData[0]?._id as string} />);


        const modal: HTMLDivElement = screen.getByRole("dialog");
        const name = getByTestId(modal, "modal-edit-sample-details-samples-title");

        const closeButton = getByRole(modal, 'button', { name: 'close' });
        const cancelButton = getByRole(modal, 'button', { name: 'actions.cancel' });
        const saveButton = getByRole(modal, 'button', { name: 'actions.save' });

        const desc = getByText(modal, "Id: 65bd5dc9bd18132d4f80040a");

        expect(name).toBeInTheDocument();
        expect(name).toHaveTextContent("actions.edit");

        expect(closeButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();

        expect(desc).toBeInTheDocument();
        expect(desc).toHaveTextContent("Id: 65bd5dc9bd18132d4f80040a");

    });

    it("sample details edit - close modal", async () => {
        render(<EditSampleModal onClose={mockClose} _id={samplesTestData[0]?._id as string} />);
        const modal: HTMLDivElement = screen.getByRole("dialog");

        const closeButton = getByRole(modal, 'button', { name: 'close' });
        const cancelButton = getByRole(modal, 'button', { name: 'actions.cancel' });
        const saveButton = getByRole(modal, 'button', { name: 'actions.save' });

        expect(closeButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();

        fireEvent.click(closeButton)
        expect(consoleMock).toHaveBeenCalled();
        expect(consoleMock).toHaveBeenLastCalledWith('close');

        fireEvent.click(cancelButton)
        expect(consoleMock).toHaveBeenCalled();
        expect(consoleMock).toHaveBeenLastCalledWith('close');

    });

    it("sample details edit - save", async () => {
        render(<EditSampleModal onClose={mockClose} _id={samplesTestData[0]?._id as string} />);
        const modal: HTMLDivElement = screen.getByRole("dialog");

        const saveButton = getByRole(modal, 'button', { name: 'actions.save' });

        expect(saveButton).toBeInTheDocument();
        // input form is disables
        fireEvent.click(saveButton)

    });

    it("sample details delete", async () => {
        render(<DeleteSampleModal onClose={mockClose} _id={samplesTestData[0]?._id as string} />);


        const modal: HTMLDivElement = screen.getByRole("dialog");
        const name = getByTestId(modal, "modal-delete-sample-details-samples-title");

        const closeButton = getByRole(modal, 'button', { name: 'close' });
        const cancelButton = getByRole(modal, 'button', { name: 'actions.cancel' });
        const saveButton = getByRole(modal, 'button', { name: 'actions.delete' });

        const desc = getByText(modal, "actions.delete input.samples 65bd5dc9bd18132d4f80040a?");

        expect(name).toBeInTheDocument();
        expect(name).toHaveTextContent("actions.delete");

        expect(closeButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();

        expect(desc).toBeInTheDocument();
        expect(desc).toHaveTextContent("actions.delete input.samples 65bd5dc9bd18132d4f80040a?");

    });

    it("sample details delete - close modal", async () => {
        render(<DeleteSampleModal onClose={mockClose} _id={samplesTestData[0]?._id as string} />);
        const modal: HTMLDivElement = screen.getByRole("dialog");

        const closeButton = getByRole(modal, 'button', { name: 'close' });
        const cancelButton = getByRole(modal, 'button', { name: 'actions.cancel' });

        fireEvent.click(closeButton)
        expect(consoleMock).toHaveBeenCalled();
        expect(consoleMock).toHaveBeenLastCalledWith('close');

        fireEvent.click(cancelButton)
        expect(consoleMock).toHaveBeenCalled();
        expect(consoleMock).toHaveBeenLastCalledWith('close');

    });

    it("sample details delete - save", async () => {
        server.use(
            rest.delete('/samples/65bd5dc9bd18132d4f80040a', () => {
                return new HttpResponse(null, {
                    status: 200,
                    statusText: 'delete'
                })
            }),
        );
        render(<DeleteSampleModal onClose={mockClose} _id={samplesTestData[0]?._id as string} />);
        const modal: HTMLDivElement = screen.getByRole("dialog");

        const deleteButton = getByRole(modal, 'button', { name: 'actions.delete' });

        expect(deleteButton).toBeInTheDocument();
        fireEvent.click(deleteButton)

    });

})