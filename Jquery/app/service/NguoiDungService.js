function NguoiDungService() {
	this.LayThongTinNguoiDung = function(){
		var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung";
		return $.ajax({
			url: urlAPI,
			type: 'GET',
			dataType: 'json',
		})
	}
	this.ThemNguoiDung = function(nguoiDung) {
		var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung";
		return $.ajax({
			url: urlAPI,
			type: 'POST',
			dataType: 'json',
			data:nguoiDung,
		})
	}
	this.CapNhatNguoiDung = function(nguoiDung) {
		var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung";
		var jsonNguoiDung = JSON.stringify(nguoiDung);
		return $.ajax({
			url: urlAPI,
			type: 'PUT',
			dataType: 'json',
			contentType:'application/json',
			data: jsonNguoiDung,
		})
	}
	this.XoaNguoiDung = function(id) {
		var urlAPI = `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`;
		return $.ajax({
			url: urlAPI,
			type: 'DELETE',
		})
	}
	this.DangNhap = function(taiKhoan,matKhau) {
		var urlAPI =`http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${taiKhoan}&matkhau=${matKhau}`;
		return $.ajax({
			url: urlAPI,
			type: 'GET',
			dataType: 'json',
		})
	}
}