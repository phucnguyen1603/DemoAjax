$(document).ready(function() {

    /* //Định nghĩa sự kiện click cho nút button #btnThemNguoiDung
    $("#btnThemNguoiDung").click(OpenPopupModal);



    //Xử lý cho sự kiện click đó
    function OpenPopupModal() {
        //Clear dữ liệu textbox.txtF
        $(".txtF").val("");
        //Tạo phần nội dung modal title
        var modalTile = "Thêm người dùng";
        //Tạo nội dung cho modal footer: Dùng string template
        var modalFooter = `
            <button id="btnThem" class="btn btn-success">Thêm người dùng </button>
            <button id="btnDong" class="btn btn-danger">Đóng </button>
        `;

        $(".modal-title").html(modalTile);
        $(".modal-footer").html(modalFooter);
        //Gọi nút open modal
        $("#btnPopupModal").trigger("click");
    }

    //Xử lý sự kiện cho nút đóng gọi nút đóng form của popupmodal
    $("body").delegate("#btnDong", "click", function () {
        $("#btnDongForm").trigger("click");
    })

    var danhSachNguoiDung = new DanhSachNguoiDung();
    //Xử lý tác vụ thêm người dùng
    $("body").delegate("#btnThem", "click", function () {
        //Lấy thông tin người dùng nhập vào
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var sodt = $("#SoDT").val();
        //Khởi tạo đối tượng người dùng
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, sodt);

        //Đưa người dùng vào thuộc tính là mảng danh sách người dùng 
        //Thuộc đối tượng danhSachNguoiDung
        danhSachNguoiDung.ThemNguoiDung(nguoiDung);
        console.log(nguoiDung);
        //Hiển thị sweetalert
        swal("OK!", "Thêm người dùng thành công!", "success");
        //Gọi sự kiện đóng form
        $("#btnDong").trigger("click");
        $(".txtF").val("");

        //Load dữ liệu người dùng ra datatable sau khi thêm
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        var arrDiem = danhSachNguoiDung.TinhDiemNguoiDung();
       
        veBieuDo(arrDiem);
        //Lưu và storage
        LuuStorage();


    })

    //Load dữ liệu ra datatable
    function LoadDanhSachNguoiDung(DSND) {

        var noiDungDSND = "";
        for (var i = 0; i < DSND.length; i++) {
            var nguoiDung = DSND[i];

            noiDungDSND += `
                <tr class="trThongTinNguoiDung" 
                    data-taikhoan= "${nguoiDung.TaiKhoan}"
                    data-matkhau = "${nguoiDung.MatKhau}" 
                    data-hoten = "${nguoiDung.HoTen}"
                    data-email = "${nguoiDung.Email}"
                    data-sodt = "${nguoiDung.SoDT}"
                >
                    <td><input class="ckbXoaNguoiDung" type="checkbox" value="${nguoiDung.TaiKhoan}" /></td>
                    <td>${nguoiDung.TaiKhoan}</td>
                    <td>${nguoiDung.MatKhau}</td>
                    <td class="tdHoTen">${nguoiDung.HoTen}</td>
                    <td>${nguoiDung.Email}</td>
                    <td>${nguoiDung.SoDT}</td> 
                </tr>
            `;
        }
        $("#tblBodyDSND").html(noiDungDSND);
    }

    $("#txtTuKhoa").keyup(function () {
        var tuKhoa = $("#txtTuKhoa").val();
        //var tuKhoa = $(this).val();
        //Gọi phương thức tìm kiếm người dùng => trả là 1 danh sách người dùng chứa từ khóa
        var danhSachNguoiKQ = danhSachNguoiDung.TimKiemNguoiDung(tuKhoa);
        LoadDanhSachNguoiDung(danhSachNguoiKQ.DSND);
        HighLight(tuKhoa);
    });

    function HighLight(tuKhoa) {
        //tính độ dài từ khóa
        var doDaiTuKhoa = tuKhoa.length;
        //Duyệt tất cả td có class name là họ tên
        $(".tdHoTen").each(function () {
            //Lấy ra nội dung chuỗi kết quả
            var noiDungHTML = $(this).html();
            //Kiểm tra trong nội html của thẻ td.tdHoten có chứa từ khóa hay ko
            if (noiDungHTML.indexOf(tuKhoa) !== -1) {
                //Dùng hàm substring tạo chuỗi mới
                var viTriTuKhoa = noiDungHTML.indexOf(tuKhoa);
                var KetQuaMoi = `${noiDungHTML.substring(0, viTriTuKhoa)} 
                <span class ='highlight' >${tuKhoa}</span> ${noiDungHTML.substring(viTriTuKhoa + doDaiTuKhoa)}`;
                $(this).html(KetQuaMoi);
            }
        });
        jQuery(".highlight").NhapNhay(3);
    }


    $.fn.NhapNhay = function (time) {
        var This = $(this);
        for (var i = 0; i < time; i++) {
            This.fadeOut(1000);
            This.fadeIn(1000);
        }

    }


    function LuuStorage() {
        //Lưu mảng người dùng
        var jsonDSND = JSON.stringify(danhSachNguoiDung.DSND);
        localStorage.setItem("DanhSachNguoiDung", jsonDSND);
    }
    function LayStorage() {
        //Lấy dữ liệu từ localstorage
        var jsonDSND = localStorage.getItem("DanhSachNguoiDung");
        danhSachNguoiDung.DSND = JSON.parse(jsonDSND);
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
    }
    LayStorage();

    //Xử lý xóa người dùng
    $("#btnXoaNguoiDung").click(function () {
        $(".ckbXoaNguoiDung").each(function () {
            if ($(this).is(":checked")) //Kiểm input với classname= .ckbXoaNguoiDung được checked hay không
            {
                //Nếu được checked thì lấy thuộc tính value của checkbox đó ra
                var taiKhoan = $(this).val();

                danhSachNguoiDung.XoaNguoiDung(taiKhoan);
            }
        });
        //Load lại danh sách người dùng
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        LuuStorage();
    });

    //Cài đặt sự kiện click cho dòng tr
    $("body").delegate(".trThongTinNguoiDung", "click", function () {
        var taiKhoan = $(this).attr("data-taikhoan");
        var matKhau = $(this).attr("data-matkhau");
        var hoTen = $(this).attr("data-hoten");
        var email = $(this).attr("data-email");
        var soDT = $(this).attr("data-sodt");
        //Gán dữ liệu vào popup
        $("#TaiKhoan").val(taiKhoan);
        $("#MatKhau").val(matKhau);
        $("#HoTen").val(hoTen);
        $("#Email").val(email);
        $("#SoDT").val(soDT);
        //Gọi popup hiển thị
        $("#btnPopupModal").trigger("click");
        //Tạo phần nội dung modal title
        var modalTile = "Cập nhật thông tin người dùng";
        //Tạo nội dung cho modal footer: Dùng string template
        var modalFooter = `
              <button id="btnCapNhatND" class="btn btn-success">Cập nhật </button>
              <button id="btnDong" class="btn btn-danger">Đóng </button>
          `;
        $(".modal-title").html(modalTile);
        $(".modal-footer").html(modalFooter);
        //Khóa input#TaiKhoan
        $("#TaiKhoan").attr("readonly", true);

    })
    //Xử lý cập nhật dữ liệu thông qua nút lưu#btnCapNhatND
    $("body").delegate("#btnCapNhatND", "click", function () {
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDT = $("#SoDT").val();
        //Tạo đối tượng lấy dữ liệu sau khi người dùng thay đổi (cập nhật)
        var nguoiDungEdit = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT);
        //Gọi phương thức cập nhật người dùng từ đối tượng danhSachNguoiDung
        danhSachNguoiDung.CapNhatThongTinNguoiDung(nguoiDungEdit);
        //Gọi load lại datatable nguoi dùng 
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        console.log(danhSachNguoiDung.DSND);
        //Hiển thị sweetalert
        swal("OK!", "Cập nhật thông tin thành công!", "success");
        //Gọi sự kiện đóng form
        $("#btnDong").trigger("click");
        //Gọi phương thức lưu từ localstorage
        LuuStorage();

    })

    function veBieuDo(arrDiem) {
        Highcharts.chart('container', {

            title: {
                text: 'Danh sách điểm số người dùng'
            },

            subtitle: {
                text: 'Biểu đồ thống nạp điểm của người dùng'
            },

            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: [{
                name: 'Installation',
                data: arrDiem
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }


        })
    };








*/
    //AJAX 
    //tao doi tuong danh sach nguoi dung
    var danhSachNguoiDung = new DanhSachNguoiDung();
    //tao doi tuong nguoi dng service
    var nguoiDungService = new NguoiDungService();
    //tao doi tuong khoa hoc service
    var khoaHocService = new KhoaHocService();
    //goi ra ham loadDanhSachNguoiDUng()
    LoadDanhSachNguoiDung();
    //Ham load Danh Sach Nguoi dung
    function LoadDanhSachNguoiDung() {
        nguoiDungService.LayThongTinNguoiDung()
            .done(function(result) {
                danhSachNguoiDung.DSND = result;
                BangDanhSachNguoiDung(danhSachNguoiDung.DSND);
            })
            .fail(function(err) {
                console.log(err);
            })
    }

    function BangDanhSachNguoiDung(DSND) {
        var noiDung = "";
        for (var i = 0; i < DSND.length; i++) {
            var nguoiDung = DSND[i];
            noiDung += `
                <tr class="trNguoiDung">
                    <td >
                        <input type="checkbox" class="chkTaiKhoan" value="${nguoiDung.TaiKhoan}">
                    </td>
                    <td class="TaiKhoan">${nguoiDung.TaiKhoan}</td>
                    <td class="MatKhau">${nguoiDung.MatKhau}</td>
                    <td class="HoTen">${nguoiDung.HoTen}</td>
                    <td class="Email">${nguoiDung.Email}</td>
                    <td class="SoDT">${nguoiDung.SoDT}</td>
                    <td class="TenLoaiNguoiDung">${nguoiDung.TenLoaiNguoiDung}</td>
                    <td>
                        <button class="btn btn-primary btnSua" data-TaiKhoan = "${nguoiDung.TaiKhoan}">Chỉnh Sửa</button>
                        <button class="btn btn-danger btnXoa" data-TaiKhoan = "${nguoiDung.TaiKhoan}">Xóa</button>
                        <button class="btn btn-warning btnGhiDanh" data-TaiKhoan = "${nguoiDung.TaiKhoan}">Ghi Danh</button>
                    </td>
                </tr>
            `
        }
        $('#tblBodyDSND').html(noiDung);
    }
    $("#btnThemNguoiDung").click(function() {
        //Tạo phần nội dung  cho modal
        var modalTitle = "Thêm Người Dùng";
        $(".modal-title").html(modalTitle);
        var modalFooter = `
            <button id="btnThem" class="btn btn-success">Thêm Người Dùng </button>
            <button id="btnDong" class="btn btn-danger" data-dismiss="modal">Đóng </button>
        `
        $(".modal-footer").html(modalFooter);
        $("#btnPopupModal").trigger('click');
    })
    //Xu ly click them nguoi dung
    $('body').delegate("#btnThem", 'click', function() {
        ThemNguoiDung();
    })

    //Hàm xử lý tên loại người dùng
    function TenLoaiNguoiDung(maLoaiNguoiDung) {
        var tenLoaiNguoiDung = "";
        if (maLoaiNguoiDung === "HV") {
            tenLoaiNguoiDung = "Học viên";
        } else if (maLoaiNguoiDung === "GV") {
            tenLoaiNguoiDung = "Giáo vụ";
        }
        return tenLoaiNguoiDung;
    }

    // Hàm Thêm Người Dùng
    function ThemNguoiDung() {
        var taiKhoan = $('#TaiKhoan').val();
        var matKhau = $('#MatKhau').val();
        var hoTen = $('#HoTen').val();
        var email = $('#Email').val();
        var soDT = $('#SoDT').val();
        var maLoaiNguoiDung = $('#MaLoaiNguoiDung').val();

        var tenLoaiNguoiDung = TenLoaiNguoiDung(maLoaiNguoiDung);
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung, tenLoaiNguoiDung);
        nguoiDungService.ThemNguoiDung(nguoiDung)
            .done(function(result) {
                window.location.reload();
            })
            .fail(function(err) {
                console.log(err);
            })
    }

    //Xử lý hiển thị thông tin lên PopUp
    $('body').delegate('.btnSua', 'click', function() {

        //Khóa tài khoản
        $('#TaiKhoan').attr('readonly', true);
        //Clear du lieu txtF
        $('.txtF').val("");
        //Tạo phần nội dung  cho modal
        var modalTitle = "Chỉnh Sửa thông tin";
        $(".modal-title").html(modalTitle);
        var modalFooter = `
            <button id="btnLuu" class="btn btn-success">Lưu </button>
            <button id="btnDong" class="btn btn-danger" data-dismiss="modal">Đóng </button>
        `
        $(".modal-footer").html(modalFooter);

        //goi nut Popup modal
        $('#btnPopupModal').trigger('click');

        var trNguoiDung = $(this).closest('.trNguoiDung');
        var taiKhoan = trNguoiDung.find('.TaiKhoan').html().trim();
        var matKhau = trNguoiDung.find('.MatKhau').html().trim();
        var hoTen = trNguoiDung.find('.HoTen').html().trim();
        var email = trNguoiDung.find('.Email').html().trim();
        var soDT = trNguoiDung.find('.SoDT').html().trim();
        var tenLoaiNguoiDung = trNguoiDung.find('.TenLoaiNguoiDung').html().trim();
        var maLoaiNguoiDung = "";
        if (tenLoaiNguoiDung === "Học viên") {
            maLoaiNguoiDung = "HV";
        } else if (tenLoaiNguoiDung === "Giáo vụ") {
            maLoaiNguoiDung = "GV";
        }
        //Gán nội dung
        $('#TaiKhoan').val(taiKhoan);
        $('#MatKhau').val(matKhau);
        $('#HoTen').val(hoTen);
        $('#Email').val(email);
        $('#SoDT').val(soDT);
        $('#MaLoaiNguoiDung').val(maLoaiNguoiDung);
    })

    //Hàm Cập nhật người dùng
    $('body').delegate("#btnLuu", 'click', function() {


        // gán giá trị
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDT = $("#SoDT").val();
        var maLoaiNguoiDung = $("#MaLoaiNguoiDung").val();
        var tenLoaiNguoiDung = TenLoaiNguoiDung(maLoaiNguoiDung);

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung, TenLoaiNguoiDung);
        console.log(nguoiDung);
        nguoiDungService.CapNhatNguoiDung(nguoiDung)
            .done(function(result) {
                alert('Cap nhat thanh cong');
                window.location.reload();
            })
            .fail(function(err) {
                console.log(err);
                alert("Failed");
            })
    })

    //Hàm xóa 
    $('body').delegate(".btnXoa", "click", function() {
        var taiKhoan = $(this).attr("data-TaiKhoan");
        nguoiDungService.XoaNguoiDung(taiKhoan)
            .done(function(result) {
                console.log("Xoa thanh cong");
                window.location.reload();
            })
            .fail(function(err) {
                console.log(err);
                console.log("failed");
            })
    })

    //Tìm kiếm

    $("#txtTuKhoa").keyup(function() {
        // console.log("đã keyyup");

        var tuKhoa = $("#txtTuKhoa").val();
        //var tuKhoa = $(this).val();
        //Gọi phương thức tìm kiếm người dùng => trả là 1 danh sách người dùng chứa từ khóa
        var danhSachNguoiKQ = danhSachNguoiDung.TimKiemNguoiDung(tuKhoa);
        BangDanhSachNguoiDung(danhSachNguoiKQ.DSND);
        // HighLight(tuKhoa);
    });

    function HighLight(tuKhoa) {
        //tính độ dài từ khóa
        var doDaiTuKhoa = tuKhoa.length;
        //Duyệt tất cả td có class name là họ tên
        $(".tdHoTen").each(function() {
            //Lấy ra nội dung chuỗi kết quả
            var noiDungHTML = $(this).html();
            //Kiểm tra trong nội html của thẻ td.tdHoten có chứa từ khóa hay ko
            if (noiDungHTML.indexOf(tuKhoa) !== -1) {
                //Dùng hàm substring tạo chuỗi mới
                var viTriTuKhoa = noiDungHTML.indexOf(tuKhoa);
                var KetQuaMoi = `${noiDungHTML.substring(0, viTriTuKhoa)} 
                <span class ='highlight' >${tuKhoa}</span> ${noiDungHTML.substring(viTriTuKhoa + doDaiTuKhoa)}`;
                $(this).html(KetQuaMoi);
            }
        });
        jQuery(".highlight").NhapNhay(3);
    }


    $.fn.NhapNhay = function(time) {
        var This = $(this);
        for (var i = 0; i < time; i++) {
            This.fadeOut(1000);
            This.fadeIn(1000);
        }
    }

    //Xu ly click nut Ghi Danh
    $('body').delegate(".btnGhiDanh", 'click', function() {
        var taiKhoan = $(this).attr("data-TaiKhoan");
        var modalTitle = "Ghi Danh Khoa Hoc";
        var modalBody = `
            <div class="form-group">
               <label>Danh sách Khóa Học</label>
                <select id="danhSachKhoaHoc" class="form-control">
                </select>
            </div>
        `
        var modalFooter = `
            <button id="btnGhiDanh" data-taikhoan = ${taiKhoan} class="btn btn-success">Ghi Danh </button>
            <button id="btnDong" class="btn btn-danger" data-dismiss="modal">Đóng </button>
        `
        $('.modal-title').html(modalTitle);
        $('.modal-body').html(modalBody);
        $('.modal-footer').html(modalFooter);
        $('#btnPopupModal').trigger("click");
        LayThongTinKhoaHoc();

        
    })

    //Hàm lấy thông tin các khóa học
    function LayThongTinKhoaHoc() {
        khoaHocService.LayDanhSachKhoaHoc()
            .done(function(DSKH) {
                //Load danh sach khoa hoc len the Select
                var noidung = "";
                for (var i = 0; i < DSKH.length; i++) {
                    var khoaHoc = DSKH[i];
                    noidung +=
                        `
                    <option value = "${khoaHoc.MaKhoaHoc}">${khoaHoc.TenKhoaHoc}</option>
                `
                }
                $('#danhSachKhoaHoc').html(noidung);
            })
            .fail(function(err) {
                console.log(err);
            })
    }


    //Xử Lý click Đồng ý ghi danh Khoa Hoc Da Chon
    $("body").delegate("#btnGhiDanh","click",function(){
        var taiKhoan = $(this).attr("data-TaiKhoan");
        var maKhoaHoc = $("#danhSachKhoaHoc").val();
        console.log(taiKhoan);
        console.log(maKhoaHoc);
        khoaHocService.GhiDanhKhoaHoc(maKhoaHoc,taiKhoan)
        .done(function(result){
            console.log(result);
            window.location.reload();
            
        })
        .fail(function(err){
            console.log(err);
        })
    })

});