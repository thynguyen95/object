export default class FoodServices {
    constructor() {
        console.log("service");
        this.arrayFood = [];
    }

    // input: newFood
    addFood(newFood) {
        //output: lưu vào mảng món ăn
        this.arrayFood.push(newFood);
    }

    //input: id
    deleteFood(id) {
        //Tìm theo id (find => return object, findIndex => return index)
        let indexDel = this.arrayFood.findIndex((food) => {
            return food.id == id;
        });
        console.log(id, indexDel);
        //output: xóa món khỏi mảng (dựa vào index để xóa)
        // splice()
        this.arrayFood.splice(indexDel, 1);
    }

    // input: idDetail
    getDetail(idDetail) {
        console.log("ID Xem", idDetail);
        let foodObj = this.arrayFood.find(function (food) {
            return food.id == idDetail;
        });
        //output:
        return foodObj;

        // return this.arrayFood.find(function (food) {
        //     return food.id == idDetail
        // })
    }

    //input:
    updateData(objUpdate) {
        let indexUpdate = this.arrayFood.findIndex(function (food) {
            return food.id == objUpdate.id;
        });
        // output: arr[0],arr[1]
        this.arrayFood[indexUpdate] = objUpdate;
    }
}
