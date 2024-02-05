import { fireEvent, getByRole, getByTestId, render, screen } from "@/utils/test-utils";
import { LoginModal } from "../login-modal";

describe("Login models Tests", () => {
    const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    afterAll(() => {
        consoleMock.mockReset();
    });

    const mockClose = vi.fn().mockReturnValue(console.log('close'));


    it("login - admin", async () => {

        render(<LoginModal onClose={mockClose} />);
        const modal: HTMLDivElement = screen.getByRole("dialog");

        const username = getByTestId(modal, 'login-email');

        expect(username).toHaveValue('');

        const password = getByTestId(modal, 'login-password');

        expect(password).toHaveValue('');

        fireEvent.change(username, { target: { value: 'admin@admin.it' } })
        expect(username).toHaveValue('admin@admin.it');

        fireEvent.change(password, { target: { value: 'admin' } })
        expect(password).toHaveValue('admin');


        const buttonSubmit = getByRole(modal, 'button', { name: "sidebar.login" });
        fireEvent.click(buttonSubmit);
        expect(consoleMock).toHaveBeenCalledTimes(1)

    });
    it("login - user", async () => {

        render(<LoginModal onClose={mockClose} />);
        const modal: HTMLDivElement = screen.getByRole("dialog");

        const username = getByTestId(modal, 'login-email');

        expect(username).toHaveValue('');

        const password = getByTestId(modal, 'login-password');

        expect(password).toHaveValue('');

        fireEvent.change(username, { target: { value: 'user@admin.it' } })
        expect(username).toHaveValue('user@admin.it');

        fireEvent.change(password, { target: { value: 'user' } })
        expect(password).toHaveValue('user');


        const buttonSubmit = getByRole(modal, 'button', { name: "sidebar.login" });
        fireEvent.click(buttonSubmit);
        expect(consoleMock).toHaveBeenCalledTimes(1)

    })


});
