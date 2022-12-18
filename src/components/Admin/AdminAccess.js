import authService from "../../services/auth.service";

const AdminAccess = (props) => {
    const permitted = authService.isAdmin();

    if (permitted) {
        return props.children;
    } else {
        return '';
    }
}

export default AdminAccess;