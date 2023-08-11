
class HomeManager {

    constructor(){
        services.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2NmQwMmY0NjNlM2U4MWUwMDYwNTYiLCJ1c2VyUm9sZSI6ImFkbWluIiwiY2FydElkIjoiNjRjNjZkMDJmNDYzZTNlODFlMDA2MDU4IiwiaWF0IjoxNjkxMjc4NDAxfQ.cXGPlgwPS1ziyabataXBVNKD_-R6y2ZisW5FimUh0Ao');
    }
    onHomeLoad(){
        dashBoard.getDashboard({from:'2023-08-05'});
        orders.getOrders(orders.ORDER_STATUS.received);
    }
}
let homeManager = new HomeManager();