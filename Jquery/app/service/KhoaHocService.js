function KhoaHocService() {
	this.LayDanhSachKhoaHoc = function() {
		var urlAPI = " http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc";
		return $.ajax({
			url: urlAPI,
			type: 'GET',
			dataType: 'json',
		})
	}
	this.ThemKhoaHoc = function(khoahoc) {
		var urlAPI = " http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc";
		return $.ajax({
			url: urlAPI,
			type: 'POST',
			dataType: 'json',
			data:khoahoc,
		})
	}
	this.CapNhatKhoaHoc = function(khoahoc) {
		var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc";
		var jsonKhoaHoc = JSON.stringify(khoahoc);
		return $.ajax({
			url: urlAPI,
			type: 'PUT',
			dataType: 'json',
			contentType: 'application/json',
			data: jsonKhoaHoc,
		})
	}
	this.XoaKhoaHoc = function(id){
		var urlAPI = `http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/${id}`;
		return $.ajax({
			url: urlAPI,
			type: 'DELETE',
		})
	}
	this.GhiDanhKhoaHoc = function(maKhoaHoc,taiKhoan){
		var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc";
		var model = JSON.stringify({MaKhoaHoc:maKhoaHoc, TaiKhoan:taiKhoan});
		return $.ajax({
			url: urlAPI,
			type: 'POST',
			dataType: 'json',
			contentType:'application/json',
			data: model,
		})
	}
}