// mô hình MVC: Model - View - Controller
// MVVM: Model - view - view model
// design pattern

import FoodServices from "../services/FoodServices.js";
import { getEle } from "../ultil/ultil.js";

// global scope => sử dụng ở nhiều nơi
const foodService = new FoodServices();

function renderTable(arrFood) {
    let contentTable = "";
    // duyệt mảng để lấy từng món đi hiển thị
    // map(callback(phần tử của mảng, vị trí phần tử){}) => input array , dùng duyệt mảng, chỉ dừng khi hết mảng
    arrFood.map(function (food, index) {
        console.log(food, index);
        let trFood = `
              <tr>
                  <td>${food.id}</td>
                  <td>
                      <img src="${food.hinhAnh}" />
                      <span>${food.tenMon} </span>
                  </td>
                  <td>${food.loai == "loai1" ? "Chay" : "Mặn"}</td>
                  <td>${food.gia}</td>
                  <td>${food.phanTram}</td>
                  <td>${food.giaKM}</td>
                  <td>${food.tinhTrang == 1 ? "Còn" : "Hết"}</td>
                  <td>
                      <button data-toggle="modal"  data-target="#exampleModal"  onclick="xemChiTiet('${
                          food.id
                      }')"
                      class="btn btn-info">Xem</button>
                      <button onclick="xoaMonAn('${
                          food.id
                      }')" class="btn btn-danger">Xóa</button>
                  </td>
              </tr>
          `;

        contentTable += trFood;
    });

    //console.log(contentTable)

    //output: bảng table các món ăn (mỗi món ăn là 1 row trên table)
    document.querySelector("#tbodyFood").innerHTML = contentTable;
}

// Local storage (client) JSON (gần giống mảng đối tượng)
// JSON không lưu được phương thức
const setLocalStorage = () => {
    // localStorage, JSON: được cung cấp sẵn của JS
    // arrFood => mảng object => chuyển từ arr/object sang JSON
    // setItem(key, value)
    localStorage.setItem("FoodList", JSON.stringify(foodService.arrayFood));
};

// lấy dữ liệu từ localStorage
//  object lấy từ localStorage sẽ bị mất các key chứa function ( method )
const getLocalStorage = () => {
    //trả về JSON
    let result = localStorage.getItem("FoodList");
    //nếu có local storage
    if (result) {
        foodService.arrayFood = JSON.parse(result);

        console.log(
            "foodService.arrayFood getLocalStorage",
            foodService.arrayFood
        );

        renderTable(foodService.arrayFood);
    }
};

// lấy dữ liệu từ localStorage khi load trang
getLocalStorage();

//Thêm món ăn mới
const themMonAn = () => {
    //?Input -  B1: lấy dữ liệu từ user
    let id = getEle("#foodID").value;
    let tenMon = getEle("#tenMon").value;
    // dropdown (menu) / combo box (form)
    let loai = getEle("#loai").value;
    let gia = getEle("#giaMon").value;
    let phanTram = getEle("#khuyenMai").value;
    let tinhTrang = getEle("#tinhTrang").value;
    let hinhAnh = getEle("#hinhMon").value;
    let moTa = getEle("#moTa").value;

    console.log("data lấy từ input", {
        id,
        tenMon,
        loai,
        gia,
        phanTram,
        tinhTrang,
        hinhAnh,
        moTa,
    });

    //? B2: Tạo đối tượng món mới
    // tạo thể hiện của Food
    let newFood = new Food(
        id,
        tenMon,
        loai,
        gia,
        phanTram,
        tinhTrang,
        hinhAnh,
        moTa
    );

    newFood.tinhKM();

    console.log("newFood", newFood);
    foodService.addFood(newFood);
    console.log("arrayFood khi thêm món mới", foodService.arrayFood);

    renderTable(foodService.arrayFood);

    $("#exampleModal").modal("hide");

    // thêm món ăn thành công => lưu xuống localStorage
    setLocalStorage();
};

window.themMonAn = themMonAn;

const xoaMonAn = (idDelete) => {
    console.log("ID xoa", idDelete);
    foodService.deleteFood(idDelete);

    alert("Xóa thành công");

    setLocalStorage(); //lưu
    renderTable(foodService.arrayFood); //hiển thị
};

window.xoaMonAn = xoaMonAn;

const xemChiTiet = (idDetail) => {
    let foodObj = foodService.getDetail(idDetail);

    console.table(foodObj);

    // hiển thị thông tin lên form
    document.querySelector("#foodID").value = foodObj.id;
    document.querySelector("#tenMon").value = foodObj.tenMon;
    document.querySelector("#loai").value = foodObj.loai;
    document.querySelector("#giaMon").value = foodObj.gia;
    document.querySelector("#khuyenMai").value = foodObj.phanTram;
    document.querySelector("#tinhTrang").value = foodObj.tinhTrang;
    document.querySelector("#hinhMon").value = foodObj.hinhAnh;
    document.querySelector("#moTa").value = foodObj.moTa;

    // xem chi tiết chỉ được cập nhật thông tin, không được thêm dựa trên thông tin đó sẽ bị trùng id
    getEle("#btnThemMon").disabled = true;
};

window.xemChiTiet = xemChiTiet;

const capNhat = () => {
    //?Input -  B1: lấy dữ liệu từ user
    let id = document.querySelector("#foodID").value;
    let tenMon = document.querySelector("#tenMon").value;
    // dropdown (menu) / combo box (form)
    let loai = document.querySelector("#loai").value;
    let gia = document.querySelector("#giaMon").value;
    let phanTram = document.querySelector("#khuyenMai").value;
    let tinhTrang = document.querySelector("#tinhTrang").value;
    let hinhAnh = document.querySelector("#hinhMon").value;
    let moTa = document.querySelector("#moTa").value;

    let objUpdate = new Food(
        id,
        tenMon,
        loai,
        gia,
        phanTram,
        tinhTrang,
        hinhAnh,
        moTa
    );
    objUpdate.tinhKM();

    console.log("food update", objUpdate);

    foodService.updateData(objUpdate);

    setLocalStorage();
    renderTable(foodService.arrayFood);

    // xem chi tiết chỉ được cập nhật thông tin, không được thêm dựa trên thông tin đó sẽ bị trùng id
    $("#exampleModal").modal("hide");
    getEle("#btnThemMon").disabled = false;
};

window.capNhat = capNhat;
