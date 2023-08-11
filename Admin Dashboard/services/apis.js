class Apis {
    register;
    login;
    addProduct;
    updateProduct;
    getProducts;
    deleteProduct;
    getInventory;
    getActiveUser;
    getdashboardInfo;
    updateOrderStatus;
    getOrdersByStatus;
    constructor() {
        this.register = "register";
        this.login = "login";
        this.addProduct = "product";
        this.updateProduct = "product";
        this.getProducts = "product";
        this.deleteProduct = "product/";
        this.getInventory = "inventory";
        this.getActiveUser = "active-users";
        this.getdashboardInfo = "dashboardInfo";
        this.updateOrderStatus = "orderStatus";
        this.getOrdersByStatus = "ordersByStatus";
    }

}
let api = new Apis();