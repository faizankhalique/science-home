function getChallanId() {
  $.ajax({
    global: false,
    type: "get",
    url: "/generatebill/challanid",
    success: function(result) {
      $("#challanId").text(`${result.challanId}`);
    }, //end of success
    error: function(xhr, status, error) {
      alert(`Error: ${xhr.responseText}`);
    } //error
  }); //end of ajax
}
