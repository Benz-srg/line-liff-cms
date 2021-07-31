export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//ราคารวม
export function totalPrice(selected, baskets) {
  let newItems = [];

  selected.map((row) => {
    let req = baskets.find((basket) => basket._id === row);
    if (req) {
      newItems.push(req);
    }
  });

  return newItems.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
}
//ราคารวมส่วนลด
export function totalDiscount(selected, baskets) {
  let newItems = [];
  console.log(baskets);
  selected.map((row) => {
    let req = baskets.find((basket) => basket._id === row);
    if (req) {
      newItems.push(req);
    }
  });

  return newItems.reduce(
    (total, product) => total + product.quantity * product.productId.saleprice,
    0
  );
}

// checkout procress
export function totalCheckout(totals) {
  return totals.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
}

export function totalCheckoutDiscount(totals) {
  return totals.reduce(
    (total, product) => total + product.quantity * product.productId.saleprice,
    0
  );
}
export function productQuantity(totals) {
  let totalQuantity = 0;
  totals.forEach(rows => {
    totalQuantity += rows.quantity
  });
  return totalQuantity;
}
//ใส่ - เลขบัญชีธนาคาร
export function numberWithDat(number) {
  const number1 = number.toString().substring(0, 3);
  const number2 = number.toString().substring(3, 4);
  const number3 = number.toString().substring(5, 9);
  const number4 = number.toString().substring(9, 10);
  return `${number1}-${number2}-${number3}-${number4}`;
}

//กรองธนาคาร
export function filterAddress(address, activeAddress) {
  const result = address.find(({ _id }) => _id === activeAddress);
  return result != undefined ? result.shippingAddress : "";
}

export function autoTabNumber(tel) {
  /* กำหนดรูปแบบข้อความโดยให้ _ แทนค่าอะไรก็ได้ แล้วตามด้วยเครื่องหมาย
  หรือสัญลักษณ์ที่ใช้แบ่ง เช่นกำหนดเป็น  รูปแบบเลขที่บัตรประชาชน
  4-2215-54125-6-12 ก็สามารถกำหนดเป็น  _-____-_____-_-__
  รูปแบบเบอร์โทรศัพท์ 08-4521-6521 กำหนดเป็น __-____-____
  หรือกำหนดเวลาเช่น 12:45:30 กำหนดเป็น __:__:__
  ตัวอย่างข้างล่างเป็นการกำหนดรูปแบบเลขบัตรประชาชน
  */
  var pattern = new String("__-____-____"); // กำหนดรูปแบบในนี้
  var pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
  var returnText = new String("");
  var telLen = tel.length;
  var telLenDecrase = telLen - 1;
  for (let index = 0; index < pattern.length; index++) {
    if (telLenDecrase == index && pattern.charAt(index + 1) == pattern_ex) {
      returnText += tel + pattern_ex;
    }
  }
  return tel;
}
