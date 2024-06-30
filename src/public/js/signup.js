console.log("Signup frontend javascript file");
$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let fileName;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0];
      console.log("uploadFile: ", uploadFile);
      const fileType = uploadFile["type"];

      const valiImageType = ["image/jpg", "image/jpeg", "image/png"];

      if (!valiImageType.includes(fileType)) {
        alert("Please insert only jpg, jpeg, png formats");
      } else {
        if (uploadFile) {
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success");
        }

        fileName = $(this)[0].files[0].name;
      }

      $(this).siblings(".upload-name").val(fileName);
    }
  });
});

function validateSignupForm() {
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();
  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("please insert all required inputs");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password differs Please check it again!");
    return false;
  }

  const memberImage = $(".member-image").get(0).files[0].name
    ? $(".member-image").get(0).files[0].name
    : null;

  if (!memberImage) {
    alert("Please insert restaurant image!");
    return false;
  }
}
