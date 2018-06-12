var danhSachNguoiDung = new DanhSachNguoiDung();
var nguoiDungService = new NguoiDungService();


function XuLyDangNhap() {

    var taiKhoan = $("#TaiKhoan").val();
    var matKhau = $("#MatKhau").val();
    var flag = 1;


    nguoiDungService.LayThongTinNguoiDung()
        .done(function(result) {
            danhSachNguoiDung.DSND = result;
            //Duyet danh sach nguoi dung xem co tai khoan va` mat khau trung voi TK va MK nhap vao hay khong?
            for (var i = 0; i < danhSachNguoiDung.DSND.length; i++) {
                var nguoiDung = danhSachNguoiDung.DSND[i];
                if (taiKhoan === nguoiDung.TaiKhoan && matKhau === nguoiDung.MatKhau) {
                	// trả về 1 nếu tìm thấy
                    flag = 1;
                    break;
                } else {
                	// trả về không nếu nhập sai(không tìm thấy)
                    flag = 0;
                }
            }
            if (flag === 1) {
                nguoiDungService.DangNhap(taiKhoan, matKhau)
                    .done(function(result) {
                    	var maLoaiNguoiDung =  result[0].MaLoaiNguoiDung;
                    	if (maLoaiNguoiDung === "GV") {
                    		window.location.assign("index.html");
                    	}else {
                    		window.location.assign("Course.html");
                    	}
                    })
                    .fail(function(err) {
                        console.log(err);
                    })
            } else {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>',
                })
            }
        })
        .fail(function(err) {
            console.log(err);
        })
}
$('#btnDangNhap').click(function() {
    XuLyDangNhap();
})