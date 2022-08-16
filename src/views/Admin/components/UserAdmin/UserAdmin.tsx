import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import "../../Admin.scss";
const UserAdmin = () => {
  const [selectedFile, setSelectedFile] = useState<any>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  console.log("selectedFile", selectedFile);

  const imageHandler = (event: any) => {
    const reader = new FileReader();
    console.log("reader", reader);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedFile(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CardMedia component="img" image={selectedFile} alt="green iguana" sx={{ width: "200px" }} />
          <CardActions>
            <Button size="small" variant="contained" component="label" sx={{ maxWidth: "100px" }}>
              Upload
              <input hidden accept="image/*" multiple type="file" onChange={imageHandler} />
            </Button>
          </CardActions>
        </Box>
        <Box>
          <CardContent sx={{ padding: "0 8px" }}>
            <div className="form-change-info-profile">
              <div className="form-group">
                <label htmlFor="nickname">Username</label>
                <input type="text" className="form-control" name="username" value="gg_111905221050921707523" />
              </div>
              <div className="form-group">
                <label htmlFor="nickname">Nickname *</label>
                <input type="text" className="form-control" name="name" value="tùng trương viết" />
              </div>
              <div className="form-group">
                <label htmlFor="nickname">Email * </label>
                <input type="email" className="form-control" name="email" value="tungvip2143@gmail.com" />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Giới tính</label>
                <div className="row-radio">
                  <input type="radio" value="1" name="gender" id="gender" /> Nam
                </div>
                <div className="row-radio">
                  <input type="radio" value="2" name="gender" id="gender" /> Nữ
                </div>
                <div className="row-radio">
                  <input type="radio" value="3" name="gender" id="gender" /> Giới tính khác
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="birthday">Ngày sinh</label>
                <input
                  type="text"
                  id="birthday"
                  data-format="DD-MM-YYYY"
                  data-template="D MMM YYYY"
                  name="birthday"
                  value=""
                  style={{ display: "none" }}
                />
                <span className="combodate">
                  <select className="day " style={{ width: " auto" }}>
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  &nbsp;
                  <select className="month " style={{ width: "auto" }}>
                    <option value=""></option>
                    <option value="0">Jan</option>
                    <option value="1">Feb</option>
                    <option value="2">Mar</option>
                    <option value="3">Apr</option>
                    <option value="4">May</option>
                    <option value="5">Jun</option>
                    <option value="6">Jul</option>
                    <option value="7">Aug</option>
                    <option value="8">Sep</option>
                    <option value="9">Oct</option>
                    <option value="10">Nov</option>
                    <option value="11">Dec</option>
                  </select>
                  &nbsp;
                  <select className="year " style={{ width: "auto" }}>
                    <option value=""></option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                    <option value="1979">1979</option>
                    <option value="1978">1978</option>
                    <option value="1977">1977</option>
                    <option value="1976">1976</option>
                    <option value="1975">1975</option>
                    <option value="1974">1974</option>
                    <option value="1973">1973</option>
                    <option value="1972">1972</option>
                    <option value="1971">1971</option>
                    <option value="1970">1970</option>
                  </select>
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="address">Địa chỉ</label>
                <select className="form-control" id="address" name="address">
                  <option value="An Giang">An Giang</option>
                  <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                  <option value="Bắc Giang">Bắc Giang</option>
                  <option value="Bắc Kạn">Bắc Kạn</option>
                  <option value="Bạc Liêu">Bạc Liêu</option>
                  <option value="Bắc Ninh">Bắc Ninh</option>
                  <option value="Bến Tre">Bến Tre</option>
                  <option value="Bình Định">Bình Định</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Bình Phước">Bình Phước</option>
                  <option value="Bình Thuận">Bình Thuận</option>
                  <option value="Cà Mau">Cà Mau</option>
                  <option value="Cao Bằng">Cao Bằng</option>
                  <option value="Đắk Lắk">Đắk Lắk</option>
                  <option value="Đắk Nông">Đắk Nông</option>
                  <option value="Điện Biên">Điện Biên</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                  <option value="Đồng Tháp">Đồng Tháp</option>
                  <option value="Gia Lai">Gia Lai</option>
                  <option value="Hà Giang">Hà Giang</option>
                  <option value="Hà Nam">Hà Nam</option>
                  <option value="Hà Tĩnh">Hà Tĩnh</option>
                  <option value="Hải Dương">Hải Dương</option>
                  <option value="Hậu Giang">Hậu Giang</option>
                  <option value="Hòa Bình">Hòa Bình</option>
                  <option value="Hưng Yên">Hưng Yên</option>
                  <option value="Khánh Hòa">Khánh Hòa</option>
                  <option value="Kiên Giang">Kiên Giang</option>
                  <option value="Kon Tum">Kon Tum</option>
                  <option value="Lai Châu">Lai Châu</option>
                  <option value="Lâm Đồng">Lâm Đồng</option>
                  <option value="Lạng Sơn">Lạng Sơn</option>
                  <option value="Lào Cai">Lào Cai</option>
                  <option value="Long An">Long An</option>
                  <option value="Nam Định">Nam Định</option>
                  <option value="Nghệ An">Nghệ An</option>
                  <option value="Ninh Bình">Ninh Bình</option>
                  <option value="Ninh Thuận">Ninh Thuận</option>
                  <option value="Phú Thọ">Phú Thọ</option>
                  <option value="Quảng Bình">Quảng Bình</option>
                  <option value="Quảng Nam">Quảng Nam</option>
                  <option value="Quảng Ngãi">Quảng Ngãi</option>
                  <option value="Quảng Ninh">Quảng Ninh</option>
                  <option value="Quảng Trị">Quảng Trị</option>
                  <option value="Sóc Trăng">Sóc Trăng</option>
                  <option value="Sơn La">Sơn La</option>
                  <option value="Tây Ninh">Tây Ninh</option>
                  <option value="Thái Bình">Thái Bình</option>
                  <option value="Thái Nguyên">Thái Nguyên</option>
                  <option value="Thanh Hóa">Thanh Hóa</option>
                  <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                  <option value="Tiền Giang">Tiền Giang</option>
                  <option value="Trà Vinh">Trà Vinh</option>
                  <option value="Tuyên Quang">Tuyên Quang</option>
                  <option value="Vĩnh Long">Vĩnh Long</option>
                  <option value="Yên Bái">Yên Bái</option>
                  <option value="Phú Yên">Phú Yên</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP HCM">TP HCM</option>
                </select>
              </div>
              <button type="submit" className="btn btn-default btn-submit">
                Lưu
              </button>
            </div>
          </CardContent>
        </Box>
      </Card>
      {/* // <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    //   <div className="imgAvatar">
    //     <img style={{ width: "150px", borderRadius: "10px" }} src={selectedFile} alt="" />
    //   </div>
    //   <Button size="small" variant="contained" component="label" sx={{ maxWidth: "70px", marginTop: "10px" }}>
    //     Upload
    //     <input hidden accept="image/*" multiple type="file" onChange={imageHandler} />
    //   </Button> */}
    </div>
  );
};

export default UserAdmin;
