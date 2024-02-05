import { getByText, getByTitle, render, screen } from "@/utils/test-utils";
import { UsersTable } from "../users-table";
import { usersTestData } from "@/test/testing-data/user.data";



describe("Users Tests", () => {
    it("list of users", async () => {
        render(<UsersTable data={usersTestData} isLoading={false} />);
        const table: HTMLDivElement = screen.getByTestId("table-users");
        const name = getByTitle(table, "admin");
        const email = getByTitle(table, "admin@admin.it");

        const isAdmin = getByText(table, "actions.yes");

        expect(name).toBeInTheDocument();
        expect(name).toHaveTextContent("admin");

        expect(email).toBeInTheDocument();
        expect(email).toHaveTextContent("admin@admin.it");

        expect(isAdmin).toBeInTheDocument();
        expect(isAdmin).toHaveTextContent("actions.yes")
    })
})