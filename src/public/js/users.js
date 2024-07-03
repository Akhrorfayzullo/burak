console.log("Users frontend javascript file");

$(function () {
  $(".member-status").on("change", function (e) {
    const id = e.target.id;

    console.log("id:", id);

    const memberStatus = $(`#${id}.member-status`).val();
    console.log("memberStatus:", memberStatus);

    // axios updateChosenUser
    axios
      // 2-qismbody qism hisoblanadi
      .post("/admin/user/edit", {
        _id: id,
        memberStatus: memberStatus,
      })
      .then((res) => {
        console.log("response:", res);

        const result = res.data;
        console.log("result:", result);

        if (result.data) {
          console.log("User updated successfully!");
          $(".member-status").blur();
        } else {
          alert("User updated successfully!");
        }
      })
      .catch((err) => {
        console.log("Error user.js:", err);
        alert("User update is failed!");
      });
  });
});
