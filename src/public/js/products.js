console.log("Products frontend javascript file");

$(function () {
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();

    if (selectedValue === "DRINK") {
      $("#product-collection").hide();
      $("#product-volume").show();
    } else {
      $("#product-collection").show();
      $("#product-volume").hide();
      //   Jquery dan kelayapdimi hide va show?
    }
  });

  // Toggle:
  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });
  // cancel btn
  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(400);
    $("#process-btn").css("display", "flex");
  });

  // new product status:
  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id;
    const productStatus = $(`#${id}.new-product-status`).val();
    console.log("e", e);
    console.log("id:", id);
    console.log("productStatus:", productStatus);

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });

      const result = response.data;
      console.log("response from axios", response);

      if (result.data) {
        console.log("product updated");
        $(".new-product-status").blur();
      } else {
        alert("Product Upadate is Failed!");
      }
    } catch (err) {
      console.log("Error on updating product status:", err);
      alert("Product update is failed!");
    }
  });
});

// Validate product
function validateForm() {
  const productName = $(".product-name").val();
  const productPrice = $(".product-price").val();
  const productLeftCount = $(".product-left-count").val();
  const productCollection = $(".product-collection").val();
  const productDesc = $(".product-desc").val();
  const productStatus = $(".product-status").val();
  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === "" ||
    productStatus === ""
  ) {
    alert("please insert all details!");
    return false;
  } else return true;
}

// --------------------------
function previewFileHandler(input, order) {
  const imgClassName = input.className;
  console.log("input", input);
  //   console.log("classname", imgClassName);

  const file = $(`.${imgClassName}`).get(0).files[0];
  const fileType = file["type"];

  const validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpeg, jpg and png!");
  } else {
    if (file) {
      console.log("file:", file);
      const reader = new FileReader();
      // prerendering
      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };

      reader.readAsDataURL(file);
    }
  }
}
