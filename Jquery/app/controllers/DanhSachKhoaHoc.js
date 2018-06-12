$(document).ready(function() {


    //Khoi tao doi tuong DanhSachKHoaHOc
    var danhSachKhoaHoc = new DanhSachKhoaHoc();


    //Tao Doi tuong serviceKhoaHoc
    var khoaHocService = new KhoaHocService();
    //tao Doi tuong nguoiDung service
    var nguoiDungService = new NguoiDungService();
    loadDanhSachKhoaHoc();


    //Hàm Load Danh sách Khóa học
    function loadDanhSachKhoaHoc() {
        khoaHocService.LayDanhSachKhoaHoc()
            .done(function(ketqua) {
                danhSachKhoaHoc.DSKH = ketqua;
                loadTableDanhSachKhoaHoc(danhSachKhoaHoc.DSKH);
            })
            .fail(function(err) {
                console.log(err);
            })

        //Load noi dung the Select trong popup

    }
    LayDanhSachGiaoVu();


    //Ham Lay Danh Sach Tên những tài khoản là giáo vụ
    function LayDanhSachGiaoVu() {
        nguoiDungService.LayThongTinNguoiDung()
            .done(function(DSND) {
                //Load danh sach nguoi dung len the Select
                var noidung = "";
                for (var i = 0; i < DSND.length; i++) {
                    var nguoiDung = DSND[i];
                    if (nguoiDung.MaLoaiNguoiDung === 'GV') {
                        noidung +=
                            `
                            <option value="${nguoiDung.TaiKhoan}">${nguoiDung.HoTen}</option>
                            `
                    }
                }
                $('#NguoiTao').html(noidung);
            })
            .fail(function(err) {
                console.log(err);
            })
    }


    // Hàm Load Khóa Học lên table
    function loadTableDanhSachKhoaHoc(DSKH) {
        var noiDung = "";
        for (var i = 0; i < DSKH.length; i++) {
            var khoaHoc = DSKH[i];
            noiDung +=
                `
                <tr class=trKhoaHoc>
                    <td><input type="checkbox" class= "chkMaKhoaHoc" value="${khoaHoc.MaKhoaHoc}"></td>
                    <td class="MaKhoaHoc">${khoaHoc.MaKhoaHoc}</td>
                    <td class="TenKhoaHoc">${khoaHoc.TenKhoaHoc}</td>
                    <td class="MoTa">${khoaHoc.MoTa}</td>
                    <td class="HinhAnh"><img src="${khoaHoc.HinhAnh}" width="100px" height="100px"</td>
                    <td class="LuotXem">${khoaHoc.LuotXem}</td>
                    <td class="NguoiTao">${khoaHoc.NguoiTao}</td>
                    <td>
                        <button class="btn btn-primary btnChinhSua" MaKhoaHoc= "${khoaHoc.MaKhoaHoc}">Chỉnh Sửa</button>
                        <button class="btn btn-danger btnXoa" MaKhoaHoc= "${khoaHoc.MaKhoaHoc}">Xóa</button>
                    </td>
                </tr>
             `
        }
        $('#tblKhoaHoc').html(noiDung);
    }

    //Load noi dung len PopUp
    $('body').delegate('.btnChinhSua', 'click', function() {
        //Khóa input MaKhoaHoc
        $('#MaKhoaHoc').attr('readonly', true);
        //Clear dữ liệu textbox.txtF
        $(".txtF").val("");
        //Tạo phần nội dung modal title
        var modalTile = "Chỉnh Sửa Khóa Học";
        //Tạo nội dung cho modal footer: Dùng string template
        var modalFooter = `
            <button id="btnLuu" class="btn btn-success">Chỉnh Sửa Khóa Học </button>
            <button id="btnDong" class="btn btn-danger">Đóng </button>
        `;
        $(".modal-title").html(modalTile);
        $(".modal-footer").html(modalFooter);

        var trKhoahoc = $(this).closest('.trKhoaHoc');
        var maKhoaHoc = trKhoahoc.find('.MaKhoaHoc').html().trim();
        var tenKhoaHoc = trKhoahoc.find('.TenKhoaHoc').html().trim();
        var moTa = trKhoahoc.find('.MoTa').html().trim();
        var hinhAnh = trKhoahoc.find('img').attr('src');
        var luotXem = trKhoahoc.find('.LuotXem').html().trim();
        var nguoiTao = trKhoahoc.find('.NguoiTao').html().trim();
        //Dùng cú pháp để gán nội dung cho CKEDITOR
        CKEDITOR.instances['MoTa'].setData(moTa);
        $('#MaKhoaHoc').val(maKhoaHoc);
        $('#TenKhoaHoc').val(tenKhoaHoc);
        $('#LuotXem').val(luotXem);
        $('#HinhAnh').val(hinhAnh);
        //Goi nut open Modal
        $('#btnPopupModal').trigger('click');
    });
    //Luu cap nhat khoa hoc
    $('body').delegate("#btnLuu", 'click', function() {

        var MaKhoaHoc = $("#MaKhoaHoc").val();
        var tenKhoaHoc = $('#TenKhoaHoc').val();
        var moTa = CKEDITOR.instances["MoTa"].getData(); //Lay gia tri tu Editor
        var luotXem = $('#LuotXem').val();
        var hinhAnh = $('#HinhAnh').val();
        var nguoiTao = $('#NguoiTao').val();


        var khoaHoc = new KhoaHoc(MaKhoaHoc, tenKhoaHoc, moTa, hinhAnh, luotXem, nguoiTao);

        khoaHocService.CapNhatKhoaHoc(khoaHoc)
            .done(function(result) {
                alert("Chinh sua thanh cong");
                window.location.reload();
            })
            .fail(function(err) {
                alert("Chinh sua that bai");
            })
    })


    //Xoa Khoa Hoc
    $('body').delegate(".btnXoa",'click',function(){
        var id = $(this).attr("MaKhoaHoc");
        khoaHocService.XoaKhoaHoc(id)
        .done(function(result){
            console.log("Xoa Thanh Cong");
            window.location.reload();
        })
        .fail(function(err){
            alert("Xoa Khong thanh cong")
        })
    })

    //Them Khoa Hoc
    $("#btnThemKhoaHoc").click(PopUpThemKhoaHoc);

    //Xử lý cho sự kiện click đó
    function PopUpThemKhoaHoc() {
        //Clear dữ liệu textbox.txtF
        $(".txtF").val("");
        //Tạo phần nội dung modal title
        var modalTile = "Thêm Khóa Học";
        //Tạo nội dung cho modal footer: Dùng string template
        var modalFooter = `
            <button id="btnThem" class="btn btn-success">Thêm Khóa Học </button>
            <button id="btnDong" class="btn btn-danger">Đóng </button>
        `;

        $(".modal-title").html(modalTile);
        $(".modal-footer").html(modalFooter);
        //Gọi nút open modal
        $("#btnPopupModal").trigger("click");
    }
    //Xử lý sự kiện cho nút đóng gọi nút đóng form của popupmodal
    $("body").delegate("#btnDong", "click", function() {
        $("#btnDongForm").trigger("click");
    })
    $("body").delegate('#btnThem', 'click', function() {
        var maKhoaHoc = $('#MaKhoaHoc').val();
        var tenKhoaHoc = $('#TenKhoaHoc').val();
        var moTa = $('#MoTa').val();
        var hinhAnh = $('#HinhAnh').val();
        var nguoiTao = $('#NguoiTao').val();
        console.log(nguoiTao);
        var luotXem = $('#LuotXem').val();

        // Khoi tao doi tuong Khoa Hoc
        var khoaHoc = new KhoaHoc(maKhoaHoc, tenKhoaHoc, moTa, hinhAnh, luotXem, nguoiTao);
        //goi service de day~ du lieu len Server;
        khoaHocService.ThemKhoaHoc(khoaHoc)
            .done(function(result) {
                console.log(result);
                window.location.reload();
            })
            .fail(function(err) {
                console.log(err);
            });
    })

    CKEDITOR.replace('MoTa', {
        allowedContent: 'iframe[*]'
    });
})